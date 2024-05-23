import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Image from "next/image";
import UpArrow from "@/assets/up-arrow.svg";
import BottomArrow from "@/assets/bot-arrow.svg";
import { useSelector } from "@/hooks";

function CountryDropdownSmall() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [country, setCountry] = useState("");

	const availableCountries = useSelector((state) => state.data.success?.countries);

	useEffect(() => {
		const storedCountry = Cookies.get("country");
		if (storedCountry) {
			setCountry(storedCountry);
		}
	}, []);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className={
					"flex gap-2 items-center px-3 py-[6px] font-druk_wide text-[12px] leading-[18px] uppercase" +
					(isOpen ? " border-black_main border-2" : "")
				}
			>
				{country}
				{!isOpen ? <Image src={BottomArrow} alt="BottomArrow" /> : <Image src={UpArrow} alt="UpArrow" />}
			</button>

			{isOpen && (
				<div className="absolute z-20 bg-white flex flex-col w-full border-x-2 border-b-2">
					{availableCountries?.map((country) => (
						<div key={country.iso_code}>
							<button
								className="px-3 py-[6px] text-start font-druk_wide text-[12px] leading-[18px] uppercase"
								onClick={() => {
									setCountry(country.name.toUpperCase());
									setIsOpen(!isOpen);
									Cookies.set("country", country.name, { expires: 7 });
									window.location.reload();
								}}
							>
								{country.name.toUpperCase()}
							</button>
							<hr />
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default CountryDropdownSmall;
