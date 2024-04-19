import apiClient from "@/constants/baseApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGetStoreItem } from "./types/IGetStoreItem";
import axios from "axios";

interface getStoreItemsState {
	loading: boolean;
	error: null | string;
	success: null | IGetStoreItem[];
}

const initialState: getStoreItemsState = {
	loading: false,
	error: null,
	success: null,
};

export const getItems = createAsyncThunk("getStoreItems/getItems", async (locationSlug: string) => {
	try {
		const response = await apiClient.get(`en/location/${locationSlug}/store`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data;
		}
		throw error;
	}
});

const getStoreItemsSlice = createSlice({
	name: "getStoreItems",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getItems.pending, (state) => {
				state.loading = true;
			})
			.addCase(getItems.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.error = null;
			})
			.addCase(getItems.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.success = null;
			});
	},
});

export default getStoreItemsSlice.reducer;
