import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItemInterface {
	id: number;
	type: string;
	name: string;
	price: string;
	quantity: number;
	total: string;
}

export interface CartResponsesSliceInterface {
	subtotal: string;
	discount: string;
	total: string;
	cart_items: CartItemInterface[];
	discounts: [];
}

const initialState: CartResponsesSliceInterface = {
	subtotal: "0.00",
	discount: "0.00",
	total: "0.00",
	cart_items: [],
	discounts: [],
};

export const cartResponsesSlice = createSlice({
	name: "cartResponses",
	initialState,
	reducers: {
		addResponse: (state, action: PayloadAction<CartResponsesSliceInterface>) => {
			state.cart_items = action.payload.cart_items;
			state.discount = action.payload.discount;
			state.discounts = action.payload.discounts;
			state.subtotal = action.payload.subtotal;
			state.total = action.payload.total;
		},
	},
});

export default cartResponsesSlice.reducer;

export const { addResponse } = cartResponsesSlice.actions;
