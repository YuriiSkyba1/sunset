import Link from "next/link";
import Image from "next/image";
import ContactUsButton from "../ContactUsButton/ContactUsButton";
import LocationDropdown from "../LocationDropdown/LocationDropdown";
import FacebookIcon from "@/assets/social-icons/icon-facebook.svg";
import InstagramIcon from "@/assets/social-icons/icon-instagram.svg";
import TelegramIcon from "@/assets/social-icons/icon-telegram.svg";
import IconAccount from "@/assets/icon-account.svg";
import BlackRightArrow from "@/assets/right-black-arrow.svg";
import { useDispatch } from "@/hooks";
import LanguageDropdownSmall from "../LanguageDropdown/LanguageDropdownSmall";
import CountryDropdownSmall from "../CountryDropdown/CountryDropdownSmall";

function MenuDropdownMobile() {
	const dispatch = useDispatch();

	return (
		<div className="block desktop:hidden">
			<div className="fixed h-dvh overflow-y-scroll z-10 top-[50px] left-0 bg-pink_light flex flex-col items-center w-full">
				<div className=" w-full max-w-[375px] px-3">
					<div className="mt-5">
						<LocationDropdown />
					</div>
					<div className="mt-8 font-druk_wide text-[14px] leading-[24px] flex flex-col gap-[20px] mb-20">
						<Link href={""} className="flex justify-between">
							<div className="font-bold">
								<p>SUNSET FAMILY</p>
							</div>
							<Image src={BlackRightArrow} alt="BlackRightArrow" />
						</Link>
						<div className=" bg-black_main h-[1px] "></div>
						<Link href={""} className="flex justify-between">
							<div className="font-bold">
								<p>ADDITIONAL SERVICES</p>
								<p>AND PRO-OPPOSITIONS</p>
							</div>
							<Image src={BlackRightArrow} alt="BlackRightArrow" />
						</Link>
						<div className=" bg-black_main h-[1px]"></div>
						<Link href={""} className="flex justify-between">
							<p className="font-bold">COOPERATION</p>
							<Image src={BlackRightArrow} alt="BlackRightArrow" />
						</Link>
						<div className=" bg-black_main h-[1px]"></div>
						<Link href={""} className="flex justify-between">
							<p className="font-bold">JOIN OUR TEAM</p>
							<Image src={BlackRightArrow} alt="BlackRightArrow" />
						</Link>
					</div>
					<div className="mb-8">
						<p className="mb-3 font-druk_wide text-[12px] leading-4">CONTACTS</p>
						<div className=" grid grid-cols-1 gap-4 text-[16px] mb-6">
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-[2px]">
									<p className="font-gotham_pro_regular text-[14px] leading-5">Location</p>
									<p className="font-gotham_pro_medium text-[14px] leading-5">
										Na Pankráci 86, 140 00 Praha 4-Nusle
									</p>
								</div>
								<div className="flex flex-col gap-[2px]">
									<p className="font-gotham_pro_regular text-[14px] leading-5">Phone number</p>
									<p className="font-gotham_pro_medium text-[14px] leading-5">+420 737 316 542</p>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-[2px]">
									<p className="font-gotham_pro_regular text-[14px] leading-5">E-mail</p>
									<p className="font-gotham_pro_medium text-[14px] leading-5">
										sunset.cinema.cz.info@gmail.com
									</p>
								</div>
								<div className="flex flex-col gap-[2px]">
									<p className="font-gotham_pro_regular text-[14px] leading-5">Networks</p>
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
					</div>
					<div className=" mb-10">
						<div className=" bg-black_main h-[1px] flex flex-col gap-4" />
						<div className="flex justify-between items-center">
							<LanguageDropdownSmall />
							<CountryDropdownSmall />
						</div>

						<div className=" bg-black_main h-[1px] " />
					</div>
					<div className="flex justify-center mb-2">
						<ContactUsButton style="black" width="350px" />
					</div>
					<div className="flex justify-evenly items-center font-bold">
						<Link href={""} className="flex items-center py-4 gap-2">
							<Image src={IconAccount} alt="IconAccount" />
							<p className="font-druk_wide text-[12px] leading-[18px]">LOG IN</p>
						</Link>
						<div className=" w-[1px] h-[21px] bg-grey_medium mx-3"></div>
						<Link href={""} className="font-druk_wide text-[12px] leading-[18px] py-4">
							SIGN UP
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MenuDropdownMobile;
