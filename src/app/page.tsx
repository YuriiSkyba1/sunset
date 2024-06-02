"use client";

import { useRouter } from "next/navigation";
import { Layout } from "@/enums";
import { withLayoutPage } from "@/hoc";
import { useEffect, useCallback } from "react";

const HomePage = () => {
	const router = useRouter();

	const redirectToLocation = useCallback(() => {
		router.push("/location");
	}, [router]);

	useEffect(() => {
		redirectToLocation();
	}, [redirectToLocation]);

	return (
		<div className="flex flex-col min-h-svh">
			<div className="flex-1"></div>
		</div>
	);
};

export default withLayoutPage({ PageComponent: HomePage, layoutType: Layout.Main });
