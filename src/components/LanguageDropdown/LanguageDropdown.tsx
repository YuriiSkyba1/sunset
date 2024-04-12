"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useSelector } from "@/hooks";
import IconChevronDown from "@/assets/icon-chevron-down.svg";

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

	return (
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
								setLanguage!(language.iso_code.toUpperCase());
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
