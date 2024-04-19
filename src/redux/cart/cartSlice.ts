import apiClient from "@/constants/baseApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface initialStateInterface {
	loading: boolean;
	error: null | string;
	success: null | CartInterface;
}

const initialState: initialStateInterface = {
	success: null,
	loading: false,
	error: null,
};

export const showCart = createAsyncThunk("cart/showCart", async () => {
	try {
		const response = await apiClient.get(`en/cart`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "An unknown error occurred");
		}
		throw error;
	}
});

export const addTicketToCart = createAsyncThunk("cart/addTicketToCart", async (ticketId: number) => {
	try {
		const response = await apiClient.post(`en/cart/ticket/${ticketId}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "An unknown error occurred");
		}
		throw error;
	}
});

export const applyPromocode = createAsyncThunk("cart/applyPromocode", async (promocode: number) => {
	try {
		const response = await apiClient.post(`en/cart/promocode/${promocode}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "An unknown error occurred");
		}
		throw error;
	}
});

export const deleteTicketFromCart = createAsyncThunk("cart/deleteTicketFromCart", async (ticketId: number) => {
	try {
		const response = await apiClient.delete(`en/cart/ticket/${ticketId}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "An unknown error occurred");
		}
		throw error;
	}
});

export const addStoreItemToCart = createAsyncThunk("cart/addStoreItemToCart", async (storeItemId: number) => {
	try {
		const response = await apiClient.post(`en/cart/store-item/${storeItemId}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "An unknown error occurred");
		}
		throw error;
	}
});

export const deleteStoreItemFromCart = createAsyncThunk("cart/deleteStoreItemFromCart", async (storeItemId: number) => {
	try {
		const response = await apiClient.delete(`en/cart/store-item/${storeItemId}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || "An unknown error occurred");
		}
		throw error;
	}
});

export const setStoreItemQuantity = createAsyncThunk(
	"cart/setStoreItemQuantity",
	async ({ storeItemId, storeItemQuantity }: { storeItemId: number; storeItemQuantity: number }) => {
		try {
			const response = await apiClient.put(`en/cart/store-item/${storeItemId}/${storeItemQuantity}`);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(error.response.data.message || "An unknown error occurred");
			}
			throw error;
		}
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(showCart.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(showCart.fulfilled, (state, action) => {
			state.loading = false;
			state.success = action.payload;
			state.error = null;
		});
		builder.addCase(showCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});
		builder.addCase(addTicketToCart.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(addTicketToCart.fulfilled, (state, action) => {
			state.loading = false;
			state.success = action.payload;
			state.error = null;
		});
		builder.addCase(addTicketToCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});
		builder.addCase(applyPromocode.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(applyPromocode.fulfilled, (state, action) => {
			state.loading = false;
			state.success = action.payload;
			state.error = null;
		});
		builder.addCase(applyPromocode.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});
		builder.addCase(deleteTicketFromCart.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteTicketFromCart.fulfilled, (state, action) => {
			state.loading = false;
			state.success = action.payload;
			state.error = null;
		});
		builder.addCase(deleteTicketFromCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});
		builder.addCase(addStoreItemToCart.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(addStoreItemToCart.fulfilled, (state, action) => {
			state.loading = false;
			state.success = action.payload;
			state.error = null;
		});
		builder.addCase(addStoreItemToCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});
		builder.addCase(deleteStoreItemFromCart.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteStoreItemFromCart.fulfilled, (state, action) => {
			state.loading = false;
			state.success = action.payload;
			state.error = null;
		});
		builder.addCase(deleteStoreItemFromCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});
		builder.addCase(setStoreItemQuantity.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(setStoreItemQuantity.fulfilled, (state, action) => {
			state.loading = false;
			state.success = action.payload;
			state.error = null;
		});
		builder.addCase(setStoreItemQuantity.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});
	},
});

export default cartSlice.reducer;
