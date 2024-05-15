import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../constants/baseApi";

export const fetchFilteredMovies = createAsyncThunk(
	"movies/fetchFiltered",
	async (filters: any, { rejectWithValue }) => {
		try {
			console.log("filters from request", filters);
			// const queryString = Object.entries(filters).map(([key, value]) => {
			// 	if (Array.isArray(value)) {
			// 		return filters[key].map((value: any) => `${key}=${value}`).join("&");
			// 	}
			// });

			let queryString = "";
			if (filters.title.length > 0) {
				console.log("title.length > 0");
				// queryString = filters.title.map((value: string) => `title=${value}`).join("&");
				queryString = `title=${filters.title}`;
			}
			if (filters.genre.length > 0) {
				let queryForGenres = Object.entries(filters.genre)
					.map(([key, value]) => {
						if (filters.title.length > 0) {
							return `&genre=${value}`;
						} else {
							return `genre=${value}`;
						}
					})
					.join("&");
				console.log("queryForGenres", queryForGenres);
				queryString = queryString.concat(queryForGenres);
			}
			console.log("queryString", queryString);
			const response = await apiClient.get(`en/movie/?${queryString}`);
			return response.data.movies;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);
