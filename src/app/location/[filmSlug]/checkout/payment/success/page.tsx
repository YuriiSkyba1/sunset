"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentSuccessPopUp from "@/components/PaymentSuccessPopUp/PaymentSuccessPopUp";

export default function SuccessPage() {
    const [isSuccess, setOpenSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const router = useRouter();
console.log('1')
    useEffect(() => {
		console.log('ready')
        if (router.isReady) {
            setOrderId(router.query.order_id);
        }
    }, [router.isReady, router.query]);

    useEffect(() => {
		console.log(orderId, 'orderId')
        if (orderId) {
            handleStatusCheck(orderId);
        }
    }, [orderId]);

    const handleStatusCheck = async (order_id) => {
        const url = `/api/checkStatus?order_id=${order_id}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
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
        }
    };

    return (
        <div className="relative">
            <HeaderCheckout />
            <PaymentSuccessPopUp active={isSuccess} setActive={setOpenSuccess} />
        </div>
    );
}
