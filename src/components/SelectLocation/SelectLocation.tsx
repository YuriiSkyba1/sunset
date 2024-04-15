import React, { useEffect, useState } from "react";
import { Location } from "@/redux/getFilmView/types/IGetFilmView";
import Image from "next/image";
import Arrow from "@/assets/bot-arrow.svg";

function Select({ options: locations }: { options: Array<Location> }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<button onClick={() => setIsOpen(!isOpen)} className="border border-black_main rounded-none p-3 w-full">
				<div className="flex justify-between font-gotham_pro_regular text-[14px] leading-[20px] text-[#5B5C64]">
					{locations[0].title}
					{locations.length > 1 && (
						<Image src={Arrow} alt="arrow" className={`${isOpen ? "rotate-180" : ""}`} width={24} />
					)}
				</div>
			</button>
			{isOpen && locations.length > 1 && (
				<div className="absolute w-full border border-t-0 p-3 bg-white font-gotham_pro_regular text-[14px] leading-[20px] text-[#5B5C64]">
					<button>{locations.map((option) => option.title)}</button>
				</div>
			)}
		</div>
	);
}

export default Select;
