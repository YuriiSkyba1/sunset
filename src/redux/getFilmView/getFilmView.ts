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

export const getFilmView = createAsyncThunk<IGetFilmView, string, { rejectValue: string }>(
	"getFilmViewSlice/getFilmView",
	async (slug: string, { rejectWithValue }) => {
		try {
			const response = await apiClient.get(`en/movie/${slug}?location=location-title`);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return rejectWithValue(error.response.data);
			}
			return rejectWithValue('An unexpected error occurred');
		}
	}
);

const getFilmViewSlice = createSlice({
	name: "getFilmViewSlice",
	initialState,
	reducers: {
		updateFilmViewFromStorage: (state, action: PayloadAction<IGetFilmViewState>) => {
			if (action.payload) {
				state.error = action.payload.error;
				state.success = action.payload.success;
				state.loading = action.payload.loading;
			} else {
				state.error = 'Payload is null or undefined';
				state.success = null;
				state.loading = false;
			}
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
				state.error = null;
				localStorage.setItem("filmView", JSON.stringify(state));
			})
			.addCase(getFilmView.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'An error occurred';
				state.success = null;
			});
	},
});

export const { updateFilmViewFromStorage } = getFilmViewSlice.actions;

export default getFilmViewSlice.reducer;
