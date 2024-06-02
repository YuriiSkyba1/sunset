import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MovieSchedule } from "../FilmsList/FilmsList";
import ReactDOM from "react-dom";
import styles from "./FilmCardSelectDropdown.module.css";
import Image from "next/image";
import ArrowIcon from "@/assets/icon-chevron-down.svg";

function FilmCardSelectDropdown({
	selectedItem,
	setSelectedItem,
	arrayData,
	label,
	isHovered,
	isActive = true,
}: {
	selectedItem: string;
	setSelectedItem: Dispatch<SetStateAction<string>>;
	arrayData: string[];
	label: string;
	isHovered: boolean;
	isActive?: boolean;
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

	const dropdownMenu = isOpen && isHovered && isActive && (
		<ul
			className={`absolute max-h-[120px] overflow-auto border border-[#cccccc] rounded-b-lg bg-white z-20 ${styles.customScrollbar}`}
			style={{
				top: getDropdownPosition().top,
				left: getDropdownPosition().left,
				width: getDropdownPosition().width,
			}}
		>
			{arrayData.map((key, index) => (
				<li
					key={index}
					className={`pl-2 py-[10px] uppercase font-gotham_pro_bold cursor-pointer hover:bg-gray-200 `}
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
				className={`w-full flex justify-between items-center desktop:max-w-[136px] max-w-[152px] border border-[#cccccc] ${
					isOpen && isActive ? " rounded-t-lg " : " rounded-lg"
				} ${
					isActive ? " " : "cursor-not-allowed"
				} px-2 py-[10px] uppercase font-gotham_pro_bold text-[12px] leading-[14px]`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>{selectedValue || label}</span>
				<div className={`${isOpen && isActive ? "" : "rotate-180"}`}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.00015 7.58594L12.0002 14.5859L19.0002 7.58594L20.4144 9.00015L12.0002 17.4144L3.58594 9.00015L5.00015 7.58594Z"
							fill="#0F0F0F"
						/>
					</svg>
				</div>
			</button>
			{isOpen && ReactDOM.createPortal(dropdownMenu, document.body)}
		</div>
	);
}

export default FilmCardSelectDropdown;
