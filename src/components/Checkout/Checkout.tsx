import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CalendarIcon from "@/assets/checkout/calendar.svg";
import LocationIcon from "@/assets/checkout/icon-location.svg";
import SessionIcon from "@/assets/checkout/icon-time.svg";
import SeatButton from "../SeatButton/SeatButton";
import CheckoutListTicket from "../CheckoutListTicket/CheckoutListTicket";
import SnacksPopUp from "../SnacksPopUp/SnacksPopUp";
import { useDispatch, useSelector } from "@/hooks";
import { showCart } from "@/redux/cart/cartSlice";

function Checkout() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(showCart());
	}, []);

	const filmView = useSelector((state) => state.filmView);
	const sessionSelection = useSelector((state) => state.sessionSelection);

	const [isSnacksOpen, setSnacksOpen] = useState<boolean>(false);

	const findMaxRow = useMemo(() => {
		return sessionSelection.availableTickets.reduce((maxRow, ticket) => Math.max(maxRow, ticket.row), 0);
	}, [sessionSelection.availableTickets]);

	const findMaxSeat = useMemo(() => {
		return sessionSelection.availableTickets.reduce((maxSeat, ticket) => Math.max(maxSeat, ticket.seat), 0);
	}, [sessionSelection.availableTickets]);

	const seats = useMemo(() => {
		const maxRows = findMaxRow;
		const maxSeatsPerRow = findMaxSeat;
		const rows = [];

		for (let rowIndex = 1; rowIndex <= maxRows; rowIndex++) {
			const rowSeats = [];
			for (let seatIndex = 1; seatIndex <= maxSeatsPerRow; seatIndex++) {
				const ticket = sessionSelection.availableTickets.find(
					(ticket) => ticket.row === rowIndex && ticket.seat === seatIndex
				);
				if (sessionSelection.checkedTickets.hasOwnProperty(ticket?.event_ticket_id!)) {
					rowSeats.push(
						<SeatButton key={seatIndex} ticketData={ticket} disabledButton={!ticket} isCheckedSeat={true} />
					);
					continue;
				}
				rowSeats.push(<SeatButton key={seatIndex} ticketData={ticket} disabledButton={!ticket} />);
			}
			rows.push(
				<div key={rowIndex} className="flex justify-around pb-4">
					{rowSeats}
				</div>
			);
		}

		return rows;
	}, [sessionSelection.availableTickets]);

	return (
		filmView.success && (
			<div className="flex flex-col desktop:flex-row desktop:gap-[136px] gap-8 max-desktop:items-center px-[14px] desktop:px-[60px] max-desktop:mt-8 max-desktop:mb-10 desktop:mb-[104px]">
				<div className="w-full max-w-[348px] desktop:max-w-[760px] border p-[24px]">
					<div className="flex gap-4">
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
								<div className="flex gap-5 desktop:gap-24 pb-4 border-b border-grey_medium">
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
							<div className="hidden desktop:block">
								<p className="font-druk_wide uppercase text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-[8px]">
									PLACE
								</p>
								<div className="w-full border border-black_main max-w-[376px] desktop:max-w-[376px] ">
									<div className="mx-auto w-5/6 border border-black_main mt-6"></div>
									<p className="text-center mt-[10px] font-gotham_pro_regular text-[12px] leading-5">
										screen
									</p>
									<div className="mt-10 desktop:mt-20">{seats}</div>
								</div>
								{sessionSelection.availableTickets.length > 0 && (
									<div className="border border-grey_medium mt-2 flex flex-wrap justify-evenly gap-3 px-[22px] py-3 max-w-[376px]">
										{sessionSelection.uniquePriceColorPairs.length > 1 &&
											sessionSelection.uniquePriceColorPairs.map((pair) => (
												<div key={pair.price} className="flex items-center gap-2">
													<div
														className={`w-3 h-3 `}
														style={{ backgroundColor: pair.color }}
													></div>
													<div className="flex gap-1">
														<p className="font-gotham_pro_regular text-[12px] leading-5">
															Price:
														</p>
														<p className="text-[12px] leading-5 font-gotham_pro_bold">
															{pair.price}$
														</p>
													</div>
												</div>
											))}
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="mt-6 desktop:hidden block">
						<div>
							<p className="font-druk_wide uppercase text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-[8px]">
								PLACE
							</p>
							<div className="w-full border border-black_main max-w-[376px] desktop:max-w-[376px] ">
								<div className="mx-auto w-5/6 border border-black_main mt-6"></div>
								<p className="text-center mt-[10px] font-gotham_pro_regular text-[12px] leading-5">
									screen
								</p>
								<div className="mt-10 desktop:mt-20">{seats}</div>
							</div>
							{sessionSelection.availableTickets.length > 0 && (
								<div className="border border-grey_medium mt-2 flex flex-wrap justify-evenly gap-3 px-[22px] py-3 max-w-[376px]">
									{sessionSelection.uniquePriceColorPairs.length > 1 &&
										sessionSelection.uniquePriceColorPairs.map((pair) => (
											<div key={pair.price} className="flex items-center gap-2">
												<div
													className={`w-3 h-3 `}
													style={{ backgroundColor: pair.color }}
												></div>
												<div className="flex gap-1">
													<p className="font-gotham_pro_regular text-[12px] leading-5">
														Price:
													</p>
													<p className="text-[12px] leading-5 font-gotham_pro_bold">
														{pair.price}$
													</p>
												</div>
											</div>
										))}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="border h-fit desktop:min-w-[380px] min-w-[349px]">
					<div className="pt-10 px-6 min-h-[347px] desktop:min-h-[552px] bg-[#F9F7DB]">
						<div className="font-druk_wide text-[14px] leading-[14px] desktop:text-[18px] desktop:leading-6 mb-5 desktop:mb-[32px]">
							BUY A TICKET
						</div>
						{Object.keys(sessionSelection.checkedTickets).length === 0 && (
							<div className="border bg-white p-[16px] font-gotham_pro_medium text-[12px] leading-[18px] desktop:text-[16px] desktop:leading-6">
								You have not selected seats to watch the movie
							</div>
						)}
						{Object.entries(sessionSelection.checkedTickets).map(([key, value]) => (
							<CheckoutListTicket
								row={value.row}
								seat={value.seat}
								price={value.price}
							></CheckoutListTicket>
						))}
					</div>
					<div className="p-6 flex justify-between border-t border-b font-druk_wide text-[12px] leading-[18px]">
						<span>TOTAL</span>
						<span>0$</span>
					</div>
					<button
						className="w-full bg-primary uppercase font-druk_wide text-[12px] leading-[18px] p-[14px]"
						disabled={Object.keys(sessionSelection.checkedTickets).length === 0}
						onClick={() => setSnacksOpen(!isSnacksOpen)}
					>
						BUY A TICKET
					</button>
				</div>
				{isSnacksOpen && <SnacksPopUp isOpen={isSnacksOpen} setOpen={setSnacksOpen} />}
			</div>
		)
	);
}

export default Checkout;
