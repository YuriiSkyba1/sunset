"use client";

import { useEffect, useState } from "react";
import Button from "../Button/Button";
import CountryDropdown from "../CountryDropdown/CountryDropdown";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";

export default function PopUpCountry() {
	const [isVisited, setIsVisited] = useState<boolean>(false);

	const handleSaveButton = () => {
		setIsVisited(!isVisited);
		localStorage.setItem("isVisited", "true");
	};

	useEffect(() => {
		const storedIsVisited = localStorage.getItem("isVisited");
		if (storedIsVisited) {
			setIsVisited(JSON.parse(storedIsVisited));
		}
	}, []);

	return (
		<>
			{!isVisited && (
				<div className="fixed z-20 w-screen h-screen bg-backgroundOpacity flex justify-center items-center">
					<div className="w-[348px] desktop:w-[872px] bg-white py-[60px] desktop:py-20 flex flex-col items-center">
						<div className="mx-10 mb-12 flex flex-col items-center gap-4">
							<div className="text-[18px] leading-6 desktop:text-[32px] desktop:leading-10 uppercase font-bold text-center">
								<p>Welcome to the world </p>
								<p>of sunset cinema</p>
							</div>
							<div className="text-[12px] leading-5 desktop:text-sm desktop:leading-[22px] text-center">
								Select your language and country before you start exploring the service
							</div>
						</div>
						<div className="flex flex-col desktop:flex-row gap-6 mx-[112px] mb-8">
							<LanguageDropdown variant="popup" />
							<CountryDropdown variant="popup" />
						</div>
						<Button label="SAVE" onClick={handleSaveButton} />
					</div>
				</div>
			)}
		</>
	);
}
