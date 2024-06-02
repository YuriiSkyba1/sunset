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

function FooterDesktop() {
	const footerContent = useMemo(() => (
		<div className="desktop:max-w-[1440px] desktop:m-auto desktop:relative">
			<div className="pt-10 pb-20 px-[60px] flex gap-3">
				<div className="flex flex-col gap-[52px] pr-12">
					<Image src={Logo} alt="Logo" width={275.5} height={55} />
					<div className="w-[200px]">
						<p className="font-gotham_pro_regular text-[12px] leading-[18px] mb-1 tracking-[-0.5px]">
							If you want to become a part of our Sunset Family and be the first to know about cool offers and news
						</p>
						<SubscriptionForm />
					</div>
				</div>
				<div className="flex gap-6">
					<div className="w-[312px] flex flex-col gap-[37.25px] font-druk_wide text-[14px] leading-5">
						<Link href="/location">LOCATION</Link>
						<Link href="">SUNSET FAMILY</Link>
						<Link href="">
							<p>ADDITIONAL SERVICES</p>
							<p>AND PRO-OPPOSITIONS</p>
						</Link>
						<Link href="">COOPERATION</Link>
						<Link href="">JOIN OUR TEAM</Link>
					</div>
					<div className="max-w-[648px]">
						<div className="font-druk_wide text-[14px] leading-5 mb-[24px]">CONTACTS</div>
						<div className="grid grid-cols-2 gap-6 text-[16px] mb-[60px]">
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-1">
									<p className="font-gotham_pro_regular text-[16px] leading-6 text-grey_dark">Location</p>
									<p className="font-gotham_pro_medium text-[16px] leading-6">Na Pankráci 86, 140 00 Praha 4-Nusle</p>
								</div>
								<div className="flex flex-col gap-1">
									<p className="font-gotham_pro_regular text-[16px] leading-6 text-grey_dark">Phone number</p>
									<p className="font-gotham_pro_medium text-[16px] leading-6">+420 737 316 542</p>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-1">
									<p className="font-gotham_pro_regular text-[16px] leading-6 text-grey_dark">E-mail</p>
									<p className="font-gotham_pro_medium text-[16px] leading-6">sunset.cinema.cz.info@gmail.com</p>
								</div>
								<div className="flex flex-col gap-2">
									<p className="font-gotham_pro_regular text-[16px] leading-6 text-grey_dark">Networks</p>
									<div className="flex gap-4">
										<Link href=""><Image src={FacebookIcon} alt="FacebookIcon" /></Link>
										<Link href=""><Image src={InstagramIcon} alt="InstagramIcon" /></Link>
										<Link href=""><Image src={TelegramIcon} alt="TelegramIcon" /></Link>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-between pt-6 border-t border-grey_medium">
							<div className="flex items-center">
								<LanguageDropdownSmall />
								<div className="w-[1px] h-[21px] bg-grey_medium mx-8"></div>
								<CountryDropdownSmall />
							</div>
							<div className="flex items-center font-druk_wide text-[12px] leading-[18px]">
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
			</div>
			<div className="bg-primary text-white py-3 px-[60px] flex justify-between font-gotham_pro_medium text-[14px] leading-[22px]">
				<div className="flex gap-60">
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

	return <div className="hidden desktop:block">{footerContent}</div>;
}

export default FooterDesktop;
