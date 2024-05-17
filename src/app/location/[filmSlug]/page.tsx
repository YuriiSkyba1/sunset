"use client";

import AboutFilmSection from "@/components/AboutFilmSection/AboutFilmSection";
import BreadCrumbsFilmPage from "@/components/BreadCrumbsFilmPage/BreadCrumbsFilmPage";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JoinSunsetSection from "@/components/JoinSunsetSection/JoinSunsetSection";
import SeeAlsoSection from "@/components/SeeAlsoSection/SeeAlsoSection";
import { useDispatch, useSelector } from "@/hooks";
import { addResponse } from "@/redux/cartResponsesSlice/cartResponsesSlice";
import { getFilmView } from "@/redux/getFilmView/getFilmView";
import React, { useEffect } from "react";

function FilmPage({ params }: { params: { filmSlug: string } }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFilmView(params.filmSlug));
	}, []);

	useEffect(() => {
		handleClearAction();
	});
	const filmData = useSelector((state) => state.filmView);

	const handleClearAction = async () => {
		const url = `/api/clearCart`;
		console.log("Attempting to fetch:", url); // Check the URL is correct
		try {
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
				credentials: "include", // Ensures cookies are included with the request
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				console.log("Response data222:", data);
				dispatch(addResponse(data));
			}
		} catch (error) {
			console.error("Error handling ticket action:", error);
		}
	};

	return (
		<>
			<Header />
			{!filmData.loading && filmData.success ? (
				<div className="w-full max-w-[375px] desktop:w-full desktop:max-w-[1440px] m-auto desktop:relative">
					<BreadCrumbsFilmPage />
					<AboutFilmSection />
					<SeeAlsoSection />
					<JoinSunsetSection style={"transparent"} />
					<FeedbackSection />
				</div>
			) : (
				<div>loading...</div>
			)}
			<Footer />
		</>
	);
}

export default FilmPage;
