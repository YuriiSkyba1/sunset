"use client";

import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentSuccessPopUp from "@/components/PaymentSuccessPopUp/PaymentSuccessPopUp";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function page() {
	const [isSuccess, setOpenSuccess] = useState(false);

	const router = useRouter();

	const { order_id } = router.query;

	// Extract the order_id from the query parameters
	const searchParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		console.log("searchParams with JS", searchParams);
	}, []);

	useEffect(() => {
		console.log("order_id with next", order_id);
		handleStatusCheck(order_id as unknown as number);
	}, [order_id]);

	const handleStatusCheck = async (order_id: number) => {
		const url = `/api/checkStatus`;
		console.log("Attempting to fetch:", url); // Check the URL is correct
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ order_id }),
				credentials: "include", // Ensures cookies are included with the request
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				console.log("Response data222 of checking status:", data);
			}
		} catch (error) {
			console.error("Error checking status:", error);
			return false;
		}
	};

	return (
		<div className="relative">
			<HeaderCheckout />
			<PaymentSuccessPopUp active={isSuccess} setActive={setOpenSuccess} />
		</div>
	);
}
