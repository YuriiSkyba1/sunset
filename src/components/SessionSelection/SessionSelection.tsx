import { useDispatch, useSelector } from "@/hooks";
import React, { useState, useEffect, useMemo } from "react";
import SelectLocation from "../SelectLocation/SelectLocation";
import DateSessionCard from "../DateSessionCard/DateSessionCard";
import { EventTicket } from "@/redux/getFilmView/types/IGetFilmView";
import SeatButton from "../SeatButton/SeatButton";
import AskRegisterModal from "../AskRegisterModal/AskRegisterModal";
import {
	setAvailableDates,
	setAvailableTickets,
	setUniquePriceColorPairs,
	handleDateChange,
	handleHourChange,
} from "@/redux/sessionSelection/sessionSelection";

const SessionSelection: React.FC = () => {
	const dispatch = useDispatch();
	const locations = useSelector((state) => state.filmView.success?.locations);
	const events = useSelector((state) => state.filmView.success?.events);
	const selectedDataStore = useSelector((state) => state.sessionSelection.selectedData);
	const availableDates = useSelector((state) => state.sessionSelection.availableDates);
	const availableHours = useSelector((state) => state.sessionSelection.availableHours);
	const availableTickets = useSelector((state) => state.sessionSelection.availableTickets);
	const uniquePriceColorPairs = useSelector((state) => state.sessionSelection.uniquePriceColorPairs);
	const checkedTickets = useSelector((state) => state.sessionSelection.checkedTickets);

	const [isRegisterOpen, setRegisterOpen] = useState(false);

	useEffect(() => {
		dispatch(setAvailableDates({ locations: locations!, events: events! }));
	}, []);

	useEffect(() => {
		dispatch(setAvailableTickets({ events: events! }));
		dispatch(setUniquePriceColorPairs());
	}, [selectedDataStore.time]);

	const findMaxRow = useMemo(() => {
		return availableTickets.reduce((maxRow, ticket) => Math.max(maxRow, ticket.row), 0);
	}, [availableTickets]);

	const findMaxSeat = useMemo(() => {
		return availableTickets.reduce((maxSeat, ticket) => Math.max(maxSeat, ticket.seat), 0);
	}, [availableTickets]);

	const seats = useMemo(() => {
		const maxRows = findMaxRow;
		const maxSeatsPerRow = findMaxSeat;
		const rows = [];

		for (let rowIndex = 1; rowIndex <= maxRows; rowIndex++) {
			const rowSeats = [];
			for (let seatIndex = 1; seatIndex <= maxSeatsPerRow; seatIndex++) {
				const ticket = availableTickets.find((ticket) => ticket.row === rowIndex && ticket.seat === seatIndex);
				rowSeats.push(<SeatButton key={seatIndex} ticketData={ticket} disabledButton={!ticket} />);
			}
			rows.push(
				<div key={rowIndex} className="flex justify-around pb-4">
					{rowSeats}
				</div>
			);
		}

		return rows;
	}, [availableTickets]);

	const checkedTicketsAdaptive = (): JSX.Element | null => {
		const tickets: EventTicket[] = [];
		for (const key in checkedTickets) {
			const value = checkedTickets[key];
			tickets.push(value);
		}
		return tickets.length > 0 ? (
			<div className="mt-2 desktop:hidden flex flex-col gap-2 bg-addition border p-2">
				{tickets.map((ticket) => (
					<div key={ticket.event_ticket_id} className="flex flex-col gap-1">
						<div className="uppercase font-bold text-[10px] leading-[10px]">
							ROW #{ticket.row}, PLACE #{ticket.seat}
						</div>
						<div className="text-[12px] leading-[18px]">Price: {ticket.price}$</div>
					</div>
				))}
			</div>
		) : null;
	};

	const showCheckedTickets = (): JSX.Element | null => {
		const tickets: EventTicket[] = [];
		for (const key in checkedTickets) {
			const value = checkedTickets[key];
			tickets.push(value);
		}

		return tickets.length > 0 ? (
			<div className="pb-[20px] border-b border-grey_medium">
				<div className="flex flex-wrap gap-2">
					{tickets.map((ticket) => (
						<div key={ticket.event_ticket_id} className="flex flex-col gap-2">
							<div className="uppercase font-bold text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px]">
								PLACE:
							</div>
							<div className="bg-addition py-[2px] px-[10px] text-[12px] leading-[18px]">
								#{ticket.seat}$
							</div>
						</div>
					))}
				</div>
			</div>
		) : null;
	};

	return (
		<div>
			<div className="p-6 border border-black_main w-full max-w-[348px] desktop:max-w-[424px] m-0">
				<h3 className="uppercase font-bold text-[14px] leading-[14px] mb-5 desktop:mb-6 desktop:text-[18px] desktop:leading-[24px]">
					session selection
				</h3>
				<div className="flex flex-col gap-4">
					<div className="pb-[20px] border-b border-grey_medium">
						<p className="font-bold uppercase text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-[8px]">
							LOCATION
						</p>
						<SelectLocation options={locations!}></SelectLocation>
					</div>
					<div className="pb-[20px] border-b border-grey_medium">
						<p className="font-bold uppercase text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-[8px]">
							DATE
						</p>
						<div className="flex gap-1 flex-wrap">
							{availableDates.map((date, index) => (
								<DateSessionCard
									key={index}
									title={date}
									isActive={selectedDataStore.date === date}
									onClick={() => {
										dispatch(handleDateChange({ date, events }));
									}}
								/>
							))}
						</div>
					</div>
					<div className="pb-[20px] border-b border-grey_medium">
						<p className="font-bold uppercase text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-[8px]">
							SESSION
						</p>
						<div className="flex gap-1 flex-wrap">
							{availableHours.map((time, index) => (
								<DateSessionCard
									key={index}
									title={time}
									isActive={selectedDataStore.time === time}
									onClick={() => dispatch(handleHourChange(time))}
								/>
							))}
						</div>
					</div>

					{showCheckedTickets()}
					<div className=" desktop:pb-[20px]">
						<p className="font-bold uppercase text-[10px] leading-[10px] desktop:text-[12px] desktop:leading-[18px] mb-[8px]">
							PLACE
						</p>
						<div className="w-full border border-black_main max-w-[376px] desktop:max-w-[376px] ">
							<div className="mx-auto w-5/6 border border-black_main mt-6"></div>
							<p className="text-center mt-[10px]">screen</p>
							<div className="mt-10 desktop:mt-20">{seats}</div>
						</div>
						{checkedTicketsAdaptive()}
						{availableTickets.length > 0 && (
							<div className="border border-grey_medium mt-2 flex flex-wrap justify-evenly gap-3 px-[22px] py-3">
								{uniquePriceColorPairs.length > 1 &&
									uniquePriceColorPairs.map((pair) => (
										<div key={pair.price} className="flex items-center gap-2">
											<div className={`w-3 h-3 `} style={{ backgroundColor: pair.color }}></div>
											<div className="flex">
												<p className="text-[12px] leading-5">Price:</p>
												<p className="text-[12px] leading-5 font-bold">{pair.price}$</p>
											</div>
										</div>
									))}
							</div>
						)}
					</div>
				</div>
			</div>
			<button
				className="uppercase font-bold text-[12px] leading-[18px] w-full max-w-[348px] desktop:max-w-[424px] bg-primary py-[14px] border border-t-0"
				disabled={!selectedDataStore.date || !selectedDataStore.location || !selectedDataStore.time}
				onClick={() => setRegisterOpen(!isRegisterOpen)}
			>
				buy a ticket
			</button>
			<AskRegisterModal isActive={isRegisterOpen} setIsActive={setRegisterOpen}></AskRegisterModal>
		</div>
	);
};

export default SessionSelection;