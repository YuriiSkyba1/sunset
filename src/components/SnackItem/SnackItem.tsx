import { IGetStoreItem } from "@/redux/getStoreItems/types/IGetStoreItem";
import Image from "next/image";
import ButtonMinus from "@/assets/checkout/button-minus.svg";
import ButtonPlus from "@/assets/checkout/buttom-plus.svg";
import { useState } from "react";
import { addStoreItemToCart, deleteStoreItemFromCart, setStoreItemQuantity } from "@/redux/cart/cartSlice";
import { useDispatch } from "@/hooks";
import { addResponse } from "@/redux/cartResponsesSlice/cartResponsesSlice";
import { addCheckedStoreItem, removeCheckedStoreItem } from "@/redux/sessionSelection/sessionSelection";

function SnackItem(storeItem: IGetStoreItem) {
	const { store_item_id, title, description, image, price, button } = storeItem;
	const dispatch = useDispatch();
	const [counter, setCounter] = useState<number>(0);

	const addItemToCart = () => {
		if (counter === 0) {
			const response = handleSnackAction(store_item_id, 1, "add");
			response.then((data) => {
				console.log("added to the cart", data);
				if (data) {
					dispatch(addResponse(data));
					dispatch(addCheckedStoreItem({ storeItem }));
					setCounter((counter) => counter + 1);
				}
			});
		} else {
			const response = handleSnackAction(store_item_id, counter + 1, "put");
			response.then((data) => {
				if (data) {
					console.log("increased quantity in cart", data);
					dispatch(addResponse(data));
					dispatch(addCheckedStoreItem({ storeItem }));
					setCounter((counter) => counter + 1);
				}
			});
		}
	};

	const reduceItem = () => {
		console.log("store_item_id", store_item_id);
		if (counter === 1 && counter) {
			const response = handleSnackAction(store_item_id, 0, "delete");
			response.then((data) => {
				if (data) {
					console.log("deleted from cart", data);
					dispatch(addResponse(data));
					dispatch(removeCheckedStoreItem({ storeItem }));
					setCounter(0);
				}
			});
		}
		if (counter > 1) {
			const response = handleSnackAction(store_item_id, counter - 1, "put");
			response.then((data) => {
				if (data) {
					console.log("reduced quantity", data);
					dispatch(addResponse(data));
					dispatch(removeCheckedStoreItem({ storeItem }));
					setCounter((counter) => counter - 1);
				}
			});
		}
	};

	const handleSnackAction = async (snackItem: number, storeItemQuantity: number, action: string) => {
		let url = "";
		if (action === "add") {
			url = `/api/addStoreItemToCart`;
		} else if (action === "put") {
			url = "/api/setStoreItemQuantity";
		} else if (action === "delete") {
			url = "/api/deleteStoreItemFromCart";
		} else {
			console.log("Action is not correct");
		}
		// const url = `/api/${action === "add" ? "addStoreItemToCart" : "setStoreItemQuantity"}`;
		console.log("Attempting to fetch:", url); // Check the URL is correct
		try {
			const response = await fetch(url, {
				method: action === "add" ? "POST" : action === "put" ? "PUT" : "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ snackItem, storeItemQuantity }),
				credentials: "include", // Ensures cookies are included with the request
			});

			if (!response.ok) {
				return false;
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				console.log("Response data222:", data);
				return data;
			}
		} catch (error) {
			console.error("Error handling snack item action:", error);
			return false;
		}
	};

	return (
		<div className="desktop:max-w-[200px]">
			<div className="border">
				<Image
					className=" max-h-[200px]"
					src={image}
					alt={title}
					width={200}
					height={200}
					layout="fixed"
					loading="lazy"
					unoptimized={true}
				/>
				<div className="flex justify-between text-[12px] leading-[18px] p-2 border-t bg-pink_light">
					<span className="font-gotham_pro_regular">Price:</span>
					<span className="font-druk_wide">{price}</span>
				</div>
			</div>
			<div className="uppercase font-druk_wide text-[10px] leading-[14px] desktop:text-[14px] desktop:leading-5 my-2">
				{title}
			</div>
			<div className="font-gotham_pro_regular text-[10px] leading-[12px] desktop:text-[12px] desktop:leading-5 border-t desktop:border desktop:px-[6px] desktop:py-[4px] border-grey_medium">
				Bonuses are occured: <span className="font-gotham_pro_bold">{price}</span>
			</div>
			<div className="flex justify-between items-center mt-4">
				<button onClick={reduceItem}>
					<Image src={ButtonMinus} alt="ButtonMinus" width={28}></Image>
				</button>
				<span className="font-druk_wide text-[14px] leading-5">{counter}</span>
				<button onClick={addItemToCart}>
					<Image src={ButtonPlus} alt="ButtonPlus" width={28}></Image>
				</button>
			</div>
		</div>
	);
}

export default SnackItem;
