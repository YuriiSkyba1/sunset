import Image from "next/image";
import LeftArrow from "@/assets/films-section/left-arrow.svg";
import FilmsPaginationArrow from "../FilmsPaginationArrow/FilmsPaginationArrow";
import page from "@/app/page";

interface IFilmsPagination {
	totalPosts: number;
	postsPerPage: number;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function FilmsPagination({ totalPosts, postsPerPage, currentPage, setCurrentPage }: IFilmsPagination) {
	let pages: number[] = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pages.push(i);
	}

	const toPrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((currentPage = currentPage - 1));
		}
	};

	const toFirstPage = () => {
		if (currentPage > 1) {
			setCurrentPage((currentPage = 1));
		}
	};

	const handleShowMore = () => {
		if (pages.length > currentPage) {
			setCurrentPage((currentPage = currentPage + 1));
		}
	};

	const toLastPage = () => {
		if (currentPage !== pages.length) {
			setCurrentPage((currentPage = pages.length));
		}
	};

	return (
		<div className="flex flex-col items-center desktop:gap-4 gap-3 mt-8 desktop:mb-10">
			<button
				className="uppercase text-[12px] leading-[18px] font-druk_wide border border-primary px-[56px] py-[14px] desktop:px-[42px] desktop:py-[12px]"
				onClick={handleShowMore}
			>
				show more
			</button>
			<div className="flex gap-4">
				<div className="flex items-center gap-[6px]">
					<button disabled={currentPage === 1} onClick={toFirstPage}>
						<FilmsPaginationArrow isAvailable={currentPage != 1} direction="left" type="double" />
					</button>
					<button disabled={currentPage === 1} onClick={toPrevPage}>
						<FilmsPaginationArrow isAvailable={currentPage != 1} direction="left" type={"single"} />
					</button>
				</div>
				<div className="flex gap-4">
					{pages.map((page) => {
						return (
							<button
								key={page}
								onClick={() => setCurrentPage(page)}
								className={`${
									page === currentPage ? "text-primary underline" : ""
								} desktop:text-[18px] leading-[28px] font-gotham_pro_regular`}
							>
								{page}
							</button>
						);
					})}
				</div>
				<div className="flex items-center gap-[6px]">
					<button disabled={currentPage === pages.length} onClick={handleShowMore}>
						<FilmsPaginationArrow
							isAvailable={currentPage !== pages.length}
							direction="right"
							type="single"
						/>
					</button>
					<button disabled={currentPage === pages.length} onClick={toLastPage}>
						<FilmsPaginationArrow
							isAvailable={currentPage !== pages.length}
							direction="right"
							type="double"
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default FilmsPagination;
