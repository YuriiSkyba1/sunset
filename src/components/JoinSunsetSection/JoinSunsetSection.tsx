import Image from "next/image";
import JoinSunsetBanner from "@/assets/join-sunset-banner.jpg";

interface IJoinSunsetSection {
	style: "yellow" | "transparent";
}

function JoinSunsetSection({ style }: IJoinSunsetSection) {
	return (
		<div
			style={{ backgroundColor: `${style === "yellow" ? "#F7F262" : "inherit"} ` }}
			className="flex flex-col-reverse mb- desktop:flex-row desktop:mb-20"
		>
			<Image src={JoinSunsetBanner} alt="JoinSunsetBanner" className="flex-1" />
			<div className="flex-1 ">
				<div className="px-4 py-10 desktop:px-[60px] desktop:pt-[340px] desktop:pb-[80px]">
					<div className="uppercase font-druk_wide text-[24px] leading-8 mb-5 desktop:text-[40px] desktop:leading-[48px] desktop:mb-6">
						If you want to become a part of our Sunset
					</div>
					<div className="font-gotham_pro_regular text-[16px] leading-6 mb-10 desktop:mb-14">
						Family and be the first to know about cool offers and news, be sure to leave your contacts.
					</div>
					<button className="uppercase font-druk_wide bg-primary w-full py-[14px] desktop:px-8 desktop:text-[14px] desktop:leading-5 ">
						join sunset family
					</button>
				</div>
			</div>
		</div>
	);
}

export default JoinSunsetSection;
