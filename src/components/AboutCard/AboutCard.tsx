import { IAboutCard } from "@/redux/getLocationsView/types/IGetLocationsView";
import Image from "next/image";

function AboutCard({ title, description, icon }: IAboutCard) {
	return (
		<div className="p-3 desktop:p-6 bg-[#F9F8F9]">
			{/* <Image src={MovieIcon} alt="" className="mb-8" /> */}
			<Image src={icon} alt={title} width={22} height={22} unoptimized={true} loading="lazy" className="mb-8" />
			<div className="font-druk_wide uppercase text-xs leading-[18px] desktop:text-[14px] desktop:leading-6 desktop:mb-2">
				{title}
			</div>
			<div className="font-gotham_pro_regular text-xs leading-[20px] desktop:text-sm desktop:leading-[22px] tracking-[-0.3px]">
				{description}
			</div>
		</div>
	);
}

export default AboutCard;
