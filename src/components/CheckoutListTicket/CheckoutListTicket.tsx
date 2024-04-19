import React from "react";
import { EventTicket } from "@/redux/getFilmView/types/IGetFilmView";
import Image from "next/image";
import RemoveButton from "@/assets/checkout/remove-button.svg";

interface ICheckoutListTicket {
	seat: number;
	row: number;
	price: string;
}

function CheckoutListTicket({ seat, row, price }: ICheckoutListTicket) {
	return (
		<div>
			<div className="border bg-white py-[12px] desktop:px-[16px] px-[12px] flex justify-between font-gotham_pro_regular text-[14px] leading-[14px] desktop:text-[16px] desktop:leading-6">
				<div className="flex gap-4">
					<div>
						<span className="text-grey_dark mr-2">Row:</span>
						<span>#{row}</span>
					</div>
					<div>
						<span className="text-grey_dark mr-2">Seat:</span>
						<span>#{seat}</span>
					</div>
				</div>
				<div>
					<button>
						<Image src={RemoveButton} alt="RemoveButton" />
					</button>
				</div>
			</div>
			<div className="font-druk_wide text-[12px] leadin-[18px] flex justify-between pb-1 desktop:pb-2 mt-2 border-b border-grey_dark">
				<span>PRICE:</span>
				<span>{price}$</span>
			</div>
			<div className="mb-2 text-[12px] leading-[18px]">
				<span className=" font-gotham_pro_regular"></span>
				<span className=" font-gotham_pro_bold"></span>
			</div>
		</div>
	);
}

export default CheckoutListTicket;
