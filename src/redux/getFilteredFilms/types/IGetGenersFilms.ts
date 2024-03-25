import { Movie } from "@/redux/getLocationsView/types/IGetLocationsView";

interface Filter {
	id: number;
	name: string;
}

export interface IGetFilteredFilms {
	filters: Filter[];
	loading: boolean;
	error: null | string;
	movies: Movie[];
}
