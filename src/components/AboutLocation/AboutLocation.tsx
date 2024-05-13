import { useSelector } from "@/hooks";
import Image from "next/image";
import Underline from "@/assets/primary_underline.svg";
import AboutLocationPhoto from "@/assets/about-location_photo.svg";
import AboutCard from "../AboutCard/AboutCard";

function AboutLocation() {
	const renderingData = useSelector((state) => state.locationView.success);

	return (
		<>
			{renderingData && (
				<div className="px-4 py-10 desktop:flex desktop:px-[60px] desktop:py-20 desktop:flex-row desktop:justify-between desktop:gap-[26px]">
					<div className="desktop:flex flex-col desktop:gap-10">
						<div className="font-druk_wide w-full text-[24px] leading-[32px] desktop:text-[40px] desktop:leading-[48px] uppercase max-desktop:mb-4 desktop:max-w-[312px]">
							{renderingData?.about_title}
							<Image src={Underline} alt={"Underline"} />
						</div>
						<div className="desktop:hidden w-[348px] h-[335px] flex justify-center items-center bg-[#306B54] mb-3">
							<div className="relative w-[90%] h-[90%]">
								<Image
									src={renderingData?.about_photo}
									alt="AboutLocationPhoto"
									layout="fill"
									objectFit="contain"
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-3 desktop:gap-6 max-desktop:mb-8">
							{renderingData?.about_cards?.map((card) => (
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
					<div className="hidden desktop:flex min-w-[646px] h-auto bg-[#306B54] justify-center items-center">
						<div className="relative w-[90%] h-[90%]">
							<Image
								src={renderingData?.about_photo}
								alt="AboutLocationPhoto"
								layout="fill"
								objectFit="contain"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default AboutLocation;
