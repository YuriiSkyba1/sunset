import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ErrorResponse, IFeedbackData } from "@/components/FeedbackForm/FeedbackForm";

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

export const postFeedback = createAsyncThunk(
	"feedbackForm/postFeedback",
	async (formData: IFeedbackData, { rejectWithValue }) => {
		try {
			await axios.post("https://sunset.loc/api/en/feedback", formData);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return rejectWithValue(error.response.data);
			}
			throw error;
		}
	}
);

const feedbackFormSlice = createSlice({
	name: "feedbackForm",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postFeedback.pending, (state) => {
				state.loading = true;
			})
			.addCase(postFeedback.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
				state.error = "";
			})
			.addCase(postFeedback.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload as ErrorResponse;
			});
	},
});

export default feedbackFormSlice.reducer;
