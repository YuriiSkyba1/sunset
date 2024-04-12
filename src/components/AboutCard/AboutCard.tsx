import { IAboutCard } from "@/redux/getLocationsView/types/IGetLocationsView";
import Image from "next/image";
import MovieIcon from "@/assets/about-icons/icon-movie.svg";

function AboutCard({ title, description, icon }: IAboutCard) {
	return (
		<div className="p-3 desktop:p-6 bg-[#F9F8F9]">
			{/* <Image src={MovieIcon} alt="" className="mb-8" /> */}
			<Image src={icon} alt={title} width={22} height={22} unoptimized={true} loading="lazy" className="mb-8" />
			<div className="font-bold text-xs leading-[18px] desktop:text-sm desktop:leading-6 desktop:mb-2">
				{title}
			</div>
			<div className="text-xs leading-[20px] desktop:text-sm desktop:leading-[22px]">{description}</div>
		</div>
	);
}

export default AboutCard;
