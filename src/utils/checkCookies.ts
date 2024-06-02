import Cookies from "js-cookie";

export const checkCookie = (cookieName: string) => {
	return !!Cookies.get(cookieName);
};
