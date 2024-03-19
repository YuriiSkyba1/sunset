"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import { useSelector, useDispatch } from "@/hooks";
import { getAllData } from "@/redux/getData/getDataSlice";

function LanguageDropdown({ style, variant = "common" }: { style?: string; variant?: "common" | "popup" }) {
	const [language, setLanguage] = useState(variant === "common" ? "EN" : "LANGUAGE");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllData());
	}, []);

	const languages = useSelector((state) => state.data.success?.languages);

	return (
		<>
			{variant === "common" && (
				<div className={style + " relative "}>
					<button
						onClick={() => setIsOpen((prev) => !prev)}
						className={
							"flex gap-2 items-center px-3 py-[6px] font-bold" +
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
									className="px-3 py-[6px] text-start  "
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
							"w-[300px] desktop:w-[313px] text-[10px] desktop:[12px] flex justify-between gap-2 items-center px-3 py-3 font-bold border-black_main border-2"
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
						<div className="absolute z-20  bg-white flex flex-col w-full border-x-2 border-b-2">
							{languages?.map((language) => (
								<button
									key={language.iso_code}
									className="px-3 py-[6px] text-start  "
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
