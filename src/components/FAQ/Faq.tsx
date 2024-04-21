import { useSelector } from "@/hooks";
import Underline from "@/assets/primary_underline.svg";
import Image from "next/image";
import FaqItem from "../FAQItem/FaqItem";

function Faq() {
	const renderingData = useSelector((state) => state.locationView.success);

	return (
		<div className="py-10 px-4 desktop:px-[60px] desktop:py-20">
			<div className=" font-druk_wide w-full text-[24px] leading-[32px] mb-4 max-w-[110px] desktop:max-w-[280px] desktop:text-[40px] desktop:leading-[48px] desktop:mb-14">
				<div>{renderingData?.faq_title}</div>
				<Image src={Underline} alt={Underline}></Image>
			</div>
			<div className="flex flex-col gap-2 desktop:grid desktop:grid-cols-2 desktop:gap-6">
				{renderingData?.faq_items?.map((faq_item) => (
					<FaqItem key={faq_item.question} question={faq_item.question} answer={faq_item.answer} />
				))}
			</div>
		</div>
	);
}

export default Faq;
