import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IGetState } from "./types/IGetState";
import apiClient from "../../constants/baseApi";
import Cookies from "js-cookie";

interface getDataState {
	loading: boolean;
	error: null | string;
	success: null | IGetState;
	language: string;
}

const initialState: getDataState = {
	loading: false,
	error: null,
	success: null,
	language: Cookies.get("language") || "", // Initialize from cookie if available
};

export const getAllData = createAsyncThunk("getData/getAllData", async () => {
	try {
		const response = await apiClient.get("en");
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
	reducers: {
		addLanguage: (state, action) => {
			if (!state.success?.languages.some(lang => lang.iso_code === action.payload.iso_code)) {
				state.success?.languages.push(action.payload);
			}
		},
		addCountry: (state, action) => {
			if (!state.success?.countries.some(country => country.iso_code === action.payload.iso_code)) {
				state.success?.countries.push(action.payload);
			}
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
			// Cookies.set("language", action.payload, { expires: 7 });
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllData.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllData.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.error = "";
				const cookiesLang = Cookies.get("language");
				if (cookiesLang) {
					state.language = cookiesLang.toUpperCase();
				} else if (state.success?.languages && state.success.languages.length > 0) {
					const defaultLanguage = state.success.languages[0].iso_code.toUpperCase();
					state.language = defaultLanguage;
					Cookies.set("language", defaultLanguage, { expires: 7 });
				}
			})
			.addCase(getAllData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.success = null;
			});
	},
});

export const { addLanguage, addCountry, setLanguage } = getDataSlice.actions;
export default getDataSlice.reducer;
