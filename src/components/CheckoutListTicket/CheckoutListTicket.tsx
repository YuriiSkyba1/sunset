import React from "react";
import { EventTicket } from "@/redux/getFilmView/types/IGetFilmView";
import Image from "next/image";
import RemoveButton from "@/assets/checkout/remove-button.svg";
import { useDispatch } from "@/hooks";
import { removeCheckedTicket } from "@/redux/sessionSelection/sessionSelection";
import { addResponse } from "@/redux/cartResponsesSlice/cartResponsesSlice";

interface CheckoutListTicketInterface {
	ticket: EventTicket;
	withButton?: boolean;
}

function CheckoutListTicket({ ticket, withButton = true }: CheckoutListTicketInterface) {
	const dispatch = useDispatch();
	const { event_ticket_id } = ticket;

	const handleDeleteAction = async (ticketId: number) => {
		const url = `/api/deleteTicketFromCart`;
		console.log("Attempting to fetch:", url); // Check the URL is correct
		try {
			const response = await fetch(url, {
				method: "DELETE",
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
		<div>
			<div className="border bg-white py-[12px] desktop:px-[16px] px-[12px] flex justify-between font-gotham_pro_regular text-[14px] leading-[14px] desktop:text-[16px] desktop:leading-6">
				<div className="flex gap-4">
					<div>
						<span className="text-grey_dark mr-2">Row:</span>
						<span>#{ticket.row}</span>
					</div>
					<div>
						<span className="text-grey_dark mr-2">Seat:</span>
						<span>#{ticket.seat}</span>
					</div>
				</div>
				{withButton && (
					<div>
						<button
							onClick={() => {
								dispatch(removeCheckedTicket({ ticket }));
								handleDeleteAction(event_ticket_id);
							}}
						>
							<Image src={RemoveButton} alt="RemoveButton" />
						</button>
					</div>
				)}
			</div>
			<div className="font-druk_wide text-[12px] leadin-[18px] flex justify-between pb-1 desktop:pb-2 mt-2 border-b border-grey_dark">
				<span>PRICE:</span>
				<span>{ticket.price}$</span>
			</div>
			<div className="mb-2 text-[12px] leading-[18px]">
				<span className=" font-gotham_pro_regular"></span>
				<span className=" font-gotham_pro_bold"></span>
			</div>
		</div>
	);
}

export default CheckoutListTicket;
