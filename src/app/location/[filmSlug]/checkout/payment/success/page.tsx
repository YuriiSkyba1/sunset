"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentSuccessPopUp from "@/components/PaymentSuccessPopUp/PaymentSuccessPopUp";

export default function page() {
	const [isSuccess, setOpenSuccess] = useState(false);
	const router = useRouter();

console.log('111', router)


useEffect(() => {
	console.log('trigger use effect')
    if (typeof window !== "undefined") {
      const { order_id } = router.query;
      console.log("Order ID: ", order_id);
    
    }
  }, [router.isReady, router.query]);

	const handleStatusCheck = async (order_id)  => {
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
