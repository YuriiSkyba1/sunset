import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import IconChevronDown from "@/assets/icon-chevron-down.svg";

function CountryDropdown({
	country,
	setCountry,
	availableCountries,
}: {
	country: string;
	setCountry: Dispatch<SetStateAction<string>>;
	availableCountries: {
		name: string;
		iso_code: string;
	}[];
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const normalizedAvailableCountries = availableCountries.map(country => ({
		...country,
		iso_code: country.iso_code || country.isoCode,
	}));

	const uniqueAvailableCountries = normalizedAvailableCountries.filter(
		(value, index, self) =>
			index === self.findIndex((t) => t.iso_code === value.iso_code)
	);


	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="font-druk_wide uppercase w-[300px] desktop:w-[313px] text-[10px] desktop:[12px] flex justify-between gap-2 items-center px-3 py-3 font-bold border-black_main border-2"
			>
				{country}
				<Image
					src={IconChevronDown}
					width={24}
					height={24}
					alt="BottomArrow"
					className={`${isOpen ? "rotate-180" : ""}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-20 bg-white flex flex-col w-full border-x-2 border-b-2">
					{uniqueAvailableCountries?.map((country) => (
						<div key={country.iso_code}>
							<button
								className="font-druk_wide text-[10px] desktop:[12px] px-3 py-[6px] text-start "
								onClick={() => {
									setCountry(country.name.toUpperCase());
									setIsOpen(!isOpen);
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

export default CountryDropdown;
