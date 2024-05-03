import React from "react";
import Image from "next/image";
import { useSelector } from "@/hooks";
import CalendarIcon from "@/assets/checkout/calendar.svg";
import LocationIcon from "@/assets/checkout/icon-location.svg";
import SessionIcon from "@/assets/checkout/icon-time.svg";

function PaymentPageAboutFilmSection() {
	const filmView = useSelector((state) => state.filmView);
	const sessionSelection = useSelector((state) => state.sessionSelection);

	return (
		filmView.success && (
			<div className="flex gap-4 border p-[24px] mb-14 ">
				<Image
					className="hidden desktop:block"
					src={filmView.success.movie.poster}
					alt="poster"
					width={200}
					height={240}
					unoptimized={true}
					loading="lazy"
					style={{ height: "fit-content" }}
				/>

				<Image
					className="desktop:hidden"
					src={filmView.success.movie.poster}
					alt="poster"
					width={93}
					height={111}
					unoptimized={true}
					loading="lazy"
					style={{ height: "fit-content" }}
				/>

				<div className="flex flex-col gap-6 flex-grow">
					<div className="uppercase font-druk_wide text-[10px] leading-[18px] desktop:text-[18px] desktop:leading-6">
						{filmView.success.movie.title}
					</div>
					<div>
						<div className="flex flex-col gap-3 pb-4 border-b border-grey_medium mb-[16px]">
							<div className="uppercase flex gap-2 font-druk_wide text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] ">
								<Image src={LocationIcon} alt="LocationIcon" />
								<span>LOCATION</span>
							</div>
							<div className=" font-gotham_pro_regular text-[14px] leading-[22px] desktop:text-[16px] desktop:leading-6">
								{sessionSelection.selectedData.location}
							</div>
						</div>
						<div className="flex gap-5 desktop:gap-24 pb-4 border-grey_medium">
							<div>
								<div className="uppercase flex gap-2 font-druk_wide text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-3">
									<Image src={CalendarIcon} alt="CalendarIcon" />
									DATE
								</div>
								<div className=" font-gotham_pro_regular text-[14px] leading-[22px] desktop:text-[16px] desktop:leading-6">
									{sessionSelection.selectedData.date}
								</div>
							</div>
							<div>
								<div className="uppercase flex gap-2 font-druk_wide text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-3">
									<Image src={SessionIcon} alt="SessionIcon"></Image>
									<span>SESSION</span>
								</div>
								<div className=" font-gotham_pro_regular text-[14px] leading-[22px] desktop:text-[16px] desktop:leading-6">
									{sessionSelection.selectedData.time}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
}

export default PaymentPageAboutFilmSection;
