import BreadCrumbsPayment from "@/components/BreadCrumbsPayment/BreadCrumbsPayment";
import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentPage from "@/components/PaymentPage/PaymentPage";
import React from "react";

export default function page() {
	return (
		<div>
			<HeaderCheckout />
			<div className="w-full max-w-[375px] desktop:w-full desktop:max-w-[1440px] m-auto">
				<BreadCrumbsPayment />
				<PaymentPage />
			</div>
		</div>
	);
}
