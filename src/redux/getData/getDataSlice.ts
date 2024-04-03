import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IGetState } from "./types/IGetState";
import apiClient from "../../constants/baseApi";

interface getDataState {
	loading: boolean;
	error: null | string;
	success: null | IGetState;
}

const initialState: getDataState = {
	loading: false,
	error: null,
	success: null,
};

export const getAllData = createAsyncThunk("getData/getAllData", async () => {
	try {
		const response = await apiClient.get('en');
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data;
		}
		throw error;
	}
});

const getDataSlice = createSlice({
	name: "getData",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllData.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllData.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.error = "";
			})
			.addCase(getAllData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.success = null;
			});
	},
});

export default getDataSlice.reducer;
