"use client";

import Image from "next/image";
import Underline from "@/assets/underline_main-screen.svg";
import { useSelector } from "@/hooks";

function MainScreen() {
	const renderingData = useSelector((state) => state.locationView.success);

	const customStyles = {
		backgroundImage: `url('${renderingData?.photo}')`,
		backgroundSize: "cover",
	};

	return (
		<div className="" style={customStyles}>
			<div className="pt-36 px-4 pb-48 text-[40px] leading-[50px] desktop:pt-20 desktop:pl-[60px] desktop:pb-40 text-white desktop:text-[56px] desktop:leading-[64px] uppercase desktop:max-w-[624px]">
				{renderingData?.title}
				<Image src={Underline} alt="underline" className="w-full max-w-[348px] desktop:max-w-[624px]"></Image>
				<div className="text-[16px] leading-6 mt-3 desktop:leading-7 desktop:text-lg desktop:mt-2">
					{renderingData?.subtitle}
				</div>
				<button className="px-20 py-3 mt-10 desktop:py-4 desktop:px-8 desktop:mt-14 bg-addition text-black_main text-lg leading-6 uppercase font-bold">
					buy a ticket
				</button>
			</div>
		</div>
	);
}

export default MainScreen;
