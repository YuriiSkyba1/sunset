import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { MovieSchedule } from "../FilmsList/FilmsList";
import FilmCardSelectDropdown from "../FilmCardSelectDropdown/FilmCardSelectDropdown";
import { compose } from "@reduxjs/toolkit";

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
	movieSchedule: MovieSchedule;
}

function FilmCard({ title, poster, slug, movieSchedule }: IFilmCard) {
	const router = useRouter();
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [selectedTime, setSelectedTime] = useState<string>("");

	console.log("Movie Schedule From Card", title, " : ", movieSchedule);
	console.log("movieSchedule[title]", movieSchedule);

	console.log("selectedDate", selectedDate);

	const filterNeededTime = (selectedDate: string) => {
		if (movieSchedule.hasOwnProperty(selectedDate)) {
			return movieSchedule[selectedDate];
		} else return [""];
	};

	return (
		<div onClick={() => router.push(`/location/${slug}`)}>
			<div
				className="w-full desktop:max-w-[312px] h-full desktop:relative desktop:overflow-hidden "
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={{ cursor: isHovered ? "pointer" : "default" }}
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
						<div className="uppercase font-druk_wide text-[10px] leading-4 desktop:text-[14px] desktop:leading-5">
							{title}
						</div>
						{movieSchedule && (
							<div className="flex flex-col gap-2 desktop:flex-row desktop:justify-between">
								<FilmCardSelectDropdown
									selectedItem={selectedDate}
									setSelectedItem={setSelectedDate}
									arrayData={Object.keys(movieSchedule).map((key) => key)}
									label="Date"
								/>
								<FilmCardSelectDropdown
									selectedItem={selectedTime}
									setSelectedItem={setSelectedTime}
									arrayData={selectedDate !== "" ? filterNeededTime(selectedDate) : [""]}
									label="Time"
								/>
								{/* <div>
								<p className="font-gotham_pro_regular text-xs leading-3 p-2 desktop:text-[16px] desktop:leading-[22px]">
									Date:
								</p>
								<p className="font-gotham_pro_bold text-xs leading-3 bg-addition px-2 py-1 desktop:px-2 desktop:text-[16px] desktop:leading-[22px]">
									Mon, 2 November
								</p>
							</div>
							<div className="w-fit">
								<p className="font-gotham_pro_regular text-xs leading-3 p-2 desktop:text-[16px] desktop:leading-[22px]">
									Time:
								</p>
								<p className="font-gotham_pro_bold text-xs leading-3 bg-addition px-2 py-1 desktop:px-2 desktop:text-[16px] desktop:leading-[22px] ">
									19 : 00
								</p>
							</div> */}
							</div>
						)}
					</div>
					<button className="desktop:hidden uppercase font-druk_wide w-full border text-[10px] leading-3 border-black_main bg-primary text-black_main max-h-10 py-[14px]">
						buy a ticket
					</button>
				</div>

				<button
					className={`max-desktop:hidden uppercase font-druk_wide w-full border-black_main bg-primary text-black_main desktop:text-white desktop:text-xs desktop:leading-[18px] 
    							desktop:absolute bottom-0 left-0 ${
									isHovered
										? "h-[50px] desktop:py-[13px] border"
										: "h-[0px]  desktop:py-[0px] border-none"
								}`}
					style={{ transition: "height 0.2s ease-in-out, padding 0.2s ease-in-out, border 0.2s ease-in-out" }}
				>
					buy a ticket
				</button>
			</div>
		</div>
	);
}

export default FilmCard;
