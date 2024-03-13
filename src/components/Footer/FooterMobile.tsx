import Image from "next/image";
import Logo from "@/assets/header-logo.svg";
import Link from "next/link";
import FacebookIcon from "@/assets/social-icons/icon-facebook.svg";
import InstagramIcon from "@/assets/social-icons/icon-instagram.svg";
import TelegramIcon from "@/assets/social-icons/icon-telegram.svg";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import CountryDropdown from "../CountryDropdown/CountryDropdown";
import IconAccount from "@/assets/icon-account.svg";
import IncreateLogo from "@/assets/increate-logo-footer.svg";
import SubscriptionForm from "../SubscriptionForm/SubscriptionForm";

function FooterMobile() {
	return (
		<div className=" w-full max-w-[375px] m-auto desktop:hidden">
			<div className="pt-10 pb-2  px-3">
				<div className="flex flex-col gap-8">
					<div>
						<div className="flex gap-3 mb-5">
							<Image src={Logo} alt="Logo" width={168} />
							<p className="text-[10px]">
								If you want to become a part of our Sunset Family and be the first to know about cool
								offers and news
							</p>
						</div>
						<SubscriptionForm />
					</div>
					<div className="grid grid-cols-2 font-bold text-[12px]">
						<div>
							<Link href={""} className="block">
								LOCATION
							</Link>
							<Link href={""} className="block">
								COOPERATION
							</Link>
							<Link href={""} className="block">
								JOIN SUNSET
							</Link>
						</div>
						<div>
							<Link href={""} className="block">
								<p>ADDITIONAL SERVICES</p>
								<p>AND PRO-OPPOSITIONS</p>
							</Link>
						</div>
					</div>
					<div>
						<p className="mb-3 font-bold text-[12px] leading-4">CONTACTS</p>
						<div className=" grid grid-cols-1 gap-4 text-[14px] ">
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-[2px]">
									<p className="text-grey_dark">Location</p>
									<p className=" font-bold">Na Pankráci 86, 140 00 Praha 4-Nusle</p>
								</div>
								<div className="flex flex-col gap-[2px]">
									<p className="text-grey_dark">Phone number</p>
									<p className=" font-bold">+420 737 316 542</p>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-[2px]">
									<p className="text-grey_dark">E-mail</p>
									<p className=" font-bold">sunset.cinema.cz.info@gmail.com</p>
								</div>
								<div className="flex flex-col gap-[2px]">
									<p className="text-grey_dark">Networks</p>
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
					<div className="">
						<div className="py-2 border-y border-grey_medium flex justify-between">
							<LanguageDropdown />
							<CountryDropdown />
						</div>
						<div className="flex justify-evenly py-4 items-center font-bold">
							<Link href={""} className="flex items-center gap-2">
								<Image src={IconAccount} alt="IconAccount" />
								<p>LOG IN</p>
							</Link>
							<div className=" w-[1px] h-[21px] bg-grey_medium mx-8"></div>
							<Link href={""} className="">
								SIGN UP
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className=" bg-primary text-white py-3 px-[14px] text-[12px] leading-3">
				<div className="flex justify-between mb-2">
					<Link href={""}>Privacy policy</Link>
					<Link href={""}>Terms of use</Link>
				</div>
				<div className="flex gap-3">
					<p>Created by:</p>
					<Image src={IncreateLogo} alt="IncreateLogo" />
				</div>
			</div>
		</div>
	);
}

export default FooterMobile;
