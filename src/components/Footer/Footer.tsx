"use client";

import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

function Footer() {
	return (
		<footer className="border-t">
			<FooterDesktop />
			<FooterMobile />
		</footer>
	);
}

export default Footer;
