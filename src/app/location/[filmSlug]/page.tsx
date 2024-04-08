"use client";

import AboutFilmSection from "@/components/AboutFilmSection/AboutFilmSection";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import JoinSunsetSection from "@/components/JoinSunsetSection/JoinSunsetSection";
import SeeAlsoSection from "@/components/SeeAlsoSection/SeeAlsoSection";
import { useDispatch, useSelector } from "@/hooks";
import { getFilmView } from "@/redux/getFilmView/getFilmView";
import React, { useEffect } from "react";

function FilmPage({ params }: { params: { filmSlug: string } }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFilmView(params.filmSlug));
	}, []);

	const filmData = useSelector((state) => state.filmView);

	return (
		<>
			<Header />
			{!filmData.loading && filmData.success ? (
				<div className="w-full max-w-[375px] desktop:w-full desktop:max-w-[1440px] m-auto desktop:relative">
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
