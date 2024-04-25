import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/hooks";
import { getItems } from "@/redux/getStoreItems/getStoreItemsSlice";
import SnackItem from "../SnackItem/SnackItem";
import Underline from "@/assets/checkout/underline.svg";
import Image from "next/image";
import CrossButton from "@/assets/checkout/cross-button.svg";

interface ISnacksPopUp {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SnacksPopUp({ isOpen, setOpen }: ISnacksPopUp) {
	const dispatch = useDispatch();
	const locationSlug = useSelector((state) => state.locationView.success?.slug!);

	useEffect(() => {
		if (locationSlug) {
			dispatch(getItems(locationSlug));
		}
	}, []);

	const snacks = useSelector((state) => state.storeItems.success);

	const closePopUp = () => {
		setOpen(false);
	};

	return (
		<div
			onClick={() => closePopUp()}
			className="h-screen w-screen fixed z-20 bg-backgroundOpacity top-0 left-0 flex items-center justify-center "
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="w-[348px] desktop:w-[872px] bg-white py-[60px] desktop:py-20 px-6 desktop:px-[112px] flex flex-col items-center relative"
			>
				<button onClick={() => closePopUp()} className="absolute right-6 top-6">
					<Image src={CrossButton} alt="CrossButton" width={28} />
				</button>
				<div className="font-druk_wide uppercase text-[18px] leading-6 desktop:text-[32px] desktop:leading-[40px]">
					would you like to
					<br />
					purchase snacks?
				</div>
				<Image src={Underline} alt="Underline" />
				<div className="mt-2 font-gotham_pro_regular">
					Select your language and country before you start exploring the service
				</div>
				<div className="flex gap-6 mt-6 desktop:mt-10">
					{snacks &&
						snacks.map((snack) => (
							<SnackItem
								store_item_id={snack.store_item_id}
								title={snack.title}
								description={snack.description}
								image={snack.image}
								price={snack.price}
								button={snack.button}
							/>
						))}
				</div>
				<div className="flex desktop:flex-col flex-col-reverse gap-4 desktop:gap-6 mt-8">
					<button
						onClick={closePopUp}
						className="font-druk_wide uppercase text-[12px] leading-[18px] desktop:text-[14px] desktop:leading-5 py-[14px] desktop:px-[44px] px-[88px] bg-primary "
					>
						ADD TO CART
					</button>
					<button className="font-druk_wide uppercase underline desktop:text-[14px] desktop:leading-5">
						to order a ticket
					</button>
				</div>
			</div>
		</div>
	);
}

export default SnacksPopUp;
