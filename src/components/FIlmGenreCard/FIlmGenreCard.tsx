import Image from "next/image";

interface IFIlmGenreCard {
	isActive?: boolean;
	value: number;
	name: string;
	handleOnClick?: (state: any) => void;
}

function FIlmGenreCard({ isActive = false, value, name, handleOnClick }: IFIlmGenreCard) {
	return (
		<button
			className={`text-[12px] leading-5 capitalize px-[10px] py-[2px]
			${isActive ? " bg-addition " : "bg-[#F9F7DB]"}
		`}
			key={value}
			onClick={handleOnClick}
		>
			{name}
		</button>
	);
}

export default FIlmGenreCard;
