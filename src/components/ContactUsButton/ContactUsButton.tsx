"use client";

import { useState } from "react";
import ContactUsModal from "../ContactUsModal/ContactUsModal";
import ThankYouPopUp from "../ThankYouPopUp/ThankYouPopUp";

function ContactUsButton({ style, width }: { style: "primary" | "black"; width?: "350px" | "200px" }) {
	const [modalActive, setModalActive] = useState<boolean>(false);
	const [thankActive, setThankActive] = useState<boolean>(false);

	function handleOnClick() {
		setModalActive(true);
	}

	if (style === "primary") {
		return (
			<div>
				<button
					onClick={handleOnClick}
					className={
						"px-8 py-3 leading-18 bg-primary text-black_main font-druk_wide text-[12px] leading-[18px]"
					}
				>
					CONTACT US
				</button>
				<ContactUsModal
					active={modalActive}
					setActive={setModalActive}
					activeThank={thankActive}
					setActiveThank={setThankActive}
				/>
				<ThankYouPopUp isOpenThank={thankActive} setOpenThank={setThankActive} />
			</div>
		);
	}

	if (style === "black" && width === "350px") {
		return (
			<div>
				<button
					onClick={handleOnClick}
					className={"w-[350px] px-8 py-3 bg-black_main text-white font-druk_wide text-[12px] leading-[18px]"}
				>
					CONTACT US
				</button>
				<ContactUsModal
					active={modalActive}
					setActive={setModalActive}
					activeThank={thankActive}
					setActiveThank={setThankActive}
				/>
				<ThankYouPopUp isOpenThank={thankActive} setOpenThank={setThankActive} />
			</div>
		);
	}

	if (style === "black" && width === "200px") {
		return (
			<div>
				<button
					onClick={handleOnClick}
					className={"w-[200px] px-8 py-3 bg-black_main text-white font-druk_wide text-[12px] leading-[18px]"}
				>
					CONTACT US
				</button>
				<ContactUsModal
					active={modalActive}
					setActive={setModalActive}
					activeThank={thankActive}
					setActiveThank={setThankActive}
				/>
				<ThankYouPopUp isOpenThank={thankActive} setOpenThank={setThankActive} />
			</div>
		);
	}
}

export default ContactUsButton;
