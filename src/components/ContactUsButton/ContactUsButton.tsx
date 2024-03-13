"use client";

import { useState } from "react";
import ContactUsForm from "../ContactUsForm/ContactUsForm";
import ContactUsModal from "../ContactUsModal/ContactUsModal";

function ContactUsButton({ style, width }: { style: "primary" | "black"; width?: "350px" | "200px" }) {
	const [modalActive, setModalActive] = useState<boolean>(false);

	function handleOnClick() {
		setModalActive(true);
	}

	if (style === "primary") {
		return (
			<div>
				<button onClick={handleOnClick} className={"px-8 py-3 bg-primary text-black_main font-bold"}>
					CONTACT US
				</button>
				<ContactUsModal active={modalActive} setActive={setModalActive} />
			</div>
		);
	}

	if (style === "black" && width === "350px") {
		return (
			<div>
				<button onClick={handleOnClick} className={"w-[350px] px-8 py-3 bg-black_main text-white font-bold"}>
					CONTACT US
				</button>
				<ContactUsModal active={modalActive} setActive={setModalActive} />
			</div>
		);
	}

	if (style === "black" && width === "200px") {
		return (
			<div>
				<button onClick={handleOnClick} className={"w-[200px] px-8 py-3 bg-black_main text-white font-bold"}>
					CONTACT US
				</button>
				<ContactUsModal active={modalActive} setActive={setModalActive} />
			</div>
		);
	}
}

export default ContactUsButton;
