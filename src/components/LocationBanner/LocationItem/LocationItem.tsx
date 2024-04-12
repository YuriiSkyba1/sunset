import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

interface ILocationItem {
	title: string;
	photo: string;
	slug: string;
	isHovered: Dispatch<SetStateAction<string>>;
}

const styles = {
	active: "pb-5 border-b-[1px] font-bold",
	notActive: "py-5 border-b-[1px] font-bold text-black_main text-opacity-50",
};

function LocationItem({ title, photo, slug, isHovered }: ILocationItem) {
	return (
		<div
			className=" pb-5 border-b-[1px] font-bold text-black_main "
			onMouseEnter={() => isHovered(photo)}
			onMouseLeave={() => isHovered("")}
		>
			<Link href={`/location`}>{title}</Link>
		</div>
	);
}

export default LocationItem;
