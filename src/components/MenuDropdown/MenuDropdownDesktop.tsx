"use client";

import Link from "next/link";
import Image from "next/image";
import ContactUsButton from "../ContactUsButton/ContactUsButton";
import FacebookIcon from "@/assets/social-icons/icon-facebook.svg";
import InstagramIcon from "@/assets/social-icons/icon-instagram.svg";
import TelegramIcon from "@/assets/social-icons/icon-telegram.svg";
import MenuBanner from "@/assets/menu-banner.png";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "@/hooks";
import BottomBlackArrow from "../../assets/bottom-black-arrow.svg";
import CountryDropdownSmall from "../CountryDropdown/CountryDropdownSmall";
import LanguageDropdownSmall from "../LanguageDropdown/LanguageDropdownSmall";

function MenuDropdownDesktop() {
	const [isLocationDropdownOpen, setLocationDropdownOpen] = useState<boolean>();

	const locationsList = useSelector((state) => state.locationList.success);
	console.log("locationsList from menuDropdownDesktop:", locationsList);

	return (
		<div className="hidden desktop:block">
			<div className="absolute h-screen max-h-[800px] overflow-y-scroll z-10 left-0  bg-pink_light flex desktop:flex-row  desktop:max-w-[1440px] desktop:top-[82px]  ">
				<div className="pt-10 mx-[60px] w-[601px] h-[800px]">
					<div className=" font-bold text-[24px] leading-8 mb-20 font-druk_wide">
						{locationsList && locationsList.length === 1 && (
							<div>
								<div className=" my-8">
									<Link
										href={"/location"}
										className=" font-bold text-[24px] leading-8 mb-20 font-druk_wide uppercase"
									>
										{locationsList[0].title}
									</Link>
								</div>
							</div>
						)}
						{locationsList && locationsList.length > 1 && (
							<div className="mb-8">
								<button
									className="flex justify-between w-full"
									onClick={() => setLocationDropdownOpen(!isLocationDropdownOpen)}
								>
									<div>LOCATIONS</div>
									<Image
										src={BottomBlackArrow}
										alt="BottomBlackArrow"
										width={32}
										height={32}
										className={`${isLocationDropdownOpen ? "rotate-180" : ""}`}
									></Image>
								</button>
								{isLocationDropdownOpen && (
									<div>
										{locationsList?.map((location) => (
											<div className=" mt-4">
												<Link href={"/location"}>{location.title}</Link>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						<Link href={""} className="block mb-8 ">
							SUNSET FAMILY
						</Link>
						<Link href={""} className="block mb-8">
							<p>ADDITIONAL SERVICES</p>
							<p>AND PRO-OPPOSITIONS</p>
						</Link>
						<Link href={""} className="block mb-8">
							COOPERATION
						</Link>
						<Link href={""} className="block">
							JOIN OUR TEAM
						</Link>
					</div>
					<div>
						<hr />
						<p className="font-bold my-6 font-druk_wide text-[12px] leading-[18px]">CONTACTS</p>
						<div className="flex gap-5 flex-grow text-[16px] mb-6">
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-1">
									<p className="font-gotham_pro_regular text-[16px] leading-6">Location</p>
									<div className="font-gotham_pro_bold text-[16px] leading-6">
										Na Pankráci 86, 140 00 Praha 4-Nusle
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<p className="font-gotham_pro_regular text-[16px] leading-6">Phone number</p>
									<p className="font-gotham_pro_bold">+420 737 316 542</p>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-1">
									<p className="font-gotham_pro_regular text-[16px] leading-6">E-mail</p>
									<p className="font-gotham_pro_bold">sunset.cinema.cz.info@gmail.com</p>
								</div>
								<div className="flex flex-col gap-2">
									<p className="font-gotham_pro_regular text-[16px] leading-6">Networks</p>
									<div className="flex gap-4">
										<Link href={""}>
											<Image src={FacebookIcon} alt="FacebookIcon"></Image>
										</Link>
										<Link href={""}>
											<Image src={InstagramIcon} alt="InstagramIcon"></Image>
										</Link>
										<Link href={""}>
											<Image src={TelegramIcon} alt="TelegramIcon"></Image>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<hr />
					</div>
					<div className="flex my-6 items-center ">
						<div className="flex items-center mr-[60px]">
							<LanguageDropdownSmall />
							<div className="w-[1px] h-[21px] bg-grey_medium mx-3"></div>
							<CountryDropdownSmall />
						</div>

						<ContactUsButton style="black" width="200px" />
					</div>
				</div>
				<Image src={MenuBanner} alt="MenuBanner" className="hidden desktop:block"></Image>
			</div>
		</div>
	);
}

export default MenuDropdownDesktop;
