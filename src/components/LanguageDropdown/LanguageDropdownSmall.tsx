"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "@/redux/getData/getDataSlice";

function LanguageDropdownSmall({ style }: { style?: string }) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [hydrated, setHydrated] = useState(false);
	const language = useSelector((state) => state.data.language);
	const languages = useSelector((state) => state.data.success?.languages);
	const dispatch = useDispatch();

	useEffect(() => {
		setHydrated(true);

		const storedLanguage = Cookies.get("language");
		if (storedLanguage) {
			dispatch(setLanguage(storedLanguage.toUpperCase()));
		} else if (languages && languages.length > 0) {
			const defaultLanguage = languages[0].iso_code.toUpperCase();
			dispatch(setLanguage(defaultLanguage));
			Cookies.set("language", defaultLanguage, { expires: 7 });
		}
	}, [dispatch, languages]);

	const normalizedLanguages = languages?.map((language) => ({
		...language,
		iso_code: language.iso_code.toLowerCase(),
	}));

	const uniqueLanguages = normalizedLanguages?.filter(
		(value, index, self) =>
			index === self.findIndex((t) => t.iso_code === value.iso_code)
	);

	if (!hydrated) {
		return null;
	}

	return (
		<div className={style + " relative "}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className={
					"flex gap-2 items-center px-3 py-[6px] font-bold font-druk_wide uppercase text-[12px] leading-[18px]" +
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
					{uniqueLanguages?.map((language) => (
						<button
							key={language.iso_code}
							className="px-3 py-[6px] text-start font-druk_wide text-[12px] leading-[18px]"
							onClick={() => {
								const newLanguage = language.iso_code.toUpperCase();
								dispatch(setLanguage(newLanguage));
								Cookies.set("language", newLanguage, { expires: 7 });
								setIsOpen(!isOpen);
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
