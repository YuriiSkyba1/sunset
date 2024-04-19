interface CartInterface {
	subtotal: string;
	discount: string;
	total: string;
	cart_items: CartItemInterface;
	discounts: [];
}

interface CartItemInterface {
	id: number;
	type: string;
	name: string;
	price: string;
	quantity: number;
	total: string;
}
