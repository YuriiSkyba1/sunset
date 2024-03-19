"use client";

import MenuIcon from "@/assets/menu-icon.png";
import HeaderLogo from "@/assets/header-logo.svg";
import IconAccount from "@/assets/icon-account.svg";
import Image from "next/image";
import LocationBanner from "../LocationBanner/LocationBanner";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import ContactUsButton from "../ContactUsButton/ContactUsButton";
import Link from "next/link";
import MenuDropdown from "../MenuDropdown/MenuDropdown";
import { useEffect } from "react";
import { useDispatch } from "@/hooks";
import { getAllData } from "@/redux/getData/getDataSlice";

function Header() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllData());
	}, []);

	return (
		<header className="border-b-2">
			<div className="desktop:max-w-[1440px] desktop:m-auto desktop:relative ">
				<div className=" px-[14px] desktop:px-[60px] py-1 desktop:py-4 desktop:flex desktop:justify-between">
					<div className="flex justify-between desktop:gap-8 items-center">
						<div className=" w-[108px] desktop:w-[200px]">
							<Image src={HeaderLogo} alt="" />
						</div>
						<div className="flex items-center gap-3">
							<div className=" desktop:hidden">
								<Link href={""}>
									<Image src={IconAccount} alt="IconAccount" />
								</Link>
							</div>
							<MenuDropdown />
						</div>
						<div className="hidden desktop:block w-[1px] h-[21px] bg-grey_medium mx-3"></div>
						<LocationBanner style="hidden desktop:block" />
						<div className="hidden desktop:block w-[1px] h-[21px] bg-grey_medium mx-3"></div>
						<LanguageDropdown style="hidden desktop:block" />
					</div>
					<div className="hidden font-bold desktop:flex desktop:gap-8 desktop:items-center">
						<Link href={""} className="flex items-center gap-2">
							<Image src={IconAccount} alt="IconAccount" />
							<p>LOG IN</p>
						</Link>
						<div className="hidden desktop:block w-[1px] h-[21px] bg-grey_medium mx-3"></div>
						<Link href={""} className="">
							SIGN UP
						</Link>
						<ContactUsButton style="primary" />
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
