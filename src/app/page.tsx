import { Metadata } from "next";
import { Layout } from "@/enums";
import { withLayoutPage } from "@/hoc";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PopUpCountry from "@/components/PopUpCountry/PopUpCountry";

export const metadata: Metadata = {
	title: "Home page",
	description: "Home page description",
};

const HomePage = () => (
	<div className="flex flex-col min-h-svh">
		<Header></Header>
		<PopUpCountry />
		<div className="flex-1"></div>
		<Footer></Footer>
	</div>
);

export default withLayoutPage({ PageComponent: HomePage, layoutType: Layout.Main });
