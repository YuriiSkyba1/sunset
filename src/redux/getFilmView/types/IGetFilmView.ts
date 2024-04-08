import { Movie } from "@/redux/getLocationsView/types/IGetLocationsView";
import { Filter } from "@/redux/getLocationsView/types/IGetLocationsView";

export interface Location {
	title: string;
	subtitle: string;
	slug: string;
	photo: string;
	video: string;
	movies_title: string;
	movies: null | Movie[];
	about_title: string;
	about_photo: string;
	about_cards: Array<any>;
	contact_title: string;
	address: string;
	email: string;
	phone: string;
	lat: string;
	lng: string;
}

export interface EventTicket {
	event_ticket_id: number;
	row: number;
	seat: number;
	price: string;
	color: string;
	status: string;
}

export interface Event {
	title: string;
	description: string;
	cinema_hall: string;
	start_date: string;
	end_date: string;
	type: string;
	status: string;
	event_tickets: EventTicket[];
}

export interface IGetFilmView {
	movie: Movie;
	see_also: {
		baseUrl: string;
		perPage: number;
		total: number;
		currentPage: number;
		lastPage: number;
		filters: Filter[];
		movies: Movie[];
	};
	locations: Location[];
	events: Event[];
}
