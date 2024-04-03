import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { SendData, ErrorResponse } from "@/components/ContactUsForm/ContactUsForm";
import apiClient from "../../constants/baseApi";

interface ContactFormState {
	loading: boolean;
	error: "" | ErrorResponse;
	success: boolean;
}

const initialState: ContactFormState = {
	loading: false,
	error: "",
	success: false,
};

export const submitContactForm = createAsyncThunk(
	"contactForm/submit",
	async (formData: SendData, { rejectWithValue }) => {
		try {
			await apiClient.post('en/contact-us', formData);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return rejectWithValue(error.response.data);
			}
			throw error;
		}
	}
);

const contactFormSlice = createSlice({
	name: "contactForm",
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(submitContactForm.pending, (state) => {
				state.loading = true;
			})
			.addCase(submitContactForm.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
				state.error = "";
			})
			.addCase(submitContactForm.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as ErrorResponse;
				state.success = false;
			});
	},
});

export const { reset } = contactFormSlice.actions;
export default contactFormSlice.reducer;
