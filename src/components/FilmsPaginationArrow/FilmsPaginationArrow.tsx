import React from "react";

interface IFilmsPaginationArrow {
	isAvailable: boolean;
	direction: "right" | "left";
	type: "single" | "double";
}

export default function FilmsPaginationArrow({ isAvailable, direction, type }: IFilmsPaginationArrow) {
	return (
		<div className={`${direction === "left" ? "" : " rotate-180"}`}>
			{type === "single" && (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M8.9994 12L13.242 7.75732L14.6563 9.17154L11.8278 12L14.6563 14.8284L13.242 16.2426L8.9994 12Z"
						fill={`${isAvailable ? "#222222" : "#898C93"} `}
					/>
				</svg>
			)}
			{type === "double" && (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M5.34315 12.2427L9.58575 8L11 9.41422L8.17155 12.2427L11 15.0711L9.58575 16.4853L5.34315 12.2427Z"
						fill={`${isAvailable ? "#222222" : "#898C93"} `}
					/>
					<path
						d="M13.3432 12.4854L17.5857 8.24268L19 9.6569L16.1715 12.4854L19 15.3138L17.5857 16.728L13.3432 12.4854Z"
						fill={`${isAvailable ? "#222222" : "#898C93"} `}
					/>
				</svg>
			)}
		</div>
	);
}
