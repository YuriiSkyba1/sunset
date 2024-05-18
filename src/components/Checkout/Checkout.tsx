import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CalendarIcon from "@/assets/checkout/calendar.svg";
import LocationIcon from "@/assets/checkout/icon-location.svg";
import SessionIcon from "@/assets/checkout/icon-time.svg";
import SeatButton from "../SeatButton/SeatButton";
import CheckoutListTicket from "../CheckoutListTicket/CheckoutListTicket";
import SnacksPopUp from "../SnacksPopUp/SnacksPopUp";
import { useDispatch, useSelector } from "@/hooks";
import { addResponse } from "@/redux/cartResponsesSlice/cartResponsesSlice";
import { updateValuesFromStorage } from "@/redux/sessionSelection/sessionSelection";
import { updateFilmViewFromStorage } from "@/redux/getFilmView/getFilmView";
import CheckoutListStoreItem from "../CheckoutListStoreItem/CheckoutListStoreItem";
import Exclude from "@/assets/checkout/Exclude.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Checkout() {
	const dispatch = useDispatch();
	const currentPath = usePathname();

	const cartResponses = useSelector((state) => state.cartResponses);

	const filmView = useSelector((state) => state.filmView);
	const sessionSelection = useSelector((state) => state.sessionSelection);
	const [isSnacksOpen, setSnacksOpen] = useState<boolean>(false);
	const [timesOpened, setTimesOpened] = useState<number>(0);

	useEffect(() => {
		if (!filmView.success) {
			const filmViewFromStorage = JSON.parse(localStorage.getItem("filmView")!);
			console.log("filmViewFromStorage", filmViewFromStorage);
			dispatch(updateFilmViewFromStorage(filmViewFromStorage));
		}
		if (Object.keys(sessionSelection.selectedData.location).length === 0) {
			const sessionSelectionFromStorage = JSON.parse(localStorage.getItem("sessionSelection")!);
			console.log("sessionSelectionFromStorage", sessionSelectionFromStorage);
			dispatch(updateValuesFromStorage({ values: sessionSelectionFromStorage }));
		}
		handleShowCart();
	}, []);

	const handleShowCart = async () => {
		const url = `/api/showCart`;
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
				console.log("Response data222 of showing cart:", data);
				dispatch(addResponse(data));
				localStorage.setItem("cartResponses", JSON.stringify(data));
			}
		} catch (error) {
			console.error("Error handling show cart:", error);
		}
	};

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
			const rowSeats: JSX.Element[] = [];
			for (let seatIndex = 1; seatIndex <= maxSeatsPerRow; seatIndex++) {
				const ticket = sessionSelection.availableTickets.find(
					(ticket) => ticket.row === rowIndex && ticket.seat === seatIndex
				);

				if (!ticket) {
					rowSeats.push(<div className="w-[20px] h-[20px]"></div>);
					continue;
				}

				if (ticket && sessionSelection.checkedTickets.includes(ticket)) {
					rowSeats.push(
						<SeatButton
							key={seatIndex}
							ticketData={ticket}
							disabledButton={!ticket}
							status={ticket.status}
							isCheckedSeat={true}
						/>
					);
				}
				if (ticket && !sessionSelection.checkedTickets.includes(ticket)) {
					rowSeats.push(
						<SeatButton
							key={seatIndex}
							ticketData={ticket}
							disabledButton={!ticket}
							status={ticket.status}
							isCheckedSeat={false}
						/>
					);
				}
			}
			rows.push(
				<div key={rowIndex} className="flex justify-around pb-4">
					{rowSeats}
				</div>
			);
		}

		return rows;
	}, [sessionSelection.availableTickets, sessionSelection.checkedTickets]);

	return (
		filmView.success && (
			<div className="flex flex-col desktop:flex-row desktop:gap-[136px] gap-8 max-desktop:items-center px-[14px] desktop:px-[60px] max-desktop:mt-8 max-desktop:mb-10 desktop:mb-[104px]">
				<div className="w-full max-w-[348px] desktop:max-w-[760px] ">
					<div className="border p-[24px]">
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
				<div className=" h-fit desktop:min-w-[380px] min-w-[349px]">
					<div
						style={{
							backgroundImage: `url(${Exclude.src})`,
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							height: "100%",
						}}
						className="py-10 px-6  border-b"
					>
						<div className="font-druk_wide text-[14px] leading-[14px] desktop:text-[18px] desktop:leading-6 mb-5 desktop:mb-[32px] ">
							BUY A TICKET
						</div>
						{Object.keys(sessionSelection.checkedTickets).length === 0 && (
							<div className="border bg-white p-[16px] font-gotham_pro_medium text-[12px] leading-[18px] desktop:text-[16px] desktop:leading-6">
								You have not selected seats to watch the movie
							</div>
						)}
						{sessionSelection.checkedTickets &&
							sessionSelection.checkedTickets.map((ticket) => (
								<CheckoutListTicket ticket={ticket}></CheckoutListTicket>
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
									<CheckoutListStoreItem storeItem={storeItem}></CheckoutListStoreItem>
								))}
						</div>
					</div>
					<div className="p-6 flex justify-between border border-b-0 border-t-0 font-druk_wide text-[12px] leading-[18px]">
						<span>TOTAL</span>
						<span>{cartResponses.total}$</span>
					</div>

					{timesOpened === 0 ? (
						<button
							className="w-full bg-primary uppercase border font-druk_wide text-[12px] leading-[18px] p-[14px]"
							disabled={Object.keys(sessionSelection.checkedTickets).length === 0}
							onClick={() => setSnacksOpen(!isSnacksOpen)}
						>
							BUY A TICKET
						</button>
					) : (
						<Link
							href={`${currentPath}/payment`}
							className="block w-full text-center bg-primary uppercase border font-druk_wide text-[12px] leading-[18px] p-[14px]"
						>
							BUY A TICKET
						</Link>
					)}
				</div>
				{isSnacksOpen && timesOpened === 0 && (
					<SnacksPopUp setTimesOpened={setTimesOpened} isOpen={isSnacksOpen} setOpen={setSnacksOpen} />
				)}
			</div>
		)
	);
}

export default Checkout;
