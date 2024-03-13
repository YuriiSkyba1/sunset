"use client";

import { useState } from "react";
import Image from "next/image";
import MenuIcon from "@/assets/menu-icon.png";
import CrossIcon from "@/assets/cross-icon.svg";
import MenuDropdownMobile from "./MenuDropdownMobile";
import MenuDropdownDesktop from "./MenuDropdownDesktop";

function MenuDropdown() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div>
			<button onClick={() => setIsOpen((prev) => !prev)} className="flex gap-2 items-center">
				{isOpen ? (
					<Image src={CrossIcon} alt="CrossIcon" className="w-10" />
				) : (
					<Image src={MenuIcon} alt="MenuIcon" className="w-10" />
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
