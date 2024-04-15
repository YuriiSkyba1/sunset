import Link from "next/link";
import Image from "next/image";
import { useSelector } from "@/hooks";
import LocationMap from "@/assets/contacts-location.png";
import Underline from "@/assets/primary_underline.svg";
import FacebookIcon from "@/assets/social-icons/icon-facebook.svg";
import InstagramIcon from "@/assets/social-icons/icon-instagram.svg";
import TelegramIcon from "@/assets/social-icons/icon-telegram.svg";
import LocationIcon from "@/assets/contacts-icons/icon-location.svg";
import PhoneIcon from "@/assets/contacts-icons/icon-phone.svg";
import EmailIcon from "@/assets/contacts-icons/icon-email.svg";
import NetworkingIcon from "@/assets/contacts-icons/icon-networking.svg";

function ContactsSection() {
	const renderingData = useSelector((state) => state.locationView.success);

	return (
		<div className="px-4 py-10 desktop:px-[60px] desktop:py-20 desktop:flex desktop:justify-between desktop:gap-6">
			<div className="flex flex-1 flex-col gap-5 desktop:gap-10">
				<div className="font-druk_wide w-full max-w-[227px] text-[24px] leading-[32px] uppercase desktop:max-w-[366px] desktop:text-[40px] desktop:leading-[48px]">
					{renderingData?.contact_title}
					<Image src={Underline} alt="LocationMap" />
				</div>
				<Image src={LocationMap} alt="LocationMap" className="desktop:hidden" />
				<div className="bg-[#F9F8F9] p-4 flex flex-col gap-4 desktop:py-8 desktop:px-6 desktop:grid desktop:grid-cols-2 desktop:gap-x-6 desktop:gap-y-8 ">
					<div className="w-full desktop:max-w-[288px]">
						<div className="flex gap-2 font-druk_wide uppercase text-[10px] leading-[18px] mb-[6px] desktop:text-[12px] desktop:mb-3">
							<Image src={LocationIcon} alt="LocationIcon" />
							Location
						</div>
						<div className="font-gotham_pro_regular text-[12px] leading-[18px] desktop:text-[16px] desktop:leading-6">
							{renderingData?.address}
						</div>
					</div>
					<div className='w-full desktop:max-w-[288px]"'>
						<div className="flex gap-2 font-druk_wide uppercase text-[10px] leading-[18px] mb-[6px]  desktop:text-[12px] desktop:mb-3">
							<Image src={EmailIcon} alt="EmailIcon" />
							E-mail
						</div>
						<div className="font-gotham_pro_regular text-[12px] leading-[18px] desktop:text-[16px] desktop:leading-6">
							{renderingData?.email}
						</div>
					</div>
					<div className='w-full desktop:max-w-[288px]"'>
						<div className="flex gap-2 font-druk_wide uppercase text-[10px] leading-[18px] mb-[6px] desktop:text-[12px] desktop:leading-[18px] desktop:mb-3">
							<Image src={PhoneIcon} alt="PhoneIcon" />
							Phone number
						</div>
						<div className="font-gotham_pro_regular text-[12px] leading-[18px] desktop:text-[16px] desktop:leading-6">
							{renderingData?.phone}
						</div>
					</div>
					<div className='w-full desktop:max-w-[288px]"'>
						<div className="flex gap-2 font-druk_wide uppercase text-[10px] leading-[18px] mb-[6px] desktop:text-[12px] desktop:mb-3">
							<Image src={NetworkingIcon} alt="NetworkingIcon" />
							Networks
						</div>
						<div className="flex gap-4">
							<Link href={""}>
								<Image src={FacebookIcon} alt="FacebookIcon" />
							</Link>
							<Link href={""}>
								<Image src={InstagramIcon} alt="InstagramIcon" />
							</Link>
							<Link href={""}>
								<Image src={TelegramIcon} alt="TelegramIcon" />
							</Link>
						</div>
					</div>
				</div>
			</div>

			<Image src={LocationMap} alt="LocationMap" className="hidden desktop:block" />
		</div>
	);
}

export default ContactsSection;
