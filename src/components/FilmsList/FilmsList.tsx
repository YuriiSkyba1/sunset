import React, { useState } from "react";
import { useSelector } from "@/hooks";
import FilmCard from "../FilmCard/FilmCard";
import FilmsPagination from "../FilmsPagination/FilmsPagination";
import FilterBar from "../FilterBar/FilterBar";

interface MoviesSchedule {
	[movieTitle: string]: MovieSchedule;
}

export interface MovieSchedule {
	[date: string]: string[];
}

function FilmsList() {
	const movies = useSelector((state) => state.genres.movies);

	const allMovies = useSelector((state) => state.locationView.success?.movies?.movies);

	const moviesSchedule: MoviesSchedule = {};

	allMovies?.forEach((event) => {
		const { title, events } = event;
		if (!moviesSchedule[title]) {
			moviesSchedule[title] = {};
		}
		events.forEach((event) => {
			const date = event.start_date.split(" ")[0];
			const time = event.start_date.split(" ")[1];
			if (!moviesSchedule[title][date]) {
				moviesSchedule[title][date] = [];
			}
			moviesSchedule[title][date].push(time);
		});
	});

	console.log("MovieSchedule", moviesSchedule);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [filmsPerPage, setFilmsPerPage] = useState<number>(12);

	const lastFilmIndex = currentPage * filmsPerPage;
	const firstFilmIndex = lastFilmIndex - filmsPerPage;

	const currentFilms = movies?.slice(firstFilmIndex, lastFilmIndex);

	console.log("currentFilms", currentFilms);

	return (
		<div>
			<FilterBar />
			<div className="grid pt-4 grid-cols-2 gap-x-3 gap-y-5 desktop:grid-cols-4 desktop:gap-6 items-stretch">
				{currentFilms?.map((movie, index) => (
					<FilmCard
						key={index}
						slug={movie.slug}
						poster={movie.poster}
						title={movie.title}
						age_rating={movie.age_rating}
						release_year={movie.release_year}
						genres={movie.genres}
						director={movie.director}
						movie_language={movie.movie_language}
						subtitle_language={movie.subtitle_language}
						duration={movie.duration}
						price_form={movie.price_from}
						description={movie.description}
						movieSchedule={moviesSchedule.hasOwnProperty(movie.title) ? moviesSchedule[movie.title] : {}}
					/>
				))}
			</div>
			{movies?.length > filmsPerPage && (
				<FilmsPagination
					totalPosts={movies?.length}
					postsPerPage={filmsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</div>
	);
}

export default FilmsList;
