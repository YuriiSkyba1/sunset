import Image from "next/image";
import BotArrow from "@/assets/bot-arrow.svg";
import FilterIcon from "@/assets/films-section/filter-icon.svg";
import { useDispatch, useSelector } from "@/hooks";
import { useEffect, useRef, useState } from "react";
import FIlmGenreCard from "../FIlmGenreCard/FIlmGenreCard";
import { addGenre, addTitle, removeGenre, removeTitle, resetGenres } from "@/redux/getFilteredFilms/getGenersFilms";
import FilmTitleCard from "../FilmTitleCard/FilmTitleCard";
import _debounce from "lodash.debounce";
import CustomDatePicker from "../CustomDatePicker/CustomDatePickerDesktop";
import FIlmSessionCard from "../FilmSessionCard/FilmSessionCard";
import styles from "./FilterBarDesktop.module.css";

function FilterBarDesktop() {
	const dispatch = useDispatch();

	const filters = useSelector((state) => state.locationView.success?.movies?.filters);
	const arrayOfGenres = filters?.find((filter) => filter.name === "genre")?.values;
	const choosenFilters = useSelector((state) => state.genres);

	const [genreIsOpen, setGenreIsOpen] = useState<boolean>(false);
	const [inputTitle, setInputTitle] = useState<string>("");
	const [choosenTitle, setChoosenTitle] = useState<string>("");
	const [filteredTitles, setFilteredTitles] = useState<string[]>([]);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);
	const [movieTitles, setMovieTitles] = useState<string[]>([]);
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
	const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

	useEffect(() => {
		const storedTitles = localStorage.getItem("filmsTitles");
		if (storedTitles) {
			setMovieTitles(JSON.parse(storedTitles) as string[]);
		}
	}, []);

	useEffect(() => {
		if (focusedIndex !== null && itemRefs.current[focusedIndex]) {
			itemRefs.current[focusedIndex]?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [focusedIndex]);

	useEffect(() => {
		setFocusedIndex(0);
	}, [filteredTitles]);

	useEffect(() => {
		if (inputTitle) {
			handleInputChange(inputTitle);
		} else {
			handleInputChange(inputTitle);
		}
	}, [choosenTitle, setChoosenTitle]);

	const handleInputTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const userInput = event.target.value;
		setInputTitle(userInput);

		if (userInput) {
			const filtered = movieTitles.filter((title) => title.toLowerCase().includes(userInput.toLowerCase()));
			setFilteredTitles(filtered);

			setShowDropdown(true);
		} else {
			setShowDropdown(false);
		}
	};

	const handleSelectTitle = (title: string) => {
		setChoosenTitle(title);
		setInputTitle(title);
		setShowDropdown(false);
	};

	const handleInputChange = (value: string) => {
		try {
			dispatch(addTitle(value));
		} catch (error) {
			console.error("Error submitting promocode:", error);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!showDropdown || filteredTitles.length === 0) return;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				setFocusedIndex((prevIndex) =>
					prevIndex === null || prevIndex === filteredTitles.length - 1 ? 0 : prevIndex + 1
				);
				break;
			case "ArrowUp":
				event.preventDefault();
				setFocusedIndex((prevIndex) =>
					prevIndex === null || prevIndex === 0 ? filteredTitles.length - 1 : prevIndex - 1
				);
				break;
			case "Enter":
				if (focusedIndex !== null) {
					event.preventDefault();
					handleSelectTitle(filteredTitles[focusedIndex]);
					setFocusedIndex(null);
				}
				break;
			case "Escape":
				setFocusedIndex(null);
				break;
			default:
				break;
		}
	};

	const handleMouseEnter = (index: number) => {
		setFocusedIndex(index);
	};

	const handleMouseLeave = () => {
		setFocusedIndex(null);
	};

	return (
		<div>
			<div className="p-6 bg-[#F9F8F9] border border-grey_medium">
				<div className="flex gap-1 desktop:gap-2">
					<Image src={FilterIcon} alt="FilterIcon" />
					<div className="font-druk_wide uppercase text-[14px] leading-6 desktop:text-[18px]">FILTER</div>
				</div>
				{(choosenFilters.filters.genres.length > 0 ||
					choosenFilters.filters.title ||
					choosenFilters.filters.session_from) && (
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
							{choosenFilters.filters.title && (
								<FilmTitleCard
									name={choosenFilters.filters.title}
									handleOnClick={() => {
										dispatch(removeTitle(choosenFilters.filters.title));
										setShowDropdown(false);
										setChoosenTitle("");
										setInputTitle("");
									}}
									isActive={true}
								/>
							)}
							{choosenFilters.filters.session_from && (
								<FIlmSessionCard date={new Date(choosenFilters.filters.session_from)} isActive />
							)}
						</div>
						<button
							className="font-gotham_pro_medium underline text-[12px] leading-5 capitalize px-[10px] py-[2px]"
							onClick={() => {
								dispatch(resetGenres());
								setShowDropdown(false);
								setChoosenTitle("");
								setInputTitle("");
							}}
						>
							Clean all filters
						</button>
					</div>
				)}
			</div>
			<div className="p-6 flex items-center gap-10 bg-[#F9F8F9] border border-grey_medium border-t-0">
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

				<CustomDatePicker></CustomDatePicker>
				<div className="relative w-full max-w-[377px] ">
					<input
						type="text"
						value={inputTitle as string}
						onChange={(event) => handleInputTitleChange(event)}
						onKeyDown={handleKeyDown}
						className="px-4 py-2 font-druk_wide w-full border border-[#00000023] uppercase text-[14px] leading-6"
						placeholder="FILM TITLE..."
					></input>
					{showDropdown && (
						<ul
							className={`absolute w-full bg-white font-druk_wide border border-[#00000023] max-h-[120px] overflow-y-auto z-20 uppercase text-[14px] leading-6 rounded-b-lg ${styles.customScrollbar}`}
						>
							{filteredTitles.map((title, index) => (
								<li
									key={index}
									ref={(el) => (itemRefs.current[index] = el)}
									className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
										focusedIndex === index ? "bg-primary" : ""
									}`}
									onClick={() => handleSelectTitle(title)}
									onMouseEnter={() => handleMouseEnter(index)}
									onMouseLeave={handleMouseLeave}
								>
									{title}
								</li>
							))}
						</ul>
					)}
				</div>
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
		</div>
	);
}

export default FilterBarDesktop;
