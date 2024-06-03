"use client";

import { useEffect, useState } from "react";
import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentSuccessPopUp from "@/components/PaymentSuccessPopUp/PaymentSuccessPopUp";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
	const [isSuccess, setOpenSuccess] = useState(false);
	const [orderId, setOrderId] = useState<number>(0);
	const [downloadLinks, setDownloadLinks] = useState<string[]>([]);
	const [email, setEmail] = useState<string>("");

	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const searchParams = new URLSearchParams(window.location.search);
			const order_id = searchParams.get("order_id");
			console.log("Fetched order_id:", order_id);
			if (order_id) {
				setOrderId(parseInt(order_id, 10));
				// setOpenSuccess(true);
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

	useEffect(() => {
		const handlePopState = (event) => {
			if (isSuccess) {
				router.push("/location");
			}
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [isSuccess, router]);

	const handleStatusCheck = async (order_id: number) => {
		const url = `/api/checkStatus?order_id=${order_id}`;
		console.log("Attempting to fetch:", url, "order_id", order_id);
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});

			if (!response.ok) {
				setDownloadLinks([]);
				setEmail("dummyemail@email.com");
				setOpenSuccess(true);
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				const links = data.items.map((item) => item.ticket_url);
				const newEmail = data.email;
				setDownloadLinks(links);
				setEmail(newEmail);
				setOpenSuccess(true);
			}
		} catch (error) {
			console.error("Error checking status:", error);
		}
	};

	return (
		<div className="relative">
			<HeaderCheckout />
			<PaymentSuccessPopUp
				active={isSuccess}
				setActive={setOpenSuccess}
				downloadLinks={downloadLinks}
				email={email}
			/>
		</div>
	);
}
