import { removeSessionFrom } from "@/redux/getFilteredFilms/getGenersFilms";
import Image from "next/image";
import { useDispatch } from "react-redux";

interface IFIlmSessionFrom {
	isActive?: boolean;
	date: Date;
}

function FIlmSessionCard({ isActive = false, date }: IFIlmSessionFrom) {
	const dispatch = useDispatch();
	function formatDate(date: Date) {
		// Retrieve the components of the date
		let year = date.getFullYear();
		let month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11
		let day = date.getDate().toString().padStart(2, "0");

		// Combine the components into the desired format
		return `${year}-${month}-${day}`;
	}
	const formatedDate = formatDate(date);

	return (
		<button
			className={`font-gotham_pro_regular text-[12px] leading-5 capitalize px-[10px] py-[2px]
			${isActive ? " bg-addition " : "bg-[#F9F7DB]"}
		`}
			key={formatedDate}
			onClick={() => {
				dispatch(removeSessionFrom());
			}}
		>
			{formatedDate}
		</button>
	);
}

export default FIlmSessionCard;
