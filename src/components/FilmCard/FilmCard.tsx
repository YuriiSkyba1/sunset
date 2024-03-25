import Image from "next/image";
import FilmPoster from "@/assets/films-section/joker-poster.jpg";
import { useState } from "react";

interface IFilmCard {
	slug: string;
	poster: string;
	title: string;
	age_rating: string;
	release_year: number;
	genres: { id: number; name: string }[];
	director: string;
	movie_language: { name: string; iso_code: string; is_default: boolean; is_current: boolean };
	subtitle_language: { name: string; iso_code: string; is_default: boolean; is_current: boolean };
	duration: string;
	price_form: number;
	description: string;
}

function FilmCard({ title, poster }: IFilmCard) {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<div
			className="w-full desktop:max-w-[312px] desktop:relative desktop:overflow-hidden "
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className={` desktop:relative h-full flex flex-col items-stretch ${
					isHovered ? "-top-[50px]" : "top-0"
				} left-0 overflow-hidden `}
				style={{ transition: "top 0.2s ease-in-out" }}
			>
				<div className="flex-1">
					<Image
						src={poster}
						alt={title}
						width={168}
						height={200}
						layout="responsive"
						unoptimized={true}
						loading="lazy"
					/>
				</div>
				<div className="p-[10px] gap-3 flex flex-1 flex-col justify-between border border-grey_medium desktop:gap-4 desktop:p-6 ">
					<div className="uppercase font-bold text-[10px] leading-4 desktop:text-[14px] desktop:leading-5">
						{title}
					</div>
					<div className="flex flex-col gap-2 desktop:flex-row desktop:justify-between">
						<div>
							<p className="text-xs leading-3 p-2 desktop:text-xs desktop:leading-3">Date:</p>
							<p className="text-xs leading-3 font-bold bg-addition px-2 py-1 desktop:px-2 desktop:text-[16px] desktop:leading-[22px]">
								Mon, 2 November
							</p>
						</div>
						<div className="w-fit">
							<p className="text-xs leading-3 p-2 desktop:text-xs desktop:leading-3">Time:</p>
							<p className="text-xs leading-3 font-bold bg-addition px-2 py-1 desktop:px-2 desktop:text-[16px] desktop:leading-[22px] ">
								19 : 00
							</p>
						</div>
					</div>
				</div>
				<button className="desktop:hidden uppercase font-bold w-full border text-[10px] leading-3 border-black_main bg-primary text-black_main max-h-10 py-[14px]">
					buy a ticket
				</button>
			</div>

			<button
				className={`max-desktop:hidden uppercase font-bold w-full  border-black_main bg-primary text-black_main desktop:text-white desktop:text-xs desktop:leading-[18px] 
    desktop:absolute bottom-0 left-0 ${
		isHovered ? "h-[50px] desktop:py-[13px] border" : "h-[0px]  desktop:py-[0px] border-none"
	}`}
				style={{ transition: "height 0.2s ease-in-out, padding 0.2s ease-in-out, border 0.2s ease-in-out" }}
			>
				buy a ticket
			</button>
		</div>
	);
}

export default FilmCard;
