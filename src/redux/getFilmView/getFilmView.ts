import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IGetFilmView } from "./types/IGetFilmView";
import apiClient from "../../constants/baseApi";

interface IGetFilmViewState {
	loading: boolean;
	error: null | string;
	success: null | IGetFilmView;
}

const initialState: IGetFilmViewState = {
	loading: false,
	error: null,
	success: null,
};

export const getFilmView = createAsyncThunk("getFilmViewSlice/getFilmView", async (slug: string) => {
	try {
		const response = await apiClient.get(`en/movie/${slug}?location=location-title`);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data;
		}
		throw error;
	}
});

const getFilmViewSlice = createSlice({
	name: "getFilmViewSlice",
	initialState,
	reducers: {
		updateFilmViewFromStorage: (state, action: PayloadAction<IGetFilmViewState>) => {
			state.error = action.payload.error;
			state.success = action.payload.success;
			state.loading = action.payload.loading;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getFilmView.pending, (state) => {
				state.loading = true;
			})
			.addCase(getFilmView.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.error = "";
				localStorage.setItem("filmView", JSON.stringify(state));
			})
			.addCase(getFilmView.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.success = null;
			});
	},
});

export const { updateFilmViewFromStorage } = getFilmViewSlice.actions;

export default getFilmViewSlice.reducer;
