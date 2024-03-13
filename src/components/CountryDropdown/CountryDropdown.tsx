import React, { useState } from "react";
import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";

function CountryDropdown({ variant = "common" }: { variant?: "common" | "popup" }) {
	const [country, setCountry] = useState("CZECH REPUBLIC");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			{variant === "common" && (
				<div className="relative">
					<button
						onClick={() => setIsOpen((prev) => !prev)}
						className={
							"flex gap-2 items-center px-3 py-[6px] font-bold" +
							(isOpen ? " border-black_main border-2" : "")
						}
					>
						{country}
						{!isOpen ? (
							<Image src={BottomArrow} alt="BottomArrow" />
						) : (
							<Image src={UpArrow} alt="UpArrow" />
						)}
					</button>

					{isOpen && (
						<div className="absolute z-20 bg-white flex flex-col w-full border-x-2 border-b-2">
							<button
								className="px-3 py-[6px] text-start  "
								onClick={() => {
									setCountry("EN");
									setIsOpen(!isOpen);
								}}
							>
								CZECH REPUBLIC
							</button>
							<hr className="w-full m-auto bg-grey_medium" />
							<button
								className="px-3 py-[6px] text-start "
								onClick={() => {
									setCountry("PL");
									setIsOpen(!isOpen);
								}}
							>
								CZECH REPUBLIC
							</button>
							<hr className="w-full m-auto bg-grey_medium" />
							<button
								className="px-3 py-[6px] text-start "
								onClick={() => {
									setCountry("UA");
									setIsOpen(!isOpen);
								}}
							>
								CZECH REPUBLIC
							</button>
						</div>
					)}
				</div>
			)}
			{variant === "popup" && (
				<div className="relative">
					<button
						onClick={() => setIsOpen((prev) => !prev)}
						className="w-[300px] desktop:w-[313px] text-[10px] desktop:[12px] flex justify-between gap-2 items-center px-3 py-3 font-bold border-black_main border-2"
					>
						{country}
						{!isOpen ? (
							<Image src={BottomArrow} alt="BottomArrow" />
						) : (
							<Image src={UpArrow} alt="UpArrow" />
						)}
					</button>

					{isOpen && (
						<div className="absolute z-20 bg-white flex flex-col w-full border-x-2 border-b-2">
							<button
								className="px-3 py-[6px] text-start text-[10px] desktop:[12px] "
								onClick={() => {
									setCountry("EN");
									setIsOpen(!isOpen);
								}}
							>
								CZECH REPUBLIC
							</button>
							<hr className="w-full m-auto bg-grey_medium" />
							<button
								className="px-3 py-[6px] text-start text-[10px] desktop:[12px]"
								onClick={() => {
									setCountry("PL");
									setIsOpen(!isOpen);
								}}
							>
								CZECH REPUBLIC
							</button>
							<hr className="w-full m-auto bg-grey_medium" />
							<button
								className="px-3 py-[6px] text-start text-[10px] desktop:[12px]"
								onClick={() => {
									setCountry("UA");
									setIsOpen(!isOpen);
								}}
							>
								CZECH REPUBLIC
							</button>
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default CountryDropdown;
