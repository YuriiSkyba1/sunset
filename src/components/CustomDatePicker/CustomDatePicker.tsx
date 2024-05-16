import Image from "next/image";
import BotArrow from "@/assets/bot-arrow.svg";
import { Dispatch, LegacyRef, SetStateAction, forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./CustomDatePicker.css";
import { useDispatch, useSelector } from "@/hooks";
import { addSessionFrom, addTitle } from "@/redux/getFilteredFilms/getGenersFilms";

function CustomDatePickerDesktop() {
	const dispatch = useDispatch();
	const startDateFromStore = useSelector((state) => state.genres.filters.session_from);
	const [startDate, setStartDate] = useState<Date | null>(startDateFromStore ? new Date(startDateFromStore) : null);

	useEffect(() => {
		if (startDateFromStore) {
			setStartDate(new Date(startDateFromStore));
		} else {
			setStartDate(null);
		}
	}, [startDateFromStore]);

	const ExampleCustomInput = forwardRef<HTMLButtonElement, { value: string; onClick: () => void }>(
		({ value, onClick }, ref) => (
			<button
				className="flex gap-[6px] items-center uppercase font-druk_wide text-[14px] leading-6"
				onClick={onClick}
				ref={ref}
			>
				Session
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 13V15H6V13H8ZM13 13V15H11V13H13ZM18 13V15H16V13H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"
						fill="#0F0F0F"
					/>
				</svg>
			</button>
		)
	);
	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => {
				setStartDate(date);
				dispatch(addSessionFrom(date));
			}}
			customInput={
				<ExampleCustomInput value={startDate ? startDate.toLocaleDateString() : ""} onClick={() => {}} />
			}
			dateFormat="dd-MM-yyyy"
			disabledKeyboardNavigation
		/>
	);
}

export default CustomDatePickerDesktop;
