import React, { useEffect, useState } from "react";
import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import { useSelector } from "@/hooks";

function CountryDropdown({ variant = "common" }: { variant?: "common" | "popup" }) {
	const countries = useSelector((state) => state.data.success?.countries);
	const [country, setCountry] = useState("COUNTRY");
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
							{countries?.map((country) => (
								<div key={country.iso_code}>
									<button
										className="px-3 py-[6px] text-start  "
										onClick={() => {
											setCountry(country.name.toUpperCase());
											setIsOpen(!isOpen);
										}}
									>
										{country.name.toUpperCase()}
									</button>
									<hr />
								</div>
							))}
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
							{countries?.map((country) => (
								<div key={country.iso_code}>
									<button
										className="px-3 py-[6px] text-start  "
										onClick={() => {
											setCountry(country.name.toUpperCase());
											setIsOpen(!isOpen);
										}}
									>
										{country.name.toUpperCase()}
									</button>
									<hr />
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default CountryDropdown;
