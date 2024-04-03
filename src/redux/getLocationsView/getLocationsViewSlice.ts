import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IGetLocationsView } from "./types/IGetLocationsView";
import apiClient from "../../constants/baseApi";

interface getLocationsViewState {
	loading: boolean;
	error: null | string;
	success: null | IGetLocationsView;
}

const initialState: getLocationsViewState = {
	loading: false,
	error: null,
	success: null,
};

export const getView = createAsyncThunk("getLocationsView/getView", async () => {
	try {
		const response = await apiClient.get('en/location/location-title');
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data;
		}
		throw error;
	}
});

const getLocationsViewSlice = createSlice({
	name: "getLocationsView",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getView.pending, (state) => {
				state.loading = true;
			})
			.addCase(getView.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.error = "";
			})
			.addCase(getView.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.success = null;
			});
	},
});

export default getLocationsViewSlice.reducer;
