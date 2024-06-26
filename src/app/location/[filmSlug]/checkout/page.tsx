"use client";

import BreadCrumbsStore from "@/components/BreadCrumbsStore/BreadCrumbsStore";
import Checkout from "@/components/Checkout/Checkout";
import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import { useEffect } from "react";

function page() {
	useEffect(() => {
		localStorage.removeItem("timeLeft");
	}, []);

	return (
		<div className="relative">
			<HeaderCheckout />
			<div className="w-full max-w-[375px] desktop:w-full desktop:max-w-[1440px] m-auto">
				<BreadCrumbsStore />
				<Checkout />
			</div>
		</div>
	);
}

export default page;
