import { Movie } from "@/redux/getLocationsView/types/IGetLocationsView";

interface Filter {
	id: number;
	name: string;
}

export interface IGetFilteredFilms {
	filters: {
		genres: { id: number; name: string }[];
		title: string | null;
		session_from: string | null;
	};
	loading: boolean;
	error: null | string;
	movies: Movie[];
}
