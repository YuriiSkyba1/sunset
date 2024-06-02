import Image from "next/image";
import { useMemo } from "react";
import Logo from "@/assets/header-logo.svg";
import Link from "next/link";
import FacebookIcon from "@/assets/social-icons/icon-facebook.svg";
import InstagramIcon from "@/assets/social-icons/icon-instagram.svg";
import TelegramIcon from "@/assets/social-icons/icon-telegram.svg";
import IconAccount from "@/assets/icon-account.svg";
import IncreateLogo from "@/assets/increate-logo-footer.svg";
import SubscriptionForm from "../SubscriptionForm/SubscriptionForm";
import LanguageDropdownSmall from "../LanguageDropdown/LanguageDropdownSmall";
import CountryDropdownSmall from "../CountryDropdown/CountryDropdownSmall";

function FooterMobile() {
	const footerContent = useMemo(() => (
		<div className="w-full max-w-[375px] m-auto">
			<div className="pt-10 pb-2 px-3">
				<div className="flex flex-col gap-8">
					<div>
						<div className="flex gap-3 mb-5">
							<Image src={Logo} alt="Logo" width={168} />
							<p className="text-[10px] font-gotham_pro_regular leading-[14px] tracking-[-0.5px]">
								If you want to become a part of our Sunset Family and be the first to know about cool offers and news
							</p>
						</div>
						<SubscriptionForm />
					</div>
					<div className="grid grid-cols-2 text-[12px] font-druk_wide leading-4">
						<div className="flex flex-col gap-3">
							<Link href="/location" className="block">LOCATION</Link>
							<Link href="" className="block">COOPERATION</Link>
							<Link href="" className="block">JOIN SUNSET</Link>
						</div>
						<div>
							<Link href="" className="block">
								<p>ADDITIONAL SERVICES</p>
								<p>AND PRO-OPPOSITIONS</p>
							</Link>
						</div>
					</div>
					<div>
						<p className="mb-3 font-druk_wide text-[12px] leading-4">CONTACTS</p>
						<div className="grid grid-cols-1 gap-4 text-[14px]">
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-[2px]">
									<p className="font-gotham_pro_regular text-[14px] leading-5 text-grey_dark">Location</p>
									<p className="font-gotham_pro_medium text-[14px] leading-5">Na Pankráci 86, 140 00 Praha 4-Nusle</p>
								</div>
								<div className="flex flex-col gap-[2px]">
									<p className="font-gotham_pro_regular text-[14px] leading-5 text-grey_dark">Phone number</p>
									<p className="font-gotham_pro_medium text-[14px] leading-5">+420 737 316 542</p>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-[2px]">
									<p className="font-gotham_pro_regular text-[14px] leading-5 text-grey_dark">E-mail</p>
									<p className="font-gotham_pro_medium text-[14px] leading-5">sunset.cinema.cz.info@gmail.com</p>
								</div>
								<div className="flex flex-col gap-[6px]">
									<p className="font-gotham_pro_regular text-[14px] leading-5 text-grey_dark">Networks</p>
									<div className="flex gap-4">
										<Link href=""><Image src={FacebookIcon} alt="FacebookIcon" /></Link>
										<Link href=""><Image src={InstagramIcon} alt="InstagramIcon" /></Link>
										<Link href=""><Image src={TelegramIcon} alt="TelegramIcon" /></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="py-2 border-y border-grey_medium flex justify-between">
							<LanguageDropdownSmall />
							<CountryDropdownSmall />
						</div>
						<div className="flex justify-evenly py-4 items-center font-druk_wide text-[12px] leading-[18px]">
							<Link href="" className="flex items-center gap-2">
								<Image src={IconAccount} alt="IconAccount" />
								<p>LOG IN</p>
							</Link>
							<div className="w-[1px] h-[21px] bg-grey_medium mx-8"></div>
							<Link href="" className="">SIGN UP</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-primary text-white py-3 px-[14px] font-gotham_pro_medium text-[12px] leading-3">
				<div className="flex justify-between mb-2">
					<Link href="">Privacy policy</Link>
					<Link href="">Terms of use</Link>
				</div>
				<div className="flex gap-3">
					<p>Created by:</p>
					<Image src={IncreateLogo} alt="IncreateLogo" />
				</div>
			</div>
		</div>
	), []);

	return <div className="desktop:hidden">{footerContent}</div>;
}

export default FooterMobile;
