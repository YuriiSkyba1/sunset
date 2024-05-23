import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const response = await axios.get("https://ipapi.co/json/");
		res.status(200).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Error fetching data" });
	}
}
