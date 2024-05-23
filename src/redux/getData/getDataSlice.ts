import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IGetState } from "./types/IGetState";
import apiClient from "../../constants/baseApi";
import Cookies from "js-cookie";

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
			console.log("action.payload addLang", action.payload);
			state.success?.languages.push(action.payload);
		},
		addCountry: (state, action) => {
			state.success?.countries.push(action.payload);
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
				console.log("state.success", state.success);
				const cookiesLang = Cookies.get("currentLanguage");
				const currentCountry = Cookies.get("currentCountry");
				let langObj;
				let currCountryObj;
				if (cookiesLang && currentCountry) {
					langObj = JSON.parse(cookiesLang);
					currCountryObj = JSON.parse(currentCountry);
					state.success?.languages.push(langObj);
					state.success?.countries.push(currCountryObj);
				}

				console.log("langObj", langObj);
				console.log("currCountryObj", currCountryObj);
			})
			.addCase(getAllData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.success = null;
			});
	},
});
export const { addLanguage, addCountry } = getDataSlice.actions;
export default getDataSlice.reducer;
