import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./FilmCardSelectDropdown.module.css";

function formatDateString(dateString: string): string {
  const [day, month, year] = dateString.split(".").map(Number);
  if (!day || !month || !year) {
    return dateString; 
  }
  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) {
    return dateString; 
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
  return formattedDate
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

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
  const [selectedValue, setSelectedValue] = useState(arrayData[0] || ""); 
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
          {formatDateString(key)}
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
        } px-2 py-[10px] font-gotham_pro_bold text-[12px] leading-[14px]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue ? formatDateString(selectedValue) : label}</span>
        <div className={`${isOpen && isActive ? "" : "rotate-180"}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
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
