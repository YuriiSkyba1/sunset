"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CountryDropdown from "../CountryDropdown/CountryDropdown";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "@/redux/getData/getDataSlice";

export default function PopUpCountry() {
	const [showPopup, setShowPopup] = useState(false);
	const [country, setCountry] = useState("");
	const dispatch = useDispatch();
	const language = useSelector((state) => state.data.language);
	const availableCountries = useSelector((state) => state.data.success?.countries);
	const availableLanguages = useSelector((state) => state.data.success?.languages);

	useEffect(() => {
		const storedCountry = Cookies.get("country");
		const storedLanguage = Cookies.get("language");

		if (!storedCountry || !storedLanguage) {
			setShowPopup(true);
		} else {
			if (storedCountry) setCountry(storedCountry);
			if (storedLanguage) dispatch(setLanguage(storedLanguage));
		}
	}, [dispatch]);

	useEffect(() => {
		if (availableCountries && availableLanguages) {
			dispatch(setLanguage(availableLanguages[0].iso_code));
			setCountry(availableCountries[0].name);
		}
	}, [availableCountries, availableLanguages, dispatch]);

	const handleSave = () => {
		Cookies.set("country", country, { expires: 7 });
		Cookies.set("language", language, { expires: 7 });
		setShowPopup(false);
	};

	return (
		<>
			{showPopup && (
				<div className="fixed z-20 w-screen h-screen bg-backgroundOpacity flex justify-center items-center">
					<div className="w-[348px] desktop:w-[872px] bg-white py-[60px] desktop:py-20 flex flex-col items-center">
						<div className="mx-10 mb-12 flex flex-col items-center gap-4">
							<div className="font-druk_wide text-[18px] leading-[24px] desktop:text-[32px] desktop:leading-[40px] uppercase text-center">
								Welcome to the world of sunset cinema
							</div>
							<div className="font-gotham_pro_regular text-[12px] leading-5 desktop:text-sm desktop:leading-[22px] text-center">
								Select your language and country before you start exploring the service
							</div>
						</div>
						<div className="flex flex-col desktop:flex-row desktop:gap-6 gap-3 mx-[112px] desktop:mb-8 mb-[56px]">
							{availableLanguages && <LanguageDropdown language={language} setLanguage={setLanguage} />}
							{availableCountries && (
								<CountryDropdown
									country={country}
									setCountry={setCountry}
									availableCountries={availableCountries}
								/>
							)}
						</div>
						<button
							className=" font-druk_wide bg-primary desktop:px-[71px] py-[14px] max-desktop:w-[300px]"
							onClick={handleSave}
						>
							SAVE
						</button>
					</div>
				</div>
			)}
		</>
	);
}
