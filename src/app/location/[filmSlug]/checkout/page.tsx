"use client";

import BreadCrumbsCheckout from "@/components/BreadCrumbsStore/BreadCrumbsStore";
import Checkout from "@/components/Checkout/Checkout";
import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";

function page() {
	return (
		<div className="relative">
			<HeaderCheckout />
			<div className="w-full max-w-[375px] desktop:w-full desktop:max-w-[1440px] m-auto">
				<BreadCrumbsCheckout />
				<Checkout />
			</div>
		</div>
	);
}

export default page;
