import tmdbAPI from "./API";

export default {
  getMultiSearch: (stringQuery) =>
    tmdbAPI.get(`/search/multi`, {
      params: {
        language: "en-us",
        page: 1,
        query: `${stringQuery}`,
      },
    }),
  getTrendingFilm: (filmType) => tmdbAPI.get(`/trending/${filmType}/week`),
  getFilmCredits: (filmType, filmId) =>
    tmdbAPI.get(`/${filmType}/${filmId}/credits`),
  getFilmReviews: (filmType, filmId) =>
    tmdbAPI.get(`/${filmType}/${filmId}/reviews`),
  getFilmVideos: (filmType, filmId) =>
    tmdbAPI.get(`/${filmType}/${filmId}/videos`),
  getListFilm: (filmType, listType) => tmdbAPI.get(`/${filmType}/${listType}`), //listType: popular, top_rated, ...
};
