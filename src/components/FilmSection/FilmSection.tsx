import Image from "next/image";
import Underline from "@/assets/primary_underline.svg";
import FilmsList from "../FilmsList/FilmsList";
import { useSelector } from "@/hooks";

function FilmSection() {
	return (
		<div className="px-4 py-10 desktop:px-[60px] desktop:py-20">
			<div className="uppercase font-druk_wide text-[24px] leading-[32px] desktop:text-[40px] desktop:leading-[48px] desktop:mb-10">
				our films
				<Image src={Underline} alt="Underline" className="w-full max-w-[228px] desktop:max-w-[366px]" />
			</div>
			<FilmsList />
		</div>
	);
}

export default FilmSection;
