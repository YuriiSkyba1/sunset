import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../../constants/baseApi";
import { IGetLocationsList } from "./types/IGetLocationsList";

interface getLocationsListState {
	loading: boolean;
	error: null | string;
	success: null | IGetLocationsList[];
}

const initialState: getLocationsListState = {
	loading: false,
	error: null,
	success: null,
};

export const getLocationsList = createAsyncThunk("getLocationsList/getList", async (location: string) => {
	try {
		const response = await apiClient.get(`en/location?country=${location}`);
		console.log("response.data", response.data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data;
		}
		throw error;
	}
});

const getLocationsListSlice = createSlice({
	name: "getLocationsView",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getLocationsList.pending, (state) => {
				state.loading = true;
			})
			.addCase(getLocationsList.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.error = null;
			})
			.addCase(getLocationsList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.success = null;
			});
	},
});

export default getLocationsListSlice.reducer;
