import { Filter, IAboutCard, IFAQItem, Movie } from "@/redux/getLocationsView/types/IGetLocationsView";

export interface IGetLocationsList {
	title: string;
	subtitle: string;
	slug: string;
	photo: string;
	video: string;
	movies_title: string;
	movies: {
		baseUrl: string;
		perPage: number;
		total: number;
		currentPage: number;
		lastPage: number;
		filters: Filter[];
		movies: Movie[];
	} | null;
	about_title: string;
	about_photo: string;
	about_cards: IAboutCard[];
	faq_title: string;
	faq_items: IFAQItem[];
	contact_title: string;
	address: string;
	email: string;
	phone: string;
	lat: string;
	lng: string;
}
