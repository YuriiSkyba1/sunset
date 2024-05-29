import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MovieSchedule } from "../FilmsList/FilmsList";

function FilmCardSelectDropdown({
	selectedItem,
	setSelectedItem,
	arrayData,
	label,
}: {
	selectedItem: string;
	setSelectedItem: Dispatch<SetStateAction<string>>;
	arrayData: string[];
	label: string;
}) {
	const handleOnChange = (value: string) => {
		setSelectedItem(value);
	};

	return (
		<div className="w-full desktop:max-w-[136px] max-w-[152px]" onClick={(e) => e.stopPropagation()}>
			<p className="font-gotham_pro_regular text-xs leading-3 p-2 desktop:text-[16px] desktop:leading-[22px]">
				{label}
			</p>
			<select
				className="w-full desktop:max-w-[136px] max-w-[152px] border border-[#cccccc] rounded-lg pl-2 py-[10px] uppercase font-gotham_pro_bold text-[12px] leading-[14px]"
				onChange={(e) => handleOnChange(e.target.value)}
			>
				<option value="" className="pl-2 py-[10px] uppercase font-gotham_pro_bold">
					{label}
				</option>
				{arrayData &&
					arrayData.map((key, index) => (
						<option
							key={index}
							onClick={(e) => {
								console.log("Event", e);
							}}
							value={key}
							className="pl-2 py-[10px] uppercase font-gotham_pro_bold"
						>
							{key}
						</option>
					))}
			</select>
		</div>
	);
}

export default FilmCardSelectDropdown;
