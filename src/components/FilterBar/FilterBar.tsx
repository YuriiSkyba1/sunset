import { useDispatch, useSelector } from "@/hooks";
import { useEffect, useMemo } from "react";

import { getFilters } from "@/redux/getFilteredFilms/getGenersFilms";
import { fetchFilteredMovies } from "@/redux/getFilteredFilms/movieService";
import FilterBarMobile from "../FilterBarMobile/FilterBarMobile";
import FilterBarDesktop from "../FilterBarDesktop/FilterBarDesktop";

function FilterBar() {
	const choosenFilters = useSelector(getFilters);

	const stableChoosenFilters = useMemo(() => choosenFilters, [JSON.stringify(choosenFilters)]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchFilteredMovies(stableChoosenFilters));
	}, [stableChoosenFilters, dispatch]);
	return (
		<div>
			<div className="desktop:hidden">
				<FilterBarMobile />
			</div>
			<div className="hidden desktop:block">
				<FilterBarDesktop />
			</div>
		</div>
	);
}

export default FilterBar;
