import { useSelector } from "@/hooks";
import Image from "next/image";
import Underline from "@/assets/primary_underline.svg";
import AboutLocationPhoto from "@/assets/about-location_photo.svg";
import AboutCard from "../AboutCard/AboutCard";

function AboutLocation() {
	const renderingData = useSelector((state) => state.locationView.success);

	return (
		<div className="px-4 py-10 desktop:flex desktop:px-[60px] desktop:py-20 desktop:flex-row desktop:justify-between desktop:gap-[26px]">
			<div className="desktop:flex flex-col desktop:gap-10">
				<div className="font-druk_wide w-full text-[24px] leading-[32px] desktop:text-[40px] desktop:leading-[48px] uppercase max-desktop:mb-4 desktop:max-w-[312px]">
					{renderingData?.about_title}
					<Image src={Underline} alt={"Underline"} />
				</div>
				<Image
					src={AboutLocationPhoto}
					alt="AboutLocationPhoto"
					className="mb-3 block desktop:hidden bg-[#306B54]"
				/>
				<div className="grid grid-cols-2 gap-3 desktop:gap-6 max-desktop:mb-8">
					{renderingData?.about_cards.map((card) => (
						<AboutCard
							key={card.title}
							title={card.title}
							description={card.description}
							icon={card.icon}
						/>
					))}
				</div>
				<button className="w-full py-[14px] desktop:px-8 desktop:max-w-[200px] bg-primary text-black_main text-xs leading-[18px] uppercase font-druk_wide">
					buy a ticket
				</button>
			</div>
			<Image src={AboutLocationPhoto} alt="AboutLocationPhoto" className="hidden desktop:block bg-[#306B54]" />
		</div>
	);
}

export default AboutLocation;
