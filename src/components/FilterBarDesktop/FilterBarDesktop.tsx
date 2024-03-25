import Image from "next/image";
import BotArrow from "@/assets/bot-arrow.svg";
import FilterIcon from "@/assets/films-section/filter-icon.svg";
import { useDispatch, useSelector } from "@/hooks";
import { useState } from "react";
import FIlmGenreCard from "../FIlmGenreCard/FIlmGenreCard";
import { addGenre, removeGenre, resetGenres } from "@/redux/getFilteredFilms/getGenersFilms";

function FilterBar() {
	const filters = useSelector((state) => state.locationView.success?.movies.filters);
	const arrayOfGenres = filters?.find((filter) => filter.name === "genre")?.values;

	const [genreIsOpen, setGenreIsOpen] = useState<boolean>(false);
	const [titleIsOpen, setTitleIsOpen] = useState<boolean>(false);
	const [sessionIsOpen, setSessionIsOpen] = useState<boolean>(false);

	const choosenGenres = useSelector((state) => state.genres);
	const dispatch = useDispatch();

	return (
		<div>
			<div className="p-6 bg-[#F9F8F9] border border-grey_medium">
				<div className="flex gap-1 desktop:gap-2">
					<Image src={FilterIcon} alt="FilterIcon" />
					<div className="font-bold uppercase text-[14px] leading-6 desktop:text-[18px]">FILTER</div>
				</div>
				{choosenGenres.filters.length > 0 && (
					<div className="flex gap-4 mt-4">
						<div className="flex gap-1 ">
							{choosenGenres.filters.map((filter) => (
								<FIlmGenreCard
									key={filter.id}
									value={filter.id}
									name={filter.name}
									isActive={true}
									handleOnClick={() => dispatch(removeGenre({ id: filter.id, name: filter.name }))}
								/>
							))}
						</div>
						<button
							className="underline text-[12px] leading-5 capitalize px-[10px] py-[2px]"
							onClick={() => dispatch(resetGenres())}
						>
							Clean all filters
						</button>
					</div>
				)}
			</div>
			<div className="p-6 flex gap-10 bg-[#F9F8F9] border border-grey_medium border-t-0">
				<button
					className="flex gap-[6px] items-center uppercase font-bold text-[14px] leading-6"
					onClick={() => setGenreIsOpen(!genreIsOpen)}
				>
					film genre
					{genreIsOpen ? (
						<Image src={BotArrow} alt="BotArrow" className="rotate-180" />
					) : (
						<Image src={BotArrow} alt="BotArrow" className="" />
					)}
				</button>

				<button
					className="flex gap-[6px] items-center uppercase font-bold text-[14px] leading-6"
					onClick={() => setTitleIsOpen(!titleIsOpen)}
				>
					Film title
					{titleIsOpen ? (
						<Image src={BotArrow} alt="BotArrow" className="rotate-180" />
					) : (
						<Image src={BotArrow} alt="BotArrow" className="" />
					)}
				</button>
				<button
					className="flex gap-[6px] items-center uppercase font-bold text-[14px] leading-6"
					onClick={() => setSessionIsOpen(!sessionIsOpen)}
				>
					session
					{sessionIsOpen ? (
						<Image src={BotArrow} alt="BotArrow" className="rotate-180" />
					) : (
						<Image src={BotArrow} alt="BotArrow" className="" />
					)}
				</button>
			</div>
			{genreIsOpen && (
				<div className="flex gap-2 p-6 bg-[#F9F8F9] border border-grey_medium border-t-0">
					<FIlmGenreCard
						value={0}
						name="All"
						isActive={choosenGenres.filters.length === 0}
						handleOnClick={() => dispatch(resetGenres())}
					/>
					{arrayOfGenres?.map((value) => (
						<FIlmGenreCard
							value={value.id}
							name={value.name}
							key={value.id}
							handleOnClick={() => dispatch(addGenre({ id: value.id, name: value.name }))}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default FilterBar;
