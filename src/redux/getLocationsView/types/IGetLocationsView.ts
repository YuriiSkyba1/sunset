interface Genre {
	id: number;
	name: string;
}

export interface IAboutCard {
	title: string;
	description: string;
	icon: string;
}

export interface IFAQItem {
	question: string;
	answer: string;
}

interface Movie {
	slug: string;
	poster: string;
	title: string;
	age_rating: string;
	release_year: number;
	genres: Genre[];
	director: string;
	movie_language: {
		name: string;
		iso_code: string;
		is_default: boolean;
		is_current: boolean;
	};
	subtitle_language: {
		name: string;
		iso_code: string;
		is_default: boolean;
		is_current: boolean;
	};
	duration: string;
	price_form: number;
	description: string;
}

interface Filter {
	name: string;
	type: string;
	label: string;
	placeholder: string;
	values?: {
		id: number;
		name: string;
	};
	value: string;
	required: boolean;
}

export interface IGetLocationsView {
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
	};
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
