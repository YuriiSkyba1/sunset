"use client";

import { useDispatch, useSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import CheckoutListTicket from "../CheckoutListTicket/CheckoutListTicket";
import CheckoutListStoreItem from "../CheckoutListStoreItem/CheckoutListStoreItem";
import Image from "next/image";
import RemoveButton from "@/assets/checkout/remove-button.svg";
import _debounce from "lodash.debounce";
import { addResponse } from "@/redux/cartResponsesSlice/cartResponsesSlice";
import CalendarIcon from "@/assets/checkout/calendar.svg";
import LocationIcon from "@/assets/checkout/icon-location.svg";
import SessionIcon from "@/assets/checkout/icon-time.svg";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { InputInterfaces } from "./InputsInterface";
import Stripe from "../../assets/payment/stripe-logo.svg";
import PaymentForm from "../PaymentForm/PaymentForm";

function PaymentPage() {
	const dispatch = useDispatch();

	const filmView = useSelector((state) => state.filmView);
	const router = useRouter();
	const [timeLeft, setTimeLeft] = useState(15 * 60); // тут 0.15 змінити 15 для тесту
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

	const sessionSelection = useSelector((state) => state.sessionSelection);
	const cartResponses = useSelector((state) => state.cartResponses);
	const [promoValue, setPromoValue] = useState("");
	const [formFields, setFormFields] = useState<InputInterfaces[]>();

	useEffect(() => {
		handleCheckoutShow();
	}, []);

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

	const handlePromoAction = async (promocode: string) => {
		console.log("Request param promo:", promocode);
		const url = `/api/applyPromocode`;
		console.log("Attempting to fetch:", url); // Check the URL is correct
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ promocode }),
				credentials: "include", // Ensures cookies are included with the request
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				console.log("Response data222:", data);
				dispatch(addResponse(data));
			}
		} catch (error) {
			console.error("Error handling ticket action:", error);
		}
	};

	console.log(formFields);

	const handleCheckoutShow = async () => {
		const url = `/api/showCheckout`;
		console.log("Attempting to fetch:", url); // Check the URL is correct
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // Ensures cookies are included with the request
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				console.log("Response data222 of showing checkout:", data);
				if (data && data.checkoutForm) {
					// Update formFields state with checkoutForm from the response
					setFormFields(data.checkoutForm.inputs);
				} else {
					console.error("No checkoutForm found in response.");
				}
			}
		} catch (error) {
			console.error("Error handling show cart:", error);
			return false;
		}
	};

	interface CustomRadioProps {
		image: string;
		label: string;
		value: string;
	}

	const CustomRadio: React.FC<FieldProps & CustomRadioProps> = ({ field, form, ...props }) => (
		<div style={{ display: "inline-block", marginRight: "10px" }}>
			<div
				style={{
					border: `1px solid ${field.value === props.value ? "#79B100" : "#D5D6DF"}`,
					padding: "10px",
					textAlign: "center",
					cursor: "pointer",
				}}
				onClick={() => form.setFieldValue(field.name, props.value)}
			>
				<Image
					src={props.value === "stripe" ? Stripe : ""}
					width={100}
					height={50}
					alt={props.value[0]}
					style={{ maxWidth: "100px" }}
				/>
				<div className=" font-druk_wide text-[12px] leading-[18px]">{props.label}</div>
			</div>
		</div>
	);

	return (
		<div className="flex flex-col desktop:flex-row desktop:gap-[136px] gap-8 max-desktop:items-center px-[14px] desktop:px-[60px] max-desktop:mt-8 max-desktop:mb-10 desktop:mb-[104px]">
			{filmView.success && (
				<div className="w-full max-w-[348px] desktop:min-w-[760px] ">
					<div className="flex gap-4 border p-[24px] mb-14 ">
						<Image
							className="hidden desktop:block"
							src={filmView.success.movie.poster}
							alt="poster"
							width={200}
							height={240}
							unoptimized={true}
							loading="lazy"
							style={{ height: "fit-content" }}
						/>

						<Image
							className="desktop:hidden"
							src={filmView.success.movie.poster}
							alt="poster"
							width={93}
							height={111}
							unoptimized={true}
							loading="lazy"
							style={{ height: "fit-content" }}
						/>

						<div className="flex flex-col gap-6 flex-grow">
							<div className="uppercase font-druk_wide text-[10px] leading-[18px] desktop:text-[18px] desktop:leading-6">
								{filmView.success.movie.title}
							</div>
							<div>
								<div className="flex flex-col gap-3 pb-4 border-b border-grey_medium mb-[16px]">
									<div className="uppercase flex gap-2 font-druk_wide text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] ">
										<Image src={LocationIcon} alt="LocationIcon" />
										<span>LOCATION</span>
									</div>
									<div className=" font-gotham_pro_regular text-[14px] leading-[22px] desktop:text-[16px] desktop:leading-6">
										{sessionSelection.selectedData.location}
									</div>
								</div>
								<div className="flex gap-5 desktop:gap-24 pb-4 border-grey_medium">
									<div>
										<div className="uppercase flex gap-2 font-druk_wide text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-3">
											<Image src={CalendarIcon} alt="CalendarIcon" />
											DATE
										</div>
										<div className=" font-gotham_pro_regular text-[14px] leading-[22px] desktop:text-[16px] desktop:leading-6">
											{sessionSelection.selectedData.date}
										</div>
									</div>
									<div>
										<div className="uppercase flex gap-2 font-druk_wide text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-3">
											<Image src={SessionIcon} alt="SessionIcon"></Image>
											<span>SESSION</span>
										</div>
										<div className=" font-gotham_pro_regular text-[14px] leading-[22px] desktop:text-[16px] desktop:leading-6">
											{sessionSelection.selectedData.time}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-end">
						<PaymentForm />
					</div>
				</div>
			)}
			<div className="border h-fit desktop:min-w-[380px] w-full min-w-[349px]">
				<div className={`py-10 px-6 bg-[#F9F7DB] border-b`}>
					<div className=" flex flex-row items-center justify-between font-druk_wide text-[14px] leading-[14px] desktop:text-[18px] desktop:leading-6 mb-5 desktop:mb-[32px]">
						<span>BUY A TICKET</span>
						<span className=" flex gap-2 bg-black_main text-white p-1">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
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
					} py-10 px-6 bg-[#F9F7DB] border-b`}
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

				<div className="py-5 px-6 desktop:border-b desktop:py-6 bg-[#F9F7DB]">
					<span className="mb-2 uppercase font-druk_wide text-[12px] leading-[18px]">promocode</span>
					<div className="relative">
						<input
							type="text"
							className=" bg-white border w-full py-[12px]"
							value={promoValue}
							onChange={handlePromoValueChange}
						/>
						<button onClick={() => handleRemoveClick()} className="absolute z-10 right-4 top-[14px]">
							<Image src={RemoveButton} alt="RemoveButton" />
						</button>
					</div>
				</div>

				<div className="p-6 flex justify-between border-t border-b font-druk_wide text-[12px] leading-[18px]">
					<span>TOTAL</span>

					<div className="flex gap-2">
						{cartResponses.discount === "0.00" && cartResponses.total}$
						{cartResponses.discount !== "0.00" && cartResponses.subtotal}
						{cartResponses.discount !== "0.00" && (
							<span className="line-through font-gotham_pro_regular">{cartResponses.total}</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PaymentPage;
