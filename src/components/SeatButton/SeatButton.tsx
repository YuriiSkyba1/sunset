import { useDispatch } from "@/hooks";
import { EventTicket } from "@/redux/getFilmView/types/IGetFilmView";
import { addCheckedTicket, removeCheckedTicket } from "@/redux/sessionSelection/sessionSelection";
import { useState } from "react";
import styles from "./SeatButton.module.css";
import { addTicketToCart, deleteTicketFromCart } from "@/redux/cart/cartSlice";

interface ISeatButton {
	width?: "20" | "16";
	ticketData: EventTicket | undefined;
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
	return (
		<div className={`${styles.tooltip} `}>
			<div className=" max-desktop:hidden">
				<span className={styles.tooltipText}>
					<span className="uppercase font-bold text-[10px] leading-[10px]">
						ROW #{ticketData?.row}, PLACE #{ticketData?.seat}
					</span>
					<span className="text-[12px] leading-[18px]">Price: {ticketData?.price}$</span>
				</span>
			</div>
			<button
				className={`w-[16px] desktop:w-[20px]`}
				onClick={() => {
					if (isChecked === false) {
						setChecked(!isChecked);
						dispatch(addCheckedTicket({ key: ticketData!.event_ticket_id, value: ticketData! }));
						dispatch(addTicketToCart(ticketData?.event_ticket_id!));
					} else {
						setChecked(!isChecked);
						dispatch(removeCheckedTicket({ key: ticketData!.event_ticket_id, value: ticketData! }));
						dispatch(deleteTicketFromCart(ticketData?.event_ticket_id!));
					}
				}}
				disabled={disabledButton}
			>
				<svg
					style={{ opacity: isChecked ? 1 : 0.6 }}
					width={`${width}`}
					height={`${width}`}
					viewBox={`0 0 ${width} ${width}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.9836 6.01666C16.1835 8.2166 16.1835 11.7834 13.9836 13.9833C11.7837 16.1833 8.21686 16.1833 6.01692 13.9833C3.81698 11.7834 3.81698 8.2166 6.01692 6.01666L10.0003 2.03332L13.9836 6.01666Z"
						fill={ticketData?.color}
						stroke="#222222"
						stroke-width="0.751106"
					/>
				</svg>
			</button>
		</div>
	);
}

export default SeatButton;
