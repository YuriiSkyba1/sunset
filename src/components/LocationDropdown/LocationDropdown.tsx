"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import RightPrimaryButton from "@/assets/right-primary-arrow.svg";
import BottomBlackArrow from "@/assets/bottom-black-arrow.svg";
import TopBlackArrow from "@/assets/top-black-arrow.svg";
import { useDispatch, useSelector } from "@/hooks";
import Link from "next/link";
import { getLocationsList } from "@/redux/getLocationsList/getLocationsListSlice";

function LocationDropdown() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const locationsList = useSelector((state) => state.locationList);

	return (
		<div className="relative">
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
					{locationsList?.success?.map((location) => (
						<div className="px-3 py-[6px] text-start flex items-center justify-between">
							<Link href={"/location"}>{location.title}</Link>
							<Image src={RightPrimaryButton} alt="RightPrimaryButton" />
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default LocationDropdown;
