"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import { useSelector } from "@/hooks";
import IconChevronDown from "@/assets/icon-chevron-down.svg";
import { Language } from "@/redux/getData/types/IGetState";

function LanguageDropdown({
	style,
	variant = "common",
	language,
	setLanguage,
	availableLanguages,
}: {
	style?: string;
	variant?: "common" | "popup";
	language: string;
	setLanguage: Dispatch<SetStateAction<string>>;
	availableLanguages: Language[];
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const languages = useSelector((state) => state.data.success?.languages);

	return (
		<>
			{variant === "common" && (
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
										setLanguage(language.iso_code.toUpperCase());
										setIsOpen(!isOpen);
									}}
								>
									{language.iso_code.toUpperCase()}
								</button>
							))}
						</div>
					)}
				</div>
			)}
			{variant === "popup" && (
				<div className={style + " relative "}>
					<button
						onClick={() => setIsOpen((prev) => !prev)}
						className={
							"font-druk_wide uppercase w-[300px] desktop:w-[313px] text-[10px] desktop:[12px] flex justify-between gap-2 items-center px-3 py-3 font-bold border-black_main border-2"
						}
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
							{languages?.map((language) => (
								<button
									key={language.iso_code}
									className="font-druk_wide text-[10px] desktop:[12px] px-3 py-[6px] text-start"
									onClick={() => {
										setLanguage(language.iso_code.toUpperCase());
										setIsOpen(!isOpen);
									}}
								>
									{language.name.toUpperCase()}
								</button>
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default LanguageDropdown;
