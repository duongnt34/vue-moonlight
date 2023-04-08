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
  getKeywordSearch: (stringQuery) =>
    tmdbAPI.get(`/search/keyword`, {
      params: {
        language: "en-us",
        query: `${stringQuery}`,
      },
    }),
  getTvSearch: (stringQuery) =>
    tmdbAPI.get(`/search/tv`, {
      params: {
        language: "en-us",
        query: `${stringQuery}`,
      },
    }),
  getMovieSearch: (stringQuery) =>
    tmdbAPI.get(`/search/movie`, {
      params: {
        language: "en-us",
        query: `${stringQuery}`,
      },
    }),
  getPeopleSearch: (stringQuery) =>
    tmdbAPI.get(`/search/person`, {
      params: {
        language: "en-us",
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
