import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../constants/baseApi";

function formatDate(date: Date) {
	// Retrieve the components of the date
	let year = date.getFullYear();
	let month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11
	let day = date.getDate().toString().padStart(2, "0");

	// Combine the components into the desired format
	return `${year}-${month}-${day}`;
}

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
			if (filters.session_from) {
				console.log("filters.session_from.length > 0");
				const formatedSessionFrom = formatDate(filters.session_from);
				let queryForSessionFrom =
					filters.title.length > 0 || filters.genre.length > 0
						? `&session_from=${formatedSessionFrom}&session_to=${formatedSessionFrom}`
						: `session_from=${formatedSessionFrom}&session_to=${formatedSessionFrom}`;
				console.log("queryForSessionFrom", queryForSessionFrom);
				queryString = queryString.concat(queryForSessionFrom);
			}
			console.log("queryString", queryString);
			const response = await apiClient.get(`en/movie/?${queryString}`);
			return response.data.movies;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);
