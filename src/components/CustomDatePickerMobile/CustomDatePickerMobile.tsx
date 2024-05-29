import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "../CustomDatePicker/CustomDatePicker.css";
import { useDispatch, useSelector } from "@/hooks";
import { addSessionFrom } from "@/redux/getFilteredFilms/getGenersFilms";

function CustomDatePickerMobile({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
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

	const handleDateChange = (date: Date) => {
		setStartDate(date);
		dispatch(addSessionFrom(date));
		setIsOpen(false);
	};

	return (
		<DatePicker
			selected={startDate}
			onChange={handleDateChange}
			inline
			dateFormat="dd-MM-yyyy"
			disabledKeyboardNavigation
		/>
	);
}

export default CustomDatePickerMobile;
