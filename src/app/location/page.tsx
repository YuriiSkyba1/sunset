"use client";

import React from "react";
import { useDispatch, useSelector } from "@/hooks";
import { useEffect } from "react";
import { getView } from "@/redux/getLocationsView/getLocationsViewSlice";
import MainScreen from "@/components/MainScreen/MainScreen";
import AboutLocation from "@/components/AboutLocation/AboutLocation";
import Faq from "@/components/FAQ/Faq";
import ContactsSection from "@/components/ContactsSection/ContactsSection";
import JoinSunsetSection from "@/components/JoinSunsetSection/JoinSunsetSection";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import FilmSection from "@/components/FilmSection/FilmSection";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

function TemporaryLocationPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getView());
	}, []);

	const findFilmsTitles = () => {
		const filmsTitles: string[] = [];
		locationData.success?.movies.movies.forEach((movie) => {
			filmsTitles.push(movie.title);
		});
		return filmsTitles;
	};

	const locationData = useSelector((state) => state.locationView);
	useEffect(() => {
		localStorage.setItem("locationView", JSON.stringify(locationData));
		const filmTitles = findFilmsTitles();
		localStorage.setItem("filmsTitles", JSON.stringify(filmTitles));
	}, [locationData]);

	return (
		<>
			<Header />
			{!locationData.loading && locationData.success ? (
				<div className="w-full max-w-[375px] desktop:w-full desktop:max-w-[1440px] m-auto desktop:relative">
					<MainScreen />
					<FilmSection />
					<AboutLocation />
					<Faq />
					<ContactsSection />
					<JoinSunsetSection style="yellow" />
					<FeedbackSection />
				</div>
			) : (
				<div>loading...</div>
			)}
			<Footer />
		</>
	);
}

export default TemporaryLocationPage;
