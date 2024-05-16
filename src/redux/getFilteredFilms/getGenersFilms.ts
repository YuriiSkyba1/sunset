import { createSelector, createSlice } from "@reduxjs/toolkit";
import { IGetFilteredFilms as IGetGenersFilms } from "./types/IGetGenersFilms";
import { act } from "react-dom/test-utils";
import { fetchFilteredMovies } from "./movieService";
import { string } from "yup";

const initialState: IGetGenersFilms = {
	filters: {
		genres: [],
		title: null,
		session_from: null,
	},
	loading: false,
	error: null,
	movies: [],
};

export const getGenresState = (state: any) => state.genres.filters;

export const getFilters = createSelector([getGenresState], (choosenfilters) => {
	let filters = { genre: [], title: [], session_from: null };

	console.log("choosenfilters", choosenfilters);

	if (choosenfilters.genres.length > 0) {
		filters.genre = choosenfilters.genres.map((genre: any) => genre.id);
	}
	if (choosenfilters.title) {
		filters.title = choosenfilters.title;
	}

	if (choosenfilters.session_from) {
		filters.session_from = choosenfilters.session_from;
	}

	console.log("filters", filters);
	return filters;
});

const getGenersFilmsSlice = createSlice({
	name: "getGenersFilms",
	initialState,
	reducers: {
		addGenre: (state, action) => {
			const isFilterExists = state.filters.genres.some((filter) => filter.name === action.payload.name);
			if (!isFilterExists) {
				state.filters.genres.push(action.payload);
			}
		},
		removeGenre: (state, action) => {
			const index = state.filters.genres.findIndex((filter) => filter.name === action.payload.name);
			state.filters.genres.splice(index, 1);
		},
		resetGenres: (state) => {
			state.filters = initialState.filters;
		},
		addTitle: (state, action) => {
			if (action.payload === null) {
				state.filters.title = null;
			} else state.filters.title = action.payload;
		},
		removeTitle: (state, action) => {
			state.filters.title = null;
		},
		addSessionFrom: (state, action) => {
			state.filters.session_from = action.payload;
		},
		removeSessionFrom: (state) => {
			state.filters.session_from = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilteredMovies.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchFilteredMovies.fulfilled, (state, action) => {
				state.loading = false;
				state.movies = action.payload; // Assume your state structure accommodates this
				state.error = null;
			})
			.addCase(fetchFilteredMovies.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default getGenersFilmsSlice.reducer;
export const { addGenre, removeGenre, resetGenres, addTitle, removeTitle, addSessionFrom, removeSessionFrom } =
	getGenersFilmsSlice.actions;
