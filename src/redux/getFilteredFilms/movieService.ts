import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../constants/baseApi";

export const fetchFilteredMovies = createAsyncThunk(
	"movies/fetchFiltered",
	async (filters: any, { rejectWithValue }) => {
		try {
			const queryString = Object.entries(filters).map(([key, value]) => {
				if (Array.isArray(value)) {
					return filters[key].map((value: any) => `${key}=${value}`).join("&");
				}
			});

			const response = await apiClient.get(`en/movie/?${queryString}`);
			console.log()
			return response.data.movies;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);
