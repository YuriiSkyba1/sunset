import { createSelector, createSlice } from "@reduxjs/toolkit";
import { IGetFilteredFilms as IGetGenersFilms } from "./types/IGetGenersFilms";
import { act } from "react-dom/test-utils";
import { fetchFilteredMovies } from "./movieService";

const initialState: IGetGenersFilms = {
	filters: [],
	loading: false,
	error: null,
	movies: [],
};

export const getGenresState = (state: any) => state.genres;

export const getFilters = createSelector([getGenresState], (genres) => {
	let filters = { genre: [] };

	if (genres.filters.length > 0) {
		filters.genre = genres.filters.map((genre: any) => genre.id);
	}

	return filters;
});

const getGenersFilmsSlice = createSlice({
	name: "getGenersFilms",
	initialState,
	reducers: {
		addGenre: (state, action) => {
			const isFilterExists = state.filters.some((filter) => filter.name === action.payload.name);
			if (!isFilterExists) {
				state.filters.push(action.payload);
			}
		},
		removeGenre: (state, action) => {
			const index = state.filters.findIndex((filter) => filter.name === action.payload.name);
			state.filters.splice(index, 1);
		},
		resetGenres: (state) => {
			state.filters = initialState.filters;
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
export const { addGenre, removeGenre, resetGenres } = getGenersFilmsSlice.actions;
