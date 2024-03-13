"use client";

import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import PopCorn from "@/assets/popcorn-image.png";
import { useState } from "react";

function LocationBanner({ style }: { style?: string }) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className={style}>
			<button onClick={() => setIsOpen((prev) => !prev)} className="flex gap-2 items-center font-bold">
				LOCATION
				{!isOpen ? <Image src={BottomArrow} alt="BottomArrow" /> : <Image src={UpArrow} alt="UpArrow" />}
			</button>
			{isOpen && (
				<div className="absolute z-10 bg-pink_light max-w-[1440px] top-[82px] left-0 flex ">
					<div className="py-10 ml-[60px] mr-[136px] w-[536px]">
						<div className="mb-5">Location</div>
						<div className=" pb-5 border-b-[1px] font-bold">
							ROOFTOP OF THE SHOPPING MALL ARKÁDY
							<p>PANKRÁC 4TH FLOOR BY THE LIFT</p>
						</div>
						<div className="py-5 border-b-[1px] font-bold text-black_main text-opacity-50">
							ROOFTOP OF THE SHOPPING MALL ARKÁDY
							<p> PANKRÁC 4TH FLOOR BY THE LIFT</p>
						</div>
						<div className="pt-5 font-bold text-black_main text-opacity-50">
							ROOFTOP OF THE SHOPPING MALL ARKÁDY
							<p>PANKRÁC 4TH FLOOR BY THE LIFT</p>
						</div>
					</div>
					<div>
						<Image src={PopCorn} alt="PopCorn" />
					</div>
				</div>
			)}
		</div>
	);
}

export default LocationBanner;
