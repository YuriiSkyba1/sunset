"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MenuIcon from "@/assets/menu-icon.png";
import CrossIcon from "@/assets/cross-icon.svg";
import MenuDropdownMobile from "./MenuDropdownMobile";
import MenuDropdownDesktop from "./MenuDropdownDesktop";
import { useDispatch } from "@/hooks";
import { getLocationsList } from "@/redux/getLocationsList/getLocationsListSlice";

function MenuDropdown() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getLocationsList("FR"));
	}, []);

	return (
		<div>
			<button onClick={() => setIsOpen((prev) => !prev)} className="flex gap-2 items-center">
				{isOpen ? (
					<Image src={CrossIcon} width={48} height={48} alt="CrossIcon" className="" />
				) : (
					<Image src={MenuIcon} width={48} height={48} alt="MenuIcon" className="" />
				)}
				<p className="hidden desktop:block font-bold">MENU</p>
			</button>
			{isOpen && (
				<div>
					<MenuDropdownDesktop />
					<MenuDropdownMobile />
				</div>
			)}
		</div>
	);
}

export default MenuDropdown;
