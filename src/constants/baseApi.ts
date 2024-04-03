import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://api.sunsetcinema.in-create.online/api/",
});

export default apiClient;
