"use client";

import { useRouter } from "next/navigation";
import { Layout } from "@/enums";
import { withLayoutPage } from "@/hoc";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";

const HomePage = () => {
	const router = useRouter();
	useEffect(() => {
		router.push("/location");
	}, []);
	return (
		<div className="flex flex-col min-h-svh">
			<Header></Header>
			<div className="flex-1"></div>
			<Footer></Footer>
		</div>
	);
};

export default withLayoutPage({ PageComponent: HomePage, layoutType: Layout.Main });
