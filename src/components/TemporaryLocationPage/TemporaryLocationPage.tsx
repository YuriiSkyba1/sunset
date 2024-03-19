"use client";

import React from "react";
import { useDispatch, useSelector } from "@/hooks";
import { useEffect } from "react";
import { getView } from "@/redux/getLocationsView/getLocationsViewSlice";
import MainScreen from "../MainScreen/MainScreen";
import AboutLocation from "../AboutLocation/AboutLocation";
import Faq from "../FAQ/Faq";
import ContactsSection from "../ContactsSection/ContactsSection";
import JoinSunsetSection from "../JoinSunsetSection/JoinSunsetSection";
import FeedbackSection from "../FeedbackSection/FeedbackSection";
import FilmSection from "../FilmSection/FilmSection";

function TemporaryLocationPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getView());
	}, []);

	const locationData = useSelector((state) => state.locationView);

	return (
		<>
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
		</>
	);
}

export default TemporaryLocationPage;
