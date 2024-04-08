import React from "react";

interface IDateSessionCard {
	title: string;
	isActive: boolean;
	onClick: () => void;
}

function DateSessionCard({ title, isActive, onClick }: IDateSessionCard) {
	const buttonStyles = {
		common: " bg-pink_light",
		active: " bg-primary",
	};

	return (
		<button
			onClick={onClick}
			className={` py-[2px] px-[10px] text-[12px] leading-5 ${
				isActive ? buttonStyles.active : buttonStyles.common
			}`}
		>
			{title}
		</button>
	);
}

export default DateSessionCard;
