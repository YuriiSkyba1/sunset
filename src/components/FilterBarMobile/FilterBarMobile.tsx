import Image from "next/image";
import BotArrow from "@/assets/bot-arrow.svg";
import RightBlackArrow from "@/assets/right-black-arrow.svg";
import FilterIcon from "@/assets/films-section/filter-icon.svg";
import CloseIcon from "@/assets/films-section/close-icon.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/hooks";
import FIlmGenreCard from "../FIlmGenreCard/FIlmGenreCard";
import { addGenre, removeGenre, resetGenres } from "@/redux/getFilteredFilms/getGenersFilms";

function FilterBarMobile() {
	const [isFilterBarOpen, setFilterBarOpen] = useState<boolean>(false);
	const [genreIsOpen, setGenreIsOpen] = useState<boolean>(false);
	const [titleIsOpen, setTitleIsOpen] = useState<boolean>(false);
	const [sessionIsOpen, setSessionIsOpen] = useState<boolean>(false);

	const filters = useSelector((state) => state.locationView.success?.movies.filters);
	const arrayOfGenres = filters?.find((filter) => filter.name === "genre")?.values;
	const choosenGenres = useSelector((state) => state.genres);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isFilterBarOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isFilterBarOpen]);

	return (
		<div className="mt-4">
			<button
				className="w-full p-4 flex justify-between border border-grey_medium bg-[#F9F8F9]"
				onClick={() => setFilterBarOpen(true)}
			>
				<div className="flex gap-1">
					<Image src={FilterIcon} alt="FilterIcon" />
					<div className="font-druk_wide uppercase text-[14px] leading-6">FILTER</div>
				</div>
				<Image src={RightBlackArrow} alt="RightBlackArrow" />
			</button>

			<div
				className={`fixed flex flex-col justify-between z-30 top-0 left-0 min-h-svh bg-[#F9F8F9] desktop:hidden overflow-hidden`}
				style={{
					width: isFilterBarOpen ? "100%" : "0",
					overflow: "hidden",
					transition: "width 0.3s ease-in-out",
				}}
			>
				<div>
					<div className="flex justify-between py-6 px-4 border-b border-[#DFDDE3]">
						<div className="flex gap-1">
							<Image src={FilterIcon} alt="FilterIcon" />
							<div className="font-druk_wide uppercase text-[14px] leading-6">FILTER</div>
						</div>
						<button onClick={() => setFilterBarOpen(false)}>
							<Image src={CloseIcon} alt="CloseIcon" />
						</button>
					</div>

					<div className="py-6 border-b px-4 ">
						<button
							className="w-full flex justify-between items-center uppercase font-druk_wide text-[14px] leading-6"
							onClick={() => setGenreIsOpen(!genreIsOpen)}
						>
							film genre
							{genreIsOpen ? (
								<Image src={BotArrow} alt="BotArrow" className="rotate-180" />
							) : (
								<Image src={BotArrow} alt="BotArrow" className="" />
							)}
						</button>

						<div
							className={`flex gap-2 flex-wrap ${genreIsOpen ? "mt-3" : ""}`}
							style={{
								maxHeight: genreIsOpen ? "300px" : "0",
								overflow: "hidden",
								transition: "max-height 0.3s ease-in-out",
							}}
						>
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
					</div>
					<div className="py-6 border-b px-4 ">
						<button
							className="w-full flex justify-between items-center uppercase font-druk_wide text-[14px] leading-6"
							onClick={() => setTitleIsOpen(!titleIsOpen)}
						>
							Film title
							{titleIsOpen ? (
								<Image src={BotArrow} alt="BotArrow" className="rotate-180" />
							) : (
								<Image src={BotArrow} alt="BotArrow" className="" />
							)}
						</button>
					</div>
					<div className="py-6 border-b px-4 ">
						<button
							className="w-full flex justify-between items-center uppercase font-druk_wide text-[14px] leading-6"
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
				</div>

				{choosenGenres.filters.length > 0 && (
					<div className="w-full flex flex-col gap-4 px-4 mb-10">
						<div className="flex flex-col gap-[12px]">
							<div className="uppercase font-druk_wide text-[14px] leading-5 ">CHOOSEN</div>
							<div className="flex gap-1 flex-wrap">
								{choosenGenres.filters.map((filter) => (
									<FIlmGenreCard
										key={filter.id}
										value={filter.id}
										name={filter.name}
										isActive={true}
										handleOnClick={() =>
											dispatch(removeGenre({ id: filter.id, name: filter.name }))
										}
									/>
								))}
							</div>
							<div>
								<button
									className="underline font-gotham_pro_medium text-[12px] leading-5 capitalize px-[10px] py-[2px]"
									onClick={() => dispatch(resetGenres())}
								>
									Clean all filters
								</button>
							</div>
						</div>

						<button
							className="uppercase font-druk_wide py-[14px] w-full  text-[14px] leading-5 bg-primary"
							onClick={() => setFilterBarOpen(false)}
						>
							CONFIRM
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default FilterBarMobile;
