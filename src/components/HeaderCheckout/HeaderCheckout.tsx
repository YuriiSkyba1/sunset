import Image from "next/image";
import CheckoutHeaderLogo from "@/assets/header-checkout-logo.svg";

function HeaderCheckout() {
	return (
		<header className="border-b">
			<div>
				<div className="desktop:hidden m-auto max-w-[375px] py-[13px] flex justify-center">
					<Image src={CheckoutHeaderLogo} width={108} alt={"Logo"}></Image>
				</div>
			</div>
			<div className="hidden m-auto desktop:max-w-[1440px] py-[20px] desktop:flex justify-center">
				<Image src={CheckoutHeaderLogo} width={198} alt={"Logo"}></Image>
			</div>
		</header>
	);
}

export default HeaderCheckout;
