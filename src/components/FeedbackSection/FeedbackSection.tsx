import Image from "next/image";
import FeedbackBanner from "@/assets/feedback-banner.jpg";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import Underline from "@/assets/primary_underline.svg";

function FeedbackSection() {
	return (
		<div className="px-4 py-10 desktop:px-[60px] desktop:pt-20 desktop:pb-40 desktop:flex desktop:justify-between desktop:gap-6">
			<div className="flex-1 ">
				<div className="text-[24px] leading-[32px] mb-1 uppercase font-bold desktop:text-[40px] desktop:leading-[48px] desktop:mb-8">
					feedback form
					<Image src={Underline} alt="Underline" className="w-full max-w-[536px]" />
				</div>
				<div className="text-[16px] leading-6 mb-8 desktop:text-[18px] desktop:leading-[28px] desktop:mb-14">
					Family and be the first to know about cool offers and news, be sure to leave your contacts.
				</div>
				<Image src={FeedbackBanner} alt="FeedbackBanner" className="mb-8 desktop:hidden " />
				<FeedbackForm />
			</div>
			<div className="hidden desktop:block desktop:flex-1">
				<Image src={FeedbackBanner} alt="FeedbackBanner" />
			</div>
		</div>
	);
}

export default FeedbackSection;
