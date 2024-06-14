"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import IconChevronDown from "@/assets/icon-chevron-down.svg";
import { setLanguage } from "@/redux/getData/getDataSlice";
import Cookies from "js-cookie";

function LanguageDropdown({
	style,
	language,
	setLanguage,
}: {
	style?: string;
	language?: string;
	setLanguage?: Dispatch<SetStateAction<string>>;
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const languages = useSelector((state) => state.data.success?.languages);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!language && languages && languages.length > 0) {
			const defaultLanguage = languages[0].iso_code;
			setLanguage!(defaultLanguage);
			dispatch(setLanguage(defaultLanguage));
		}
	}, [language, languages, dispatch, setLanguage]);

	const normalizedLanguages = languages?.map(language => ({
		...language,
		iso_code: language.iso_code.toLowerCase(),
		name: language.name.toLowerCase(),
	}));

	const uniqueLanguages = normalizedLanguages?.filter(
		(value, index, self) =>
			index === self.findIndex((t) => t.iso_code === value.iso_code)
	);

	return (
		<div className={style + " relative "}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="font-druk_wide uppercase w-[300px] desktop:w-[313px] text-[10px] desktop:[12px] flex justify-between gap-2 items-center px-3 py-3 font-bold border-black_main border-2"
			>
				{language}
				<Image
					src={IconChevronDown}
					width={24}
					height={24}
					alt="BottomArrow"
					className={`${isOpen ? "rotate-180" : ""}`}
				/>
			</button>
			{isOpen && (
				<div className="absolute z-20 bg-white flex flex-col w-full border-x-2 border-b-2">
					{uniqueLanguages?.map((language) => (
						<button
							key={language.iso_code}
							className="font-druk_wide text-[10px] desktop:[12px] px-3 py-[6px] text-start"
							onClick={() => {
								setLanguage!(language.iso_code.toUpperCase());
								dispatch(setLanguage(language.iso_code.toUpperCase()));
								setIsOpen(!isOpen);
							}}
						>
							{language.name.toUpperCase()}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

export default LanguageDropdown;
