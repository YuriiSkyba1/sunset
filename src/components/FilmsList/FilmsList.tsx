import React, { useState } from "react";
import { useSelector } from "@/hooks";
import FilmCard from "../FilmCard/FilmCard";
import { number } from "yup";
import FilmsPagination from "../FilmsPagination/FilmsPagination";
import FilterBar from "../FilterBar/FilterBar";

function FilmsList() {
	const movies = useSelector((state) => state.genres.movies);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [filmsPerPage, setFilmsPerPage] = useState<number>(12);

	const lastFilmIndex = currentPage * filmsPerPage;
	const firstFilmIndex = lastFilmIndex - filmsPerPage;

	const currentFilms = movies?.slice(firstFilmIndex, lastFilmIndex);

	return (
		<div>
			<FilterBar />
			<div className="grid pt-4 grid-cols-2 gap-x-3 gap-y-5 mb-8 desktop:grid-cols-4 desktop:gap-6 items-stretch desktop:mb-10">
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
						price_form={movie.price_form}
						description={movie.description}
					/>
				))}
			</div>
			<FilmsPagination
				totalPosts={movies?.length as number}
				postsPerPage={filmsPerPage}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}

export default FilmsList;
