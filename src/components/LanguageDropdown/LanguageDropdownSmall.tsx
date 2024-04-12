"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import React, { useState, useEffect } from "react";
import { useSelector } from "@/hooks";
import axios from "axios";

function LanguageDropdownSmall({ style }: { style?: string }) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [language, setLanguage] = useState("");

	const languages = useSelector((state) => state.data.success?.languages);

	useEffect(() => {
		const storedLanguage = Cookies.get("language");
		if (storedLanguage) {
			setLanguage(storedLanguage);
		}
		if (!storedLanguage) {
			axios
				.get("https://ipapi.co/json/")
				.then((response) => {
					const languagesArray: string[] = response.data.languages.split(",");
					const currentLanguage = languagesArray[0];

					if (currentLanguage) {
						setLanguage(currentLanguage);
					}
				})
				.catch((error) => {
					console.error("Error fetching the country data", error);
				});
		}
	}, []);

	return (
		<div className={style + " relative "}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className={
					"flex gap-2  items-center px-3 py-[6px] font-bold font-druk_wide uppercase text-[12px] leading-[18px]" +
					(isOpen ? " border-black_main border-2" : "")
				}
			>
				{language}
				{!isOpen ? (
					<Image src={BottomArrow} className="" alt="BottomArrow" />
				) : (
					<Image src={UpArrow} alt="UpArrow" />
				)}
			</button>

			{isOpen && (
				<div className="absolute z-20 bg-white flex flex-col w-full border-x-2 border-b-2">
					{languages?.map((language) => (
						<button
							key={language.iso_code}
							className="px-3 py-[6px] text-start font-druk_wide text-[12px] leading-[18px]"
							onClick={() => {
								setLanguage!(language.iso_code.toUpperCase());
								setIsOpen(!isOpen);
								Cookies.set("language", language.iso_code, { expires: 7 });
							}}
						>
							{language.iso_code.toUpperCase()}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

export default LanguageDropdownSmall;
