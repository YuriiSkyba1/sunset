import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatDateAndTime } from "./helpers/helperFunctions";
import { EventTicket } from "../getFilmView/types/IGetFilmView";
import { Location } from "../getFilmView/types/IGetFilmView";
import { Event } from "../getFilmView/types/IGetFilmView";

interface SessionSelectionInterface {
	selectedData: { location: string; date: string; time: string };
	availableDates: string[];
	availableHours: string[];
	availableTickets: EventTicket[];
	uniquePriceColorPairs: { price: string; color: string }[];
	checkedTickets: EventTicket[];
}

interface Ticket {
	price: string;
	color: string;
}

const initialState: SessionSelectionInterface = {
	selectedData: {
		location: "",
		date: "",
		time: "",
	},
	availableDates: [],
	availableHours: [],
	availableTickets: [],
	uniquePriceColorPairs: [],
	checkedTickets: [],
};

export const sessionSelectionSlice = createSlice({
	name: "sessionSelection",
	initialState,
	reducers: {
		setFirstValues: (state, action: PayloadAction<{ locations: Location[]; events: Event[] }>) => {
			if (action.payload.locations?.length === 1) {
				state.selectedData.location = `${action.payload.locations[0].title}`;
			}
			const uniqueDates = Array.from(
				new Set(action.payload.events!.map((event) => new Date(event.start_date).toLocaleDateString()))
			);
			state.availableDates = uniqueDates;
			state.selectedData.date = state.availableDates[0];
			const filteredEvents = action.payload.events!.filter(
				(event) => new Date(event.start_date).toLocaleDateString() === state.availableDates[0]
			);
			// Отримуємо години подій для обраної дати
			const hours = filteredEvents.map((event) =>
				new Date(event.start_date).toLocaleTimeString("en-US", {
					hour12: false,
					hour: "2-digit",
					minute: "2-digit",
				})
			);
			state.availableHours = hours;
			state.selectedData.time = state.availableHours[0];
		},
		setAvailableDates: (state, action: PayloadAction<{ locations: Location[]; events: Event[] }>) => {
			if (action.payload.locations?.length === 1) {
				state.selectedData.location = `${action.payload.locations[0].title}`;
			}

			const uniqueDates = Array.from(
				new Set(action.payload.events!.map((event) => new Date(event.start_date).toLocaleDateString()))
			);

			state.availableDates = uniqueDates;
		},

		setAvailableTickets: (state, action: PayloadAction<{ events: Event[] }>) => {
			if (state.selectedData.location && state.selectedData.date && state.selectedData.time) {
				const formattedDateTime = formatDateAndTime(state.selectedData.date, state.selectedData.time);

				const selectedEvent = action.payload.events.find((event) => event.start_date === formattedDateTime);

				const eventTickets = selectedEvent?.event_tickets;

				state.availableTickets = eventTickets!;
			}
		},

		setUniquePriceColorPairs: (state) => {
			const extractUniquePairs = (tickets: { price: string; color: string }[]): Ticket[] => {
				const uniquePairs: { [key: string]: string } = {};

				tickets.forEach((ticket) => {
					uniquePairs[ticket.price] = ticket.color;
				});

				return Object.keys(uniquePairs).map((price) => ({ price, color: uniquePairs[price] }));
			};
			const updatedUniqueTicketPairs = extractUniquePairs(state.availableTickets);
			state.uniquePriceColorPairs = updatedUniqueTicketPairs;
		},

		handleDateChange: (state, action: PayloadAction<{ date: string; events?: Event[] }>) => {
			if (action.payload.date === state.selectedData.date) {
				return;
			}
			state.selectedData.time = "";
			state.availableTickets = [];
			state.selectedData.date = action.payload.date;
			const filteredEvents = action.payload.events!.filter(
				(event) => new Date(event.start_date).toLocaleDateString() === action.payload.date
			);
			// Отримуємо години подій для обраної дати
			const hours = filteredEvents.map((event) =>
				new Date(event.start_date).toLocaleTimeString("en-US", {
					hour12: false,
					hour: "2-digit",
					minute: "2-digit",
				})
			);
			state.availableHours = hours;
			state.selectedData.time = state.availableHours[0];
			state.checkedTickets = [];
		},

		handleHourChange: (state, action: PayloadAction<string>) => {
			state.selectedData.time = action.payload;
		},

		addCheckedTicket: (state, action: PayloadAction<{ ticket: EventTicket }>) => {
			state.checkedTickets.push(action.payload.ticket);
		},

		removeCheckedTicket: (state, action: PayloadAction<{ ticket: EventTicket }>) => {
			state.checkedTickets = state.checkedTickets.filter(
				(tick) => tick.event_ticket_id !== action.payload.ticket.event_ticket_id
			);
		},

		removeAllCheckedTickets: (state) => {
			state.checkedTickets = [];
		},
	},
});

export default sessionSelectionSlice.reducer;
export const {
	setAvailableDates,
	setAvailableTickets,
	setUniquePriceColorPairs,
	handleDateChange,
	handleHourChange,
	addCheckedTicket,
	removeCheckedTicket,
	setFirstValues,
	removeAllCheckedTickets,
} = sessionSelectionSlice.actions;
