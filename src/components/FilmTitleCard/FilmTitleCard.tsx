import Image from "next/image";

interface IFIlmTitleCard {
	isActive?: boolean;
	name: string;
	handleOnClick?: (state: any) => void;
}

function FilmTitleCard({ isActive = false, name, handleOnClick }: IFIlmTitleCard) {
	return (
		<button
			className={`font-gotham_pro_regular text-[12px] leading-5 capitalize px-[10px] py-[2px]
			${isActive ? " bg-addition " : "bg-[#F9F7DB]"}
		`}
			key={name}
			onClick={handleOnClick}
		>
			{name}
		</button>
	);
}

export default FilmTitleCard;
