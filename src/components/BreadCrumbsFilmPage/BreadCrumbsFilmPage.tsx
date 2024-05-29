"use client";

import { useDispatch, useSelector } from "@/hooks";
import { updateFilmViewFromStorage } from "@/redux/getFilmView/getFilmView";
import Link from "next/link";
import { useEffect } from "react";

function BreadCrumbsFilmPage() {
	const dispatch = useDispatch();
	const filmView = useSelector((state) => state.filmView);

	useEffect(() => {
		if (!filmView) {
			const filmViewFromStorage = JSON.parse(localStorage.getItem("filmView")!);
			dispatch(updateFilmViewFromStorage(filmViewFromStorage));
		}
	}, []);
	return (
		<div className="text-[14px] leading-5 my-8 text-black_main flex gap-2 font-gotham_pro_regular px-[14px] desktop:px-[60px] flex-wrap">
			<Link href={"/"} className="flex items-center">
				Homepage
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M4.7168 11.0832L8.80013 6.99991L4.7168 2.91658L5.54175 2.09162L10.45 6.99991L5.54175 11.9082L4.7168 11.0832Z"
						fill="black"
					/>
				</svg>
			</Link>
			<Link href={`/location`}>
				<span className="flex items-center">
					Location
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M4.7168 11.0832L8.80013 6.99991L4.7168 2.91658L5.54175 2.09162L10.45 6.99991L5.54175 11.9082L4.7168 11.0832Z"
							fill="black"
						/>
					</svg>
				</span>
			</Link>

			{filmView.success?.movie?.slug && (
				<Link href={`/location/${filmView.success?.movie.slug}`} className="flex items-center opacity-50">
					{filmView.success?.movie.title}
				</Link>
			)}
		</div>
	);
}

export default BreadCrumbsFilmPage;
