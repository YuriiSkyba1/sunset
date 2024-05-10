"use client";

import { useDispatch, useSelector } from "@/hooks";
import { updateFilmViewFromStorage } from "@/redux/getFilmView/getFilmView";
import Link from "next/link";
import { useEffect } from "react";

function page() {
	const dispatch = useDispatch();
	const filmView = useSelector((state) => state.filmView);

	useEffect(() => {
		if (!filmView) {
			const filmViewFromStorage = JSON.parse(localStorage.getItem("filmView")!);
			dispatch(updateFilmViewFromStorage(filmViewFromStorage));
		}
	}, []);
	return (
		<div className="hidden text-[14px] leading-5 my-8 text-black_main desktop:flex gap-2 font-gotham_pro_regular px-[60px]">
			<Link href={"/"} className="flex items-center">
				Location
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M4.7168 11.0832L8.80013 6.99991L4.7168 2.91658L5.54175 2.09162L10.45 6.99991L5.54175 11.9082L4.7168 11.0832Z"
						fill="black"
					/>
				</svg>
			</Link>
			<Link href={`/location/${filmView.success?.movie.slug}`} className="flex items-center">
				{filmView.success?.movie.title}
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M4.7168 11.0832L8.80013 6.99991L4.7168 2.91658L5.54175 2.09162L10.45 6.99991L5.54175 11.9082L4.7168 11.0832Z"
						fill="black"
					/>
				</svg>
			</Link>
			<Link href={`/location/${filmView.success?.movie.slug}/checkout`}>
				<span className="flex items-center">
					Checkout
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
			<span className="opacity-50">Payment</span>
		</div>
	);
}

export default page;
