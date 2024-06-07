"use client";

import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import PopCorn from "@/assets/popcorn-image.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/hooks";
import { getLocationsList } from "@/redux/getLocationsList/getLocationsListSlice";
import { string } from "yup";
import LocationItem from "./LocationItem/LocationItem";
import Link from "next/link";

function LocationBanner({ style }: { style?: string }) {
	const dispatch = useDispatch();
	useEffect(() => {
		// dispatch(getLocationsList("FR"));
	}, []);
	const locationList = useSelector((state) => state.locationList);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [photo, setPhoto] = useState<string>("");
	return (
		<div className={style}>
			{locationList.success?.length! > 1 && (
				<button
					onClick={() => setIsOpen((prev) => !prev)}
					className="flex gap-2 items-center font-bold font-druk_wide text-[12px] leading-[18px] uppercase"
				>
					LOCATION
					{!isOpen ? <Image src={BottomArrow} alt="BottomArrow" /> : <Image src={UpArrow} alt="UpArrow" />}
				</button>
			)}
			{isOpen && locationList.success?.length! > 0 && (
				<div className="absolute z-10 bg-pink_light max-w-[1440px] top-[82px] left-0 flex ">
					<div className="py-10 ml-[60px] mr-[136px] w-[536px]">
						<div className="mb-5 ">Location</div>
						{locationList.success?.map((listItem, index) => (
							<LocationItem
								title={listItem.title}
								photo={listItem.photo}
								slug={listItem.slug}
								isHovered={setPhoto}
							></LocationItem>
						))}
					</div>
					<div>
						<Image
							src={photo === "" ? PopCorn : photo}
							width={708}
							height={345}
							unoptimized={true}
							alt="PopCorn"
						/>
					</div>
				</div>
			)}
			<Link href={"/location"} className="font-druk_wide text-[12px] leading-[18px] uppercase">
				LOCATION
			</Link>
		</div>
	);
}

export default LocationBanner;
