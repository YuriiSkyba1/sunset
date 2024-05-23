"use client";

import HeaderLogo from "@/assets/header-logo.svg";
import IconAccount from "@/assets/icon-account.svg";
import Image from "next/image";
import LocationBanner from "../LocationBanner/LocationBanner";
import ContactUsButton from "../ContactUsButton/ContactUsButton";
import Link from "next/link";
import MenuDropdown from "../MenuDropdown/MenuDropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/hooks";
import { addCountry, addLanguage, getAllData } from "@/redux/getData/getDataSlice";
import LanguageDropdownSmall from "../LanguageDropdown/LanguageDropdownSmall";
import axios from "axios";
import Cookies from "js-cookie";
import PopUpCountry from "../PopUpCountry/PopUpCountry";

function Header() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllData());
	}, [dispatch]);

	const [isAllData, setAllData] = useState(false);

	const getData = useSelector((state) => state.data.success?.countries);

	useEffect(() => {
		if (getData !== null) {
			const storedCountry = Cookies.get("country");
			const storedLanguage = Cookies.get("language");

			if (!storedCountry || !storedLanguage) {
				let isMounted = true;

				axios
					.get("/api/ipapi")
					.then((response) => {
						if (isMounted) {
							console.log("result of ipapi", response.data);
							const currentCountryName = response.data.country_name;
							const currentCountryIso = response.data.country_code_iso3;

							const currCountry = { name: currentCountryName, iso_code: currentCountryIso };

							const languagesArray = response.data.languages.split(",");
							const currentLanguage = languagesArray[0];

							const currLang = {
								name: currentLanguage === "uk" ? "UKRAINIAN" : currentLanguage,
								iso_code: currentCountryIso,
								is_default: false,
								is_current: false,
							};

							if (currentCountryName && currentLanguage) {
								if (currentLanguage == "uk") {
									Cookies.set("currentCountry", JSON.stringify(currCountry), { expires: 7 });
									Cookies.set("currentLanguage", JSON.stringify(currLang), { expires: 7 });
									dispatch(
										addLanguage({
											name: "Ukrainian",
											iso_code: "uk",
											is_default: false,
											is_current: false,
										})
									);
									dispatch(addCountry({ name: currentCountryName, isoCode: currentCountryIso }));
								}
							}
							setAllData(true);
						}
					})
					.catch((error) => {
						console.error("Error fetching the country data", error);
					});

				return () => {
					isMounted = false;
				};
			} else {
				setAllData(true);
			}
		}
	}, [getAllData]);

	return (
		isAllData && (
			<>
				<PopUpCountry />
				<header className="border-b-2">
					<div className="desktop:max-w-[1440px] desktop:m-auto desktop:relative ">
						<div className=" px-[14px] desktop:px-[60px] py-1 desktop:py-4 desktop:flex desktop:justify-between">
							<div className="flex justify-between desktop:gap-8 items-center">
								<div className=" w-[108px] desktop:w-[200px]">
									<Image src={HeaderLogo} alt="" />
								</div>
								<div className="flex items-center gap-3">
									<div className=" desktop:hidden">
										<Link href={""}>
											<Image src={IconAccount} alt="IconAccount" width={24} />
										</Link>
									</div>
									<MenuDropdown />
								</div>
								<div className="hidden desktop:block w-[1px] h-[21px] bg-grey_medium mx-3"></div>
								<LocationBanner style="hidden desktop:block" />
							</div>
							<div className="hidden font-bold desktop:flex desktop:gap-8 desktop:items-center">
								<Link
									href={""}
									className="flex items-center gap-2 font-druk_wide text-[12px] leading-[18px]"
								>
									<Image src={IconAccount} alt="IconAccount" />
									<p>LOG IN</p>
								</Link>
								<div className="hidden desktop:block w-[1px] h-[21px] bg-grey_medium "></div>
								<Link href={""} className="font-druk_wide text-[12px] leading-[18px]">
									SIGN UP
								</Link>
								<div className="hidden desktop:block w-[1px] h-[21px] bg-grey_medium "></div>
								<LanguageDropdownSmall style="hidden desktop:block" />
								<ContactUsButton style="primary" />
							</div>
						</div>
					</div>
				</header>
			</>
		)
	);
}

export default Header;
