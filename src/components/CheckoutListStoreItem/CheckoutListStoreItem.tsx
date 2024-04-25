import { IGetStoreItem } from "@/redux/getStoreItems/types/IGetStoreItem";
import Image from "next/image";
import RemoveButton from "@/assets/checkout/remove-button.svg";
import { useDispatch } from "@/hooks";
import { addCheckedStoreItem, removeCheckedStoreItem } from "@/redux/sessionSelection/sessionSelection";

export default function CheckoutListStoreItem(storeItem: IGetStoreItem) {
	const dispatch = useDispatch();

	return (
		<div>
			<div className="border bg-white py-[12px] desktop:px-[16px] px-[12px] flex justify-between font-gotham_pro_regular text-[14px] leading-[14px] desktop:text-[16px] desktop:leading-6">
				<div className="flex gap-1 desktop:gap-2 ">
					<span className="text-grey_dark">Item:</span>
					<span>Small popcorn meal</span>
				</div>
				<div>
					<button
						onClick={() => {
							dispatch(removeCheckedStoreItem({ storeItem }));
						}}
					>
						<Image src={RemoveButton} alt="RemoveButton" />
					</button>
				</div>
			</div>
			<div className="font-druk_wide text-[12px] leading-[18px] pb-1 desktop:pb-2 mt-2 mb-1 border-b border-grey_dark">
				<div className="flex justify-between mb-1">
					<span>PRICE:</span>
					<span>{storeItem.price}$</span>
				</div>
				<div className="flex justify-between">
					<span className=" font-gotham_pro_medium ">Taxes:</span>
					<span className=" font-gotham_pro_regular">3.45 $</span>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex gap-1">
					<span className="font-gotham_pro_regular text-[12px] leading-[20px] ">Popcorn:</span>
					<span className="font-gotham_pro_bold text-[12px] leading-[20px]">{storeItem.title}</span>
				</div>
				<div className="flex gap-1">
					<span className="font-gotham_pro_regular text-[12px] leading-[20px] ">Numbers:</span>
					<span className="font-gotham_pro_bold text-[12px] leading-[20px]">1 ks</span>
				</div>
			</div>
		</div>
	);
}
