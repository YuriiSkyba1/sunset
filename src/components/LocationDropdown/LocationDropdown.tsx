"use client";

import { useState } from "react";
import Image from "next/image";
import RightPrimaryButton from "@/assets/right-primary-arrow.svg";
import BottomBlackArrow from "@/assets/bottom-black-arrow.svg";
import TopBlackArrow from "@/assets/top-black-arrow.svg";
import { useSelector } from "@/hooks";
import Link from "next/link";

function LocationDropdown() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const locationsList = useSelector((state) => state.locationList.success);

	return (
		<div className="relative">
			{locationsList && locationsList.length === 1 && (
				<div className=" bg-white flex flex-col w-full border-[1px] font-druk_wide text-[10px] leading-[18px]">
					<div className="px-3 py-[6px] text-start flex items-center justify-between">
						<Link
							href={"/location"}
							className="font-bold text-[14px] leading-[24px] font-druk_wide uppercase"
						>
							{locationsList[0].title}
						</Link>
					</div>
				</div>
			)}
			{locationsList && locationsList.length > 1 && (
				<div>
					<button
						onClick={() => setIsOpen((prev) => !prev)}
						className={
							"flex justify-between items-center w-full bg-white px-4 py-[10px] font-druk_wide text-[14px] leading-6 border-black_main border-[1px]" +
							(isOpen ? " " : "")
						}
					>
						LOCATIONS
						{!isOpen ? (
							<Image src={BottomBlackArrow} className="" alt="BottomBlackArrow" width={24} />
						) : (
							<Image src={TopBlackArrow} alt="TopBlackArrow" />
						)}
					</button>
					{isOpen && (
						<div className=" bg-white flex flex-col w-full border-x-[1px] border-b-[1px] font-druk_wide text-[10px] leading-[18px]">
							{locationsList?.map((location) => (
								<div className="px-3 py-[6px] text-start flex items-center justify-between">
									<Link href={"/location"}>{location.title}</Link>
									<Image src={RightPrimaryButton} alt="RightPrimaryButton" />
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default LocationDropdown;
