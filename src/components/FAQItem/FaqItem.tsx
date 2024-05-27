import { IFAQItem } from "@/redux/getLocationsView/types/IGetLocationsView";
import { useState } from "react";
import Image from "next/image";
import PlusIcon from "@/assets/faq-icons/icon-plus.svg";
import MinusIcon from "@/assets/faq-icons/icon-minus.svg";
import parse from 'html-react-parser';

function FaqItem({ question, answer }: IFAQItem) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<div
			onClick={() => setIsOpen(!isOpen)}
			style={{
				backgroundColor: isOpen ? "#FD84C7" : "",
				overflow: "hidden",
				transition: "background-color 0.3s",
			}}
		>
			<div className={(isOpen ? "" : "border border-grey_medium ") + "py-5 px-4 flex justify-between"}>
				<div className="font-druk_wide max-w-[80%] text-[12px] leading-[18px] uppercase desktop:text-[18px] desktop:leading-6">
					{question}
				</div>
				{isOpen ? <Image src={MinusIcon} alt="MinusIcon" /> : <Image src={PlusIcon} alt="PlusIcon" />}
			</div>

			<div style={{ maxHeight: isOpen ? "1000px" : "0", overflow: "hidden", transition: "max-height 0.3s" }}>
				<div className="font-gotham_pro_regular pb-5 px-4 text-sm leading-[22px]">{parse(answer)}</div>
			</div>
		</div>
	);
}

export default FaqItem;
