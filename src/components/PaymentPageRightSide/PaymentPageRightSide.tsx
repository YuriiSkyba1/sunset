import React, { useCallback, useEffect, useState } from "react";
import Exclude from "@/assets/checkout/Exclude.svg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "@/hooks";
import CheckoutListTicket from "../CheckoutListTicket/CheckoutListTicket";
import CheckoutListStoreItem from "../CheckoutListStoreItem/CheckoutListStoreItem";
import RemoveButton from "@/assets/checkout/remove-button.svg";
import Image from "next/image";
import _debounce from "lodash.debounce";
import { addResponse } from "@/redux/cartResponsesSlice/cartResponsesSlice";
import { useFormikContext } from "formik";

function PaymentPageRightSide() {
	const dispatch = useDispatch();

	const { submitForm } = useFormikContext();

	const router = useRouter();
	const [timeLeft, setTimeLeft] = useState(15 * 60);
	const [promoValue, setPromoValue] = useState(""); // тут 0.15 змінити 15 для тесту

	const sessionSelection = useSelector((state) => state.sessionSelection);
	const cartResponses = useSelector((state) => state.cartResponses);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [timeLeft]);

	useEffect(() => {
		if (timeLeft === 0) {
			router.push("/location");
		}
	}, [timeLeft, router]);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	const handleInputChange = useCallback(
		_debounce(async (value) => {
			console.log("Debounced promo:", value);
			try {
				const response = await fetch("/api/applyPromocode", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ promocode: value }),
					credentials: "include",
				});
				console.log(response, "res");
				if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
				const data = await response.json();
				dispatch(addResponse(data));
			} catch (error) {
				console.error("Error submitting promocode:", error);
			}
		}, 2000),
		[]
	);

	const handlePromoValueChange = (event) => {
		const { value } = event.target;
		setPromoValue(value);
		handleInputChange(value);
	};

	const handleRemoveClick = () => {
		setPromoValue("");
	};

	return (
		<div className="h-fit desktop:min-w-[380px] w-full min-w-[349px]">
			<div
				style={{
					backgroundImage: `url(${Exclude.src})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					height: "100%",
				}}
				className={`py-10 px-6 border-b`}
			>
				<div className=" flex flex-row items-center justify-between font-druk_wide text-[14px] leading-[14px] desktop:text-[18px] desktop:leading-6 mb-5 desktop:mb-[32px]">
					<span>BUY A TICKET</span>
					<span className=" flex gap-2 bg-black_main text-white p-1">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM11 8H13V14H11V8ZM8 1H16V3H8V1Z"
								fill="#FD84C7"
							/>
						</svg>

						<span className="ml-2 font-gotham_pro_medium text-[16px] leading-6">
							{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
						</span>
					</span>
				</div>

				{sessionSelection.checkedTickets &&
					sessionSelection.checkedTickets.map((ticket) => (
						<CheckoutListTicket
							event_ticket_id={ticket.event_ticket_id}
							row={ticket.row}
							seat={ticket.seat}
							price={ticket.price}
							status={ticket.status}
							key={ticket.event_ticket_id}
							color={ticket.color}
						></CheckoutListTicket>
					))}
			</div>
			<div
				className={`${
					sessionSelection.checkedStoreItem.length === 0 ? "hidden" : ""
				} py-10 px-6 bg-[#F9F7DB] border border-t-0`}
			>
				<div className="font-druk_wide text-[14px] leading-[14px] desktop:text-[18px] desktop:leading-6 mb-5 desktop:mb-[32px]">
					STORE
				</div>
				<div className="flex flex-col gap-8">
					{sessionSelection.checkedStoreItem &&
						sessionSelection.checkedStoreItem.map((storeItem) => (
							<CheckoutListStoreItem
								store_item_id={storeItem.store_item_id}
								title={storeItem.title}
								price={storeItem.price}
								image={storeItem.image}
								button={storeItem.button}
								description={storeItem.description}
							></CheckoutListStoreItem>
						))}
				</div>
			</div>

			<div className="py-5 px-6 desktop:border-b desktop:py-6 bg-[#F9F7DB] border border-t-0 border-p-0 ">
				<span className="mb-2 uppercase font-druk_wide text-[12px] leading-[18px]">promocode</span>
				<div className="relative">
					<input
						type="text"
						className="bg-white border w-full py-[12px] px-4"
						value={promoValue}
						onChange={handlePromoValueChange}
					/>
					<button onClick={() => handleRemoveClick()} className="absolute z-10 right-4 top-[14px]">
						<Image src={RemoveButton} alt="RemoveButton" />
					</button>
				</div>
			</div>

			<div className="p-6 flex justify-between border border-t-0 font-druk_wide text-[12px] leading-[18px]">
				<span>TOTAL</span>

				<div className="flex gap-2">
					{cartResponses.discount === "0.00" && cartResponses.total}$
					{cartResponses.discount !== "0.00" && cartResponses.total}
					{cartResponses.discount !== "0.00" && (
						<span className="line-through font-gotham_pro_regular">{cartResponses.subtotal}</span>
					)}
				</div>
			</div>
			<button
				className="w-[348px] border border-t-0 desktop:w-[424px] py-[14px] font-druk_wide text-[12px] leading-[18px] bg-primary uppercase"
				onClick={() => submitForm()}
			>
				buy a ticket
			</button>
		</div>
	);
}

export default PaymentPageRightSide;
