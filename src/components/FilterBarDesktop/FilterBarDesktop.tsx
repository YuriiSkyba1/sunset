import Image from "next/image";
import BotArrow from "@/assets/bot-arrow.svg";
import FilterIcon from "@/assets/films-section/filter-icon.svg";
import { useDispatch, useSelector } from "@/hooks";
import { useCallback, useState } from "react";
import FIlmGenreCard from "../FIlmGenreCard/FIlmGenreCard";
import { addGenre, addTitle, removeGenre, removeTitle, resetGenres } from "@/redux/getFilteredFilms/getGenersFilms";
import FilmTitleCard from "../FilmTitleCard/FilmTitleCard";
import _debounce from "lodash.debounce";

function FilterBar() {
	const filters = useSelector((state) => state.locationView.success?.movies?.filters);
	const arrayOfGenres = filters?.find((filter) => filter.name === "genre")?.values;

	const [genreIsOpen, setGenreIsOpen] = useState<boolean>(false);
	const [titleIsOpen, setTitleIsOpen] = useState<boolean>(false);
	const [sessionIsOpen, setSessionIsOpen] = useState<boolean>(false);
	const [inputTitle, setInputTitle] = useState<string>();

	const choosenFilters = useSelector((state) => state.genres);

	const dispatch = useDispatch();
	const filmsTitles = JSON.parse(localStorage.getItem("filmsTitles")!);

	const handleInputTitleChange = (event: any) => {
		const { value } = event.target;
		setInputTitle(value);
		handleInputChange(value);
	};
	const handleInputChange = useCallback(
		_debounce(async (value) => {
			console.log("Debounced title:", value);
			try {
				dispatch(addTitle(value));
			} catch (error) {
				console.error("Error submitting promocode:", error);
			}
		}, 2000),
		[]
	);

	return (
		<div>
			<div className="p-6 bg-[#F9F8F9] border border-grey_medium">
				<div className="flex gap-1 desktop:gap-2">
					<Image src={FilterIcon} alt="FilterIcon" />
					<div className="font-druk_wide uppercase text-[14px] leading-6 desktop:text-[18px]">FILTER</div>
				</div>
				{(choosenFilters.filters.genres.length > 0 || choosenFilters.filters.title) && (
					<div className="flex gap-4 mt-4">
						<div className="flex gap-1 ">
							{choosenFilters.filters.genres.map((filter) => (
								<FIlmGenreCard
									key={filter.id}
									value={filter.id}
									name={filter.name}
									isActive={true}
									handleOnClick={() => dispatch(removeGenre({ id: filter.id, name: filter.name }))}
								/>
							))}
						</div>
						<div className="flex gap-1 ">
							{/* {choosenFilters.filters.title.map((value) => (
								<FilmTitleCard
									name={value}
									key={value}
									handleOnClick={() => dispatch(removeTitle(value))}
									isActive={true}
								/>
							))} */}
							{choosenFilters.filters.title && (
								<FilmTitleCard
									name={choosenFilters.filters.title}
									handleOnClick={() => {
										dispatch(removeTitle(choosenFilters.filters.title));
										setInputTitle("");
									}}
									isActive={true}
								/>
							)}
						</div>
						<button
							className="font-gotham_pro_medium underline text-[12px] leading-5 capitalize px-[10px] py-[2px]"
							onClick={() => {
								dispatch(resetGenres());
								setInputTitle("");
							}}
						>
							Clean all filters
						</button>
					</div>
				)}
			</div>
			<div className="p-6 flex gap-10 bg-[#F9F8F9] border border-grey_medium border-t-0">
				<button
					className="flex gap-[6px] items-center uppercase font-druk_wide text-[14px] leading-6"
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
					className="flex gap-[6px] font-druk_wide items-center uppercase text-[14px] leading-6"
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
					className="flex gap-[6px] items-center uppercase font-druk_wide text-[14px] leading-6"
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
						isActive={choosenFilters.filters.genres.length === 0}
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
			{titleIsOpen && (
				<div className="flex gap-2 p-6 bg-[#F9F8F9] border border-grey_medium border-t-0">
					{/* {filmsTitles?.map((value: string) => (
						<FilmTitleCard name={value} key={value} handleOnClick={() => dispatch(addTitle(value))} />
					))} */}
					<input
						type="text"
						value={inputTitle as string}
						onChange={(event) => handleInputTitleChange(event)}
					></input>
				</div>
			)}
		</div>
	);
}

export default FilterBar;
