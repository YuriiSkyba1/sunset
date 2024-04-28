"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import HeaderCheckout from "@/components/HeaderCheckout/HeaderCheckout";
import PaymentSuccessPopUp from "@/components/PaymentSuccessPopUp/PaymentSuccessPopUp";

export default function SuccessPage() {
    const [isSuccess, setOpenSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        console.log('Router query object:', router.query); // Log the entire query object for debugging
        if (router.isReady) {
            const id = router.query.order_id; // Check the parameter name carefully
            console.log('Fetched order_id:', id);
            if (id) {
                setOrderId(parseInt(id, 10)); // Ensuring it's a number, add error handling as necessary
            }
        }
    }, [router.isReady, router.query]);

    useEffect(() => {
        if (orderId) {
            console.log('Order ID set:', orderId);
            handleStatusCheck(orderId);
        } else {
            console.log('Order ID is null, check query parameters and URL formatting');
        }
    }, [orderId]);

    const handleStatusCheck = async (order_id) => {
        const url = `/api/checkStatus?order_id=${order_id}`;
        console.log("Attempting to fetch:", url);
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
