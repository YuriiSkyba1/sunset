import { useSelector } from "@/hooks";
import Image from "next/image";
import SessionSelection from "../SessionSelection/SessionSelection";

function AboutFilmSection() {
	const filmData = useSelector((state) => state.filmView.success?.movie);

	return (
		<div className="flex py-10 max-desktop:flex-col gap-6 desktop:px-[60px] desktop:py-20">
			<div className="desktop:max-w-[312px] desktop:max-h-[374px] max-desktop:flex max-desktop:justify-center">
				<Image
					src={filmData?.poster ? filmData?.poster : ""}
					alt="film poster"
					width={312}
					height={374}
					unoptimized={true}
					loading="lazy"
				/>
			</div>

			<div className="flex flex-col gap-20 desktop:gap-10 w-full max-w-[536px]">
				<div className="flex flex-col gap-6">
					<h3 className="max-desktop:px-4 text-[14px] leading-6 desktop:text-[18px] desktop:leading-6 font-druk_wide uppercase">
						{filmData?.title}
					</h3>
					<div className="max-desktop:px-4 grid grid-cols-2 gap-y-[12px] gap-x-[50px] font-gotham_pro_regular text-[14px] leading-[22px] desktop:text-[16px] desktop:leading-6">
						<span className="text-grey_dark">Age</span>
						<span>{filmData?.age_rating}</span>
						<span className="text-grey_dark">Year:</span>
						<span>{filmData?.release_year}</span>
						<span className="text-grey_dark">Film genre:</span>
						<span>{filmData?.genres.map((genre) => genre.name).join(", ")}</span>
						<span className="text-grey_dark">Directed by:</span>
						<span>{filmData?.director}</span>
						<span className="text-grey_dark">Language:</span>
						<span>{filmData?.movie_language.name}</span>
						<span className="text-grey_dark">Subtitles:</span>
						<span>{filmData?.subtitle_language.name}</span>
						<span className="text-grey_dark">Duration of the movie:</span>
						<span>{filmData?.duration}</span>
					</div>
					<div className="w-full desktop:max-w-[312px] p-[12px] bg-pink_light border border-black_main text-[12px] leading-[18px] uppercase font-druk_wide flex justify-between ">
						<span>Price from:</span>
						<span>{filmData?.price_form} $</span>
					</div>
				</div>
				<div className="max-desktop:px-4 flex flex-col gap-4 desktop:gap-6">
					<h3 className="text-[14px] leading-[14px] desktop:text-[18px] desktop:leading-[22px] font-druk_wide uppercase">
						Description
					</h3>
					<div className="font-gotham_pro_regular text-[14px] leading-[22px] max-desktop:mt-4">
						{filmData?.description}
					</div>
				</div>
			</div>
			<SessionSelection />
		</div>
	);
}

export default AboutFilmSection;
