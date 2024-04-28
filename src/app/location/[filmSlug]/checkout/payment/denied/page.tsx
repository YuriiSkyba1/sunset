"use client";

import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentDeniedPopUp from "@/components/PaymentDeniedPopUp/PaymentDeniedPopUp";
import PaymentSuccessPopUp from "@/components/PaymentSuccessPopUp/PaymentSuccessPopUp";
import React, { useState } from "react";

export default function page() {
	const [isDenied, setOpenDenied] = useState(true);

	return (
		<div className="relative">
			<HeaderCheckout />
			<PaymentDeniedPopUp active={isDenied} setActive={setOpenDenied} />
		</div>
	);
}
