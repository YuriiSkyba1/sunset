import { useSelector } from "@/hooks";
import Image from "next/image";
import Underline from "@/assets/primary_underline.svg";
import FilmCard from "../FilmCard/FilmCard";

interface MoviesSchedule {
	[movieTitle: string]: MovieSchedule;
}

export interface MovieSchedule {
	[date: string]: string[];
}

function SeeAlsoSection() {
	const seeAlso = useSelector((state) => state.filmView.success?.see_also);

	const seeAlsoFilms = seeAlso?.movies.slice(0, 4);

	const moviesSchedule: MoviesSchedule = {};

	seeAlsoFilms?.forEach((event) => {
		const { title, events } = event;
		if (!moviesSchedule[title]) {
			moviesSchedule[title] = {};
		}
		events.forEach((event) => {
			const dateObj = new Date(event.start_date);
			const date = dateObj.toLocaleDateString(); // Format the date
			const time = dateObj.toLocaleTimeString("en-US", {
				hour12: false,
				hour: "2-digit",
				minute: "2-digit",
			}); // Format the time
			if (!moviesSchedule[title][date]) {
				moviesSchedule[title][date] = [];
			}
			moviesSchedule[title][date].push(time);
		});
	});

	return (
		<div className="px-4 py-10 desktop:px-[60px] desktop:py-20">
			<div className="">
				<h1 className="text-[24px] leading-[32px] font-druk_wide uppercase desktop:text-[40px] desktop:leading-[48px]">
					SEE ALSO
				</h1>
				<Image src={Underline} alt="Underline" className="w-full max-w-[366px]" />
			</div>
			<div className="grid pt-4 grid-cols-2 gap-x-3 gap-y-5 mb-8 desktop:grid-cols-4 desktop:gap-6 items-stretch desktop:mb-10">
				{seeAlsoFilms?.map((movie, index) => (
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
		</div>
	);
}

export default SeeAlsoSection;
