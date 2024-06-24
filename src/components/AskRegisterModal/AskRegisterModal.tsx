import React from "react";
import Image from "next/image";
import CloseIcon from "@/assets/close-icon.svg";
import Underline from "@/assets/primary_underline.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IAskRegisterModal {
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function AskRegisterModal({ isActive, setIsActive }: IAskRegisterModal) {
	const currentPath = usePathname();
	return (
		<>
			{isActive && (
				<div
					onClick={() => setIsActive(false)}
					className="h-screen w-screen fixed z-20 bg-backgroundOpacity top-0 left-0 flex items-center justify-center"
				>
					<div
						onClick={(e) => {
							e.stopPropagation();
						}}
						className="w-full max-w-[348px] desktop:max-w-[872px] bg-white mx-3 relative py-[60px] px-6 desktop:py-20 desktop:px-10"
					>
						<button onClick={() => setIsActive(false)} className=" absolute right-6 top-6">
							<Image src={CloseIcon} alt="CloseIcon"></Image>
						</button>
						<div className="flex flex-col items-center mb-[56px] desktop:mb-[48px]">
							<h2 className="text-[18px] leading-6 desktop:text-[32px] desktop:leading-10 uppercase font-druk_wide text-center">
								do you want to register?
							</h2>
							<Image src={Underline} alt="Underline" className="desktop:mb-2 desktop:w-[542px]" />
							<p className="text-[14px] leading-[22px] mt-3 font-gotham_pro_regular text-center">
								After registering on the site, you can accumulate and spend bonuses, interact with the
								loyalty system
							</p>
						</div>
						<div className="flex flex-col-reverse desktop:flex-col items-center gap-4 desktop:gap-6">
							<Link
								href={`${currentPath}/checkout`}
								className="uppercase font-druk_wide text-[12px] leading-[18px] py-[14px] px-[113px] desktop:text-[14px] desktop:leading-5 bg-primary text-black_main desktop:py-[14px] desktop:px-[78px]"
							>
								SIGN UP
							</Link>
							<Link
								href={`${currentPath}/checkout`}
								className="uppercase underline font-druk_wide text-[12px] leading-[18px] desktop:text-[14px] desktop:leading-5"
							>
								buy a ticket as a guest
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default AskRegisterModal;
