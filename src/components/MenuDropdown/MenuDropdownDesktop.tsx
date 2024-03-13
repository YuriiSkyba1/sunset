import Link from "next/link";
import Image from "next/image";
import ContactUsButton from "../ContactUsButton/ContactUsButton";
import CountryDropdown from "../CountryDropdown/CountryDropdown";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import FacebookIcon from "@/assets/social-icons/icon-facebook.svg";
import InstagramIcon from "@/assets/social-icons/icon-instagram.svg";
import TelegramIcon from "@/assets/social-icons/icon-telegram.svg";
import MenuBanner from "@/assets/menu-banner.png";

function MenuDropdownDesktop() {
	return (
		<div className="hidden desktop:block">
			<div className="absolute z-10 left-0  bg-pink_light flex desktop:flex-row  desktop:max-w-[1440px] desktop:top-[82px]  ">
				<div className="pt-10 mx-[60px] w-[601px]">
					<div className=" font-bold text-[32px] mb-20">
						<Link href={""} className="block mb-8">
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
						<p className="font-bold mt-6">CONTACTS</p>
						<div className=" grid grid-cols-2 gap-6 text-[16px] mb-6">
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-1">
									<p>Location</p>
									<p className=" font-bold">Na Pankráci 86, 140 00 Praha 4-Nusle</p>
								</div>
								<div className="flex flex-col gap-1">
									<p>Phone number</p>
									<p className=" font-bold">+420 737 316 542</p>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-1">
									<p>E-mail</p>
									<p className=" font-bold">sunset.cinema.cz.info@gmail.com</p>
								</div>
								<div className="flex flex-col gap-1">
									<p>Networks</p>
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
					<div className="flex py-6 items-center gap-6">
						<div className="flex  items-center">
							<LanguageDropdown />
							<div className="w-[1px] h-[21px] bg-grey_medium mx-3"></div>
							<CountryDropdown />
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
