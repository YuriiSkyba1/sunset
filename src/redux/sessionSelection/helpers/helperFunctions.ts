import { EventTicket } from "@/redux/getFilmView/types/IGetFilmView";

export const formatDateAndTime = (date: string, time: string) => {
	// Розділити дату на складники та перетворити її у формат "YYYY-MM-DD"
	const [day, month, year] = date.split(".");
	const formattedDate = `${year}-${month}-${day}`;

	// Повернути перетворену дату та час у форматі "YYYY-MM-DD HH:MM"
	return `${formattedDate} ${time}`;
};

export const findMaxRow = (availableTickets: EventTicket[]): number => {
	let maxRow = 0;

	for (const ticket of availableTickets) {
		if (ticket.row > maxRow) {
			maxRow = ticket.row;
		}
	}

	return maxRow;
};

export const findMaxSeat = (availableTickets: EventTicket[]): number => {
	let maxSeat = 0;

	for (const ticket of availableTickets) {
		if (ticket.seat > maxSeat) {
			maxSeat = ticket.seat;
		}
	}

	return maxSeat;
};
