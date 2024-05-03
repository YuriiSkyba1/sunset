import Image from "next/image";
import CloseIcon from "@/assets/close-icon.svg";
import Underline from "@/assets/primary_underline.svg";
import Link from "next/link";

interface IPaymentSuccessPopUp {
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	downloadLinks: string[];
	email: string;
}

function PaymentSuccessPopUp({ active, setActive, downloadLinks, email }: IPaymentSuccessPopUp) {
	const closeModal = () => {
		setActive(false);
	};
	console.log(downloadLinks, "downloadLinks");
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
						className="bg-white w-full max-w-[375px] desktop:w-[872px] relative pt-[60px] pb-11 px-6 desktop:py-20 desktop:px-10 max-desktop:mx-3"
					>
						<button onClick={closeModal} className=" absolute right-6 top-6">
							<Image src={CloseIcon} alt="CloseIcon"></Image>
						</button>
						<div className="flex flex-col items-center">
							<div className="mb-6 desktop:mb-12 flex flex-col items-center gap-4">
								<div className="font-druk_wide text-lg leading-6 desktop:text-[32px] desktop:leading-10 uppercase text-center">
									congratulations! payment <br /> was successful
									<Image
										src={Underline}
										alt="Underline"
										className="desktop:mb-2 desktop:w-[536px] m-auto"
									/>
								</div>
								<div className="font-gotham_pro_regular text-xs leading-5 desktop:text-sm desktop:leading-[22px] text-center">
									Thank you for using the services of Sunset cinema. <br /> We have sent the ticket to
									your e-mail{" "}
									<span className="font-gotham_pro_bold">
										{email ? email : "check the correctness of the mail"}
									</span>
								</div>
							</div>
							<div className="flex flex-col gap-3">
								<Link href={"/"}>
									<button
										className="bg-primary font-druk_wide  text-black_main text-[14px] py-4 
							max-desktop:w-[300px]
							desktop:px-[33px] desktop:mt-2 uppercase mr-3"
									>
										back to homepage
									</button>
								</Link>
								{downloadLinks.length > 1 ? (
									downloadLinks.map((link, index) => (
										<a
											key={index}
											href={link}
											download={`ticket-${index}.pdf`}
											target="_blank"
											className="font-druk_wide text-center uppercase text-[14px] leading-5 underline mb-2"
										>
											Download Ticket {index + 1}
										</a>
									))
								) : (
									<a
										href={downloadLinks[0]}
										download="ticket.pdf"
										target="_blank"
										className="font-druk_wide uppercase text-[14px] leading-5 underline"
									>
										Download Ticket
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default PaymentSuccessPopUp;
