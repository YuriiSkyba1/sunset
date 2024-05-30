import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MovieSchedule } from "../FilmsList/FilmsList";
import ReactDOM from "react-dom";

function FilmCardSelectDropdown({
	selectedItem,
	setSelectedItem,
	arrayData,
	label,
	isHovered,
}: {
	selectedItem: string;
	setSelectedItem: Dispatch<SetStateAction<string>>;
	arrayData: string[];
	label: string;
	isHovered: boolean;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState("");
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const handleSelect = (value: string) => {
		setSelectedValue(value);
		setIsOpen(false);
		setSelectedItem(value);
	};

	useEffect(() => {
		if (!isHovered) {
			setIsOpen(false);
		}
	}, [isHovered]);

	const getDropdownPosition = () => {
		if (dropdownRef.current) {
			const rect = dropdownRef.current.getBoundingClientRect();
			return {
				top: rect.bottom + window.scrollY,
				left: rect.left + window.scrollX,
				width: rect.width,
			};
		}
		return { top: 0, left: 0, width: 0 };
	};

	const dropdownMenu = isOpen && isHovered && (
		<ul
			className="absolute max-h-[120px] overflow-auto border border-[#cccccc] rounded-lg bg-white z-20"
			style={{
				top: getDropdownPosition().top,
				left: getDropdownPosition().left,
				width: getDropdownPosition().width,
			}}
		>
			{arrayData.map((key, index) => (
				<li
					key={index}
					className="pl-2 py-[10px] uppercase font-gotham_pro_bold cursor-pointer hover:bg-gray-200"
					onClick={() => handleSelect(key)}
				>
					{key}
				</li>
			))}
		</ul>
	);

	return (
		<div className="relative w-full" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
			<button
				className="w-full desktop:max-w-[136px] max-w-[152px] border border-[#cccccc] rounded-lg pl-2 py-[10px] uppercase font-gotham_pro_bold text-[12px] leading-[14px]"
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedValue || label}
			</button>
			{isOpen && ReactDOM.createPortal(dropdownMenu, document.body)}
		</div>
	);
}

export default FilmCardSelectDropdown;
