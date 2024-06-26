"use client";

import { useDispatch, useSelector } from "@/hooks";
import { useEffect, useRef } from "react";
import { getView } from "@/redux/getLocationsView/getLocationsViewSlice";
import MainScreen from "@/components/MainScreen/MainScreen";
import AboutLocation from "@/components/AboutLocation/AboutLocation";
import { getAllData } from "@/redux/getData/getDataSlice";
import Faq from "@/components/FAQ/Faq";
import ContactsSection from "@/components/ContactsSection/ContactsSection";
import JoinSunsetSection from "@/components/JoinSunsetSection/JoinSunsetSection";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import FilmSection from "@/components/FilmSection/FilmSection";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

function TemporaryLocationPage() {
	const dispatch = useDispatch();
	const filmSectionRef = useRef(null); // Create a ref for the FilmSection component

	useEffect(() => {
		dispatch(getView());
		dispatch(getAllData());
	}, [dispatch]);

	const findFilmsTitles = () => {
		const filmsTitles = [];
		locationData.success?.movies?.movies?.forEach((movie) => {
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
		<div className="relative">
			<Header />
			{!locationData.loading && locationData.success ? (
				<div className="w-full max-w-[375px] desktop:w-full desktop:max-w-[1440px] m-auto desktop:relative">
					<MainScreen filmSectionRef={filmSectionRef} /> 
					<div ref={filmSectionRef}>
						<FilmSection />
					</div>
					<AboutLocation filmSectionRef={filmSectionRef} /> {/* Pass the ref as a prop */}
					<Faq />
					<ContactsSection />
					<JoinSunsetSection style="yellow" />
					<FeedbackSection />
				</div>
			) : (
				<div>loading...</div>
			)}
			<Footer />
		</div>
	);
}

export default TemporaryLocationPage;
