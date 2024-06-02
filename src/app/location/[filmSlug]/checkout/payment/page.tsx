"use client";

import React, { useEffect } from "react";
import BreadCrumbsPayment from "@/components/BreadCrumbsPayment/BreadCrumbsPayment";
import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentPage from "@/components/PaymentPage/PaymentPage";

const page: React.FC = () => {
	return (
		<div className="w-full">
			<HeaderCheckout />
			<div className="w-full max-w-[375px] desktop:w-full desktop:max-w-[1440px] m-auto">
				<BreadCrumbsPayment />
				<PaymentPage />
			</div>
		</div>
	);
};

export default page;
