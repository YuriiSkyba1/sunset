"use client";

import { useEffect, useState } from "react";
import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentSuccessPopUp from "@/components/PaymentSuccessPopUp/PaymentSuccessPopUp";

export default function SuccessPage() {
	const [isSuccess, setOpenSuccess] = useState(false);
	const [orderId, setOrderId] = useState<number>(0);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const searchParams = new URLSearchParams(window.location.search);
			const order_id = searchParams.get("order_id");
			console.log("Fetched order_id:", order_id);
			if (order_id) {
				setOrderId(parseInt(order_id, 10));
				setOpenSuccess(true);
			}
		}
	}, []);

	useEffect(() => {
		if (orderId !== 0) {
			console.log("Order ID set:", orderId);
			handleStatusCheck(orderId);
		} else {
			console.log("Order ID is null, check query parameters and URL formatting");
		}
	}, [orderId]);

	const handleStatusCheck = async (order_id: number) => {
		const url = `/api/checkStatus`;
		console.log("Attempting to fetch:", url);
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ order_id }),
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				console.log("Response data of checking status:", data);
			}
		} catch (error) {
			console.error("Error checking status:", error);
		}
	};

	return (
		<div className="relative">
			<HeaderCheckout />
			<PaymentSuccessPopUp active={isSuccess} setActive={setOpenSuccess} />
		</div>
	);
}
