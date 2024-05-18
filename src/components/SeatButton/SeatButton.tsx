import { useDispatch, useSelector } from "@/hooks";
import { EventTicket } from "@/redux/getFilmView/types/IGetFilmView";
import { addCheckedTicket, removeCheckedTicket } from "@/redux/sessionSelection/sessionSelection";
import { useEffect, useState } from "react";
import styles from "./SeatButton.module.css";
import { addTicketToCart, deleteTicketFromCart } from "@/redux/cart/cartSlice";
import { addResponse } from "@/redux/cartResponsesSlice/cartResponsesSlice";

interface ISeatButton {
	width?: "20" | "16";
	ticketData: EventTicket;
	disabledButton?: boolean;
	isCheckedSeat?: boolean;
	status: string;
}

function SeatButton({
	width = "20",
	ticketData,
	disabledButton = false,
	isCheckedSeat = false,
	status = "active",
}: ISeatButton) {
	const [isChecked, setChecked] = useState(isCheckedSeat);
	const dispatch = useDispatch();

	const checkedTickets = useSelector((state) => state.sessionSelection.checkedTickets);

	useEffect(() => {
		setChecked(checkedTickets.some((t) => t.event_ticket_id === ticketData.event_ticket_id));
	}, [checkedTickets, ticketData.event_ticket_id]);

	const handleTicketAction = async (ticketId: number, action: string) => {
		const url = `/api/${action === "add" ? "addTicketToCart" : "deleteTicketFromCart"}`;
		console.log("Attempting to fetch:", url); // Check the URL is correct
		try {
			const response = await fetch(url, {
				method: action === "add" ? "POST" : "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ticketId }),
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

	return (
		<div className={`${styles.tooltip}`}>
			<div className="max-desktop:hidden">
				<span className={styles.tooltipText}>
					<span className="uppercase font-bold text-[10px] leading-[10px]">
						ROW #{ticketData?.row}, PLACE #{ticketData?.seat}
					</span>
					<span className="text-[12px] leading-[18px]">Price: {ticketData?.price}$</span>
				</span>
			</div>
			<button
				className={`w-[${width}px] h-[${width}px]  desktop:w-[${width}px] ${
					ticketData.status === "blocked" ? "cursor-not-allowed" : ""
				}`}
				onClick={() => {
					setChecked(!isChecked);
					if (!isChecked) {
						dispatch(addCheckedTicket({ ticket: ticketData! }));
						handleTicketAction(ticketData!.event_ticket_id, "add");
						const sessionSelectionFromStorage = JSON.parse(localStorage.getItem("sessionSelection")!);
						sessionSelectionFromStorage.checkedTickets.push(ticketData);
						console.log("We wanna add to local storage ticket: ", ticketData);
						console.log("new state of sessionSelectionFromStorage", sessionSelectionFromStorage);
						localStorage.setItem("sessionSelection", JSON.stringify(sessionSelectionFromStorage));
					} else {
						dispatch(removeCheckedTicket({ ticket: ticketData! }));
						handleTicketAction(ticketData!.event_ticket_id, "delete");
						const sessionSelectionFromStorage = JSON.parse(localStorage.getItem("sessionSelection")!);
						sessionSelectionFromStorage.checkedTickets = sessionSelectionFromStorage.checkedTickets.filter(
							(ticket: any) => ticket.event_ticket_id !== ticketData.event_ticket_id
						);
						console.log("sessionSelectionFromStorage", sessionSelectionFromStorage);
						localStorage.setItem("sessionSelection", JSON.stringify(sessionSelectionFromStorage));
					}
				}}
				disabled={
					disabledButton ||
					ticketData.status === "blocked" ||
					ticketData.status === "wait_payment" ||
					ticketData.status === "sold"
				}
			>
				<svg
					style={{ opacity: isChecked ? 1 : 0.6 }}
					width={width}
					height={width}
					viewBox={`0 0 ${width} ${width}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.9836 6.01666C16.1835 8.2166 16.1835 11.7834 13.9836 13.9833C11.7837 16.1833 8.21686 16.1833 6.01692 13.9833C3.81698 11.7834 3.81698 8.2166 6.01692 6.01666L10.0003 2.03332L13.9836 6.01666Z"
						fill={ticketData.status === "active" ? ticketData.color : "#D5D6DF"}
						stroke="#222222"
						strokeWidth="0.751106"
					/>
				</svg>
			</button>
		</div>
	);
}

export default SeatButton;
