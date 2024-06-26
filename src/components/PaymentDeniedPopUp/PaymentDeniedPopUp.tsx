import Image from "next/image";
import CloseIcon from "@/assets/close-icon.svg";
import Underline from "@/assets/primary_underline.svg";
import Link from "next/link";

interface IPaymentDeniedPopUp {
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function PaymentDeniedPopUp({ active, setActive }: IPaymentDeniedPopUp) {
	const closeModal = () => {
		setActive(false);
	};

	return (
		<>
			{active && (
				<div
					onClick={closeModal}
					className="h-screen w-screen fixed z-20 bg-backgroundOpacity top-0 left-0 flex items-center justify-center "
				>
					<div
						onClick={(e) => {
							e.stopPropagation();
						}}
						className="bg-white  relative pt-[60px] pb-11 px-6 desktop:py-20 desktop:px-28 max-desktop:mx-3"
					>
						<button onClick={closeModal} className=" absolute right-6 top-6">
							<Image src={CloseIcon} alt="CloseIcon"></Image>
						</button>
						<div className="flex flex-col items-center">
							<div className="mb-6 desktop:mb-12 flex flex-col items-center gap-4">
								<div className="font-druk_wide text-lg leading-6 desktop:text-[32px] desktop:leading-10 uppercase">
									Sorry, something seems to have gone wrong
									<Image src={Underline} alt="Underline" className="desktop:mb-2" />
								</div>
								<div className="font-gotham_pro_regular text-xs leading-5 desktop:text-sm desktop:leading-[22px]">
									Would like to retry the payment?
								</div>
							</div>
							<div>
								<Link href={"/"}>
									<button className="font-druk_wide uppercase text-[14px] leading-5 py-[14px] w-[298px]">
										Try again
									</button>
								</Link>
								<Link href={"/"}>
									<button className="font-druk_wide uppercase text-[14px] leading-5 underline">
										Back to the homepage
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default PaymentDeniedPopUp;
