"use client";

import Image from "next/image";
import Underline from "@/assets/underline_main-screen.svg";
import { useSelector } from "@/hooks";
import Link from "next/link";
import { useMemo } from "react";

function MainScreen({ filmSectionRef }) {
	const renderingData = useSelector((state) => state.locationView.success);

	const customStyles = useMemo(() => ({
		backgroundImage: `url('${renderingData?.photo}')`,
		backgroundSize: "cover",
	}), [renderingData?.photo]);

	if (!renderingData) return null;

	const scrollToFilmSection = () => {
		if (filmSectionRef.current) {
			filmSectionRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="relative" style={customStyles}>
			<div className="absolute top-[20px] left-[14px] desktop:top-[32px] desktop:left-[60px] text-[14px] leading-5 text-white flex gap-2 font-gotham_pro_regular">
				<Link href={"/"} className="flex items-center">
					Homepage
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M4.7168 11.0832L8.80013 6.99991L4.7168 2.91658L5.54175 2.09162L10.45 6.99991L5.54175 11.9082L4.7168 11.0832Z"
							fill="white"
						/>
					</svg>
				</Link>
				<p className="opacity-50">Location</p>
			</div>
			<div className="pt-36 px-4 pb-48 font-druk_wide text-[40px] leading-[50px] desktop:pt-20 desktop:pl-[60px] desktop:pb-40 text-white desktop:text-[56px] desktop:leading-[64px] uppercase desktop:max-w-[624px]">
				{renderingData.title}
				<Image src={Underline} alt="underline" className="w-full max-w-[348px] desktop:max-w-[624px]"></Image>
				<div className="font-gotham_pro_regular text-[16px] leading-6 mt-3 desktop:leading-7 desktop:text-lg desktop:mt-2 normal-case">
					{renderingData.subtitle}
				</div>
				<button onClick={scrollToFilmSection} className="px-20 py-3 mt-10 desktop:py-4 desktop:px-8 desktop:mt-14 bg-addition font-druk_wide text-black_main text-lg leading-6 uppercase font-bold">
					buy a ticket
				</button>
			</div>
		</div>
	);
}

export default MainScreen;
