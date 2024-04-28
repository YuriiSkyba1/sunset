"use client";

import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentSuccessPopUp from "@/components/PaymentSuccessPopUp/PaymentSuccessPopUp";
import React, { useState } from "react";

export default function page() {
	const [isSuccess, setOpenSuccess] = useState(true);

	return (
		<div className="relative">
			<HeaderCheckout />
			<PaymentSuccessPopUp active={isSuccess} setActive={setOpenSuccess} />
		</div>
	);
}
