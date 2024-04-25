import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log("Received request:", req.body);
	if (req.method === "POST") {
		const { promocode } = req.body;
		console.log("Preparing to send request to external API for promocode:", promocode);
		try {
			const apiResponse = await axios.post(
				`https://api.sunsetcinema.in-create.online/api/en/cart/promocode/${promocode}`,
				{},
				{
					headers: { Cookie: req.headers.cookie }, // Forward the client's cookie to the external API
				}
			);
			console.log("External API response:", apiResponse.data);

			if (apiResponse.headers["set-cookie"]) {
				res.setHeader("Set-Cookie", apiResponse.headers["set-cookie"]);
			}

			res.status(200).json(apiResponse.data);
		} catch (error) {
			console.error("Error posting to external API:", error.message);
			if (error.response) {
				console.error("External API returned an error:", error.response.status, error.response.data);
				res.status(error.response.status).json({
					message: "Failed to use promocode",
					details: error.response.data,
				});
			} else {
				res.status(500).json({ message: "Server error", details: error.message });
			}
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end("Method Not Allowed");
	}
}
