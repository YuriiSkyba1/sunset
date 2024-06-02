import Image from "next/image";
import CloseIcon from "@/assets/close-icon.svg";
import Underline from "@/assets/primary_underline.svg";
import Link from "next/link";

interface ThankYouPopUpInterface {
	isOpenThank: boolean;
	setOpenThank: React.Dispatch<React.SetStateAction<boolean>>;
}

function ThankYouPopUp({ isOpenThank, setOpenThank }: ThankYouPopUpInterface) {
	const handleClosePopUp = () => {
		setOpenThank(false);
	};

	return (
		<>
			{isOpenThank && (
				<div
					className="h-screen w-screen fixed z-20 bg-backgroundOpacity top-0 left-0 flex items-center justify-center "
					onClick={handleClosePopUp}
				>
					<div
						onClick={(e) => {
							e.stopPropagation();
						}}
						className="bg-white relative pt-[60px] pb-11 px-6 desktop:py-20 desktop:px-10 max-desktop:mx-3"
					>
						<button className=" absolute right-6 top-6" onClick={handleClosePopUp}>
							<Image src={CloseIcon} alt="CloseIcon"></Image>
						</button>
						<div className="flex flex-col items-center">
							<div className="font-druk_wide text-lg leading-6 desktop:text-[32px] desktop:leading-10 uppercase text-center">
								thank you for
								<br />
								the feedback
							</div>
							<Image src={Underline} alt="Underline" className="desktop:mb-2" />
							<div className="font-gotham_pro_regular text-xs font-normal text-center leading-5 desktop:text-sm desktop:leading-[22px] mb-[48px]">
								Thank you for sending your feedback. Our manager will contact you within three working
								days.
							</div>
							<Link
								href={"/location"}
								onClick={handleClosePopUp}
								className="desktop:px-[34px] desktop:py-[14px] p-[14px] text-center bg-primary font-druk_wide uppercase desktop:text-[14px] text-[12px]"
							>
								back to homepage
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ThankYouPopUp;
