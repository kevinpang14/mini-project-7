import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
});

// API endpoints

export const getRecentPosts = () => API.get(`/games`);
export const getPosts = (page = 1) => API.get(`/games/news?page=${page}`);
export const getPostDetail = (slug) => API.get(`/detail/${slug}`);
export const subscribe = (email) => API.post("/subscribe", { email });

export default API;
