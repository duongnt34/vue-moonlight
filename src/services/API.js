import axios from "axios";

const tmdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
  headers: {
    "Content-Type": `application/json;charset=utf-8`,
  },
});

export default tmdbAPI;
