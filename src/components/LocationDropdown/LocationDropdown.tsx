"use client";

import { useState } from "react";
import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import RightPrimaryButton from "@/assets/right-primary-arrow.svg";
import BottomBlackArrow from "@/assets/bottom-black-arrow.svg";
import TopBlackArrow from "@/assets/top-black-arrow.svg";

function LocationDropdown() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [location, setLocation] = useState<string>("Location");

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className={
					"flex justify-between items-center w-full bg-white px-4 py-[10px] font-bold border-black_main border-[1px]" +
					(isOpen ? " " : "")
				}
			>
				{location}
				{!isOpen ? (
					<Image src={BottomBlackArrow} className="" alt="BottomBlackArrow" width={24} />
				) : (
					<Image src={TopBlackArrow} alt="TopBlackArrow" />
				)}
			</button>
			{isOpen && (
				<div className=" bg-white flex flex-col w-full border-x-[1px] border-b-[1px] font-bold">
					<button
						className="px-3 py-[6px] text-start flex items-center justify-between"
						onClick={() => {
							setLocation("Rooftop of the shopping mall Arkády Pankrác 4th floor by the lift");
							setIsOpen(!isOpen);
						}}
					>
						Rooftop of the shopping mall Arkády Pankrác 4th floor by the lift
						<Image src={RightPrimaryButton} alt="RightPrimaryButton" />
					</button>
					<hr className="w-full m-auto bg-grey_medium" />
					<button
						className="px-3 py-[6px] text-start flex items-center justify-between"
						onClick={() => {
							setLocation("Rooftop of the shopping mall Arkády Pankrác 4th floor by the lift");
							setIsOpen(!isOpen);
						}}
					>
						Rooftop of the shopping mall Arkády Pankrác 4th floor by the lift
						<Image src={RightPrimaryButton} alt="RightPrimaryButton" />
					</button>
					<hr className="w-full m-auto bg-grey_medium" />
					<button
						className="px-3 py-[6px] text-start flex items-center justify-between"
						onClick={() => {
							setLocation("Rooftop of the shopping mall Arkády Pankrác 4th floor by the lift");
							setIsOpen(!isOpen);
						}}
					>
						Rooftop of the shopping mall Arkády Pankrác 4th floor by the lift
						<Image src={RightPrimaryButton} alt="RightPrimaryButton" />
					</button>
				</div>
			)}
		</div>
	);
}

export default LocationDropdown;
