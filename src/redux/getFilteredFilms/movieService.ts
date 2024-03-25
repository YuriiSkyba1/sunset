import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFilteredMovies = createAsyncThunk(
	"movies/fetchFiltered",
	async (filters: any, { rejectWithValue }) => {
		try {
			const queryString = Object.entries(filters).map(([key, value]) => {
				if (Array.isArray(value)) {
					return filters[key].map((value: any) => `${key}=${value}`).join("&");
				}
			});

			const response = await fetch(`https://sunset.loc/api/en/movie/?${queryString}`);
			if (!response.ok) throw new Error("Network response was not ok");
			const data = await response.json();
			return data.movies;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);
