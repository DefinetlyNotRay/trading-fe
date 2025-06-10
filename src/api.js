import axios from "axios";

const api = axios.create({
	baseURL: "trading-be-production.up.railway.app",
});

export default api;
