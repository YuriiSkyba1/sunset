"use client";
import Image from "next/image";
import CloseIcon from "@/assets/close-icon.svg";
import Underline from "@/assets/primary_underline.svg";
import ContactUsForm from "../ContactUsForm/ContactUsForm";
import { useSelector } from "@/hooks";

interface ContactUsModalInterface {
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	activeThank: boolean;
	setActiveThank: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContactUsModal({ active, setActive, activeThank, setActiveThank }: ContactUsModalInterface) {
	const closeModal = () => {
		setActive(false);
	};

	const contactUsModal = useSelector((state) => state.data);

	if (!contactUsModal?.success?.contact_us_form?.translations) {
		return null; // или заглушка, если данные не загружены
	}

	const { title, subtitle } = contactUsModal.success.contact_us_form.translations;

	return (
		<>
			{active && (
				<div
					onClick={closeModal}
					className="h-screen w-screen fixed z-20 bg-backgroundOpacity top-0 left-0 flex items-center justify-center "
				>
					<div
						onClick={(e) => {
							e.stopPropagation();
						}}
						className="bg-white  relative pt-[60px] pb-11 px-6 desktop:py-20 desktop:px-28 max-desktop:mx-3"
					>
						<button onClick={closeModal} className=" absolute right-6 top-6">
							<Image src={CloseIcon} alt="CloseIcon"></Image>
						</button>
						<div className="flex flex-col items-center">
							<div className="mb-6 desktop:mb-12 flex flex-col items-center">
								<div className="font-druk_wide text-lg leading-6 desktop:text-[32px] desktop:leading-10 font-bold ">
									{title}
								</div>
								<Image src={Underline} alt="Underline" className="desktop:mb-2" />
								<div className="font-gotham_pro_regular text-xs leading-5 desktop:text-sm desktop:leading-[22px]">
									{subtitle}
								</div>
							</div>
							<ContactUsForm
								activeContactUsModal={active}
								setActiveContactUsModal={setActive}
								activeThank={activeThank}
								setActiveThank={setActiveThank}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ContactUsModal;
