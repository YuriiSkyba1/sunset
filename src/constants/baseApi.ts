import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://sunset.loc/api",
});

export default apiClient;
