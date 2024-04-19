import { IGetStoreItem } from "@/redux/getStoreItems/types/IGetStoreItem";
import Image from "next/image";
import ButtonMinus from "@/assets/checkout/button-minus.svg";
import ButtonPlus from "@/assets/checkout/buttom-plus.svg";
import { useState } from "react";
import { addStoreItemToCart, deleteStoreItemFromCart, setStoreItemQuantity } from "@/redux/cart/cartSlice";
import { useDispatch } from "@/hooks";

function SnackItem({ store_item_id, title, description, image, price, button }: IGetStoreItem) {
	const dispatch = useDispatch();
	const [counter, setCounter] = useState<number>(0);

	const addItemToCart = () => {
		if (counter == 0) {
			dispatch(addStoreItemToCart(store_item_id));
			dispatch(setStoreItemQuantity({ storeItemId: store_item_id, storeItemQuantity: 1 }));
		} else {
			dispatch(setStoreItemQuantity({ storeItemId: store_item_id, storeItemQuantity: counter + 1 }));
		}
		setCounter((counter) => counter + 1);
	};

	const reduceItem = () => {
		if (counter > 0) {
			dispatch(setStoreItemQuantity({ storeItemId: store_item_id, storeItemQuantity: counter - 1 }));
			setCounter((counter) => counter - 1);
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
