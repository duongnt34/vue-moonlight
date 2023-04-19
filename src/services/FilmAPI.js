import tmdbAPI from "./API";

export default {
  getDiscover: (searchType, pageCounter, genreString) => {
    return tmdbAPI.get(`/discover/${searchType}`, {
      params: {
        language: "en-us",
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
        page: pageCounter,
        with_genres: genreString,
      },
    });
  },
  getSearch: (stringQuery, searchType, currentPage = 1) => {
    switch (searchType) {
      case "keyword":
        return tmdbAPI.get(`/search/keyword`, {
          params: {
            language: "en-us",
            query: `${stringQuery}`,
            page: currentPage,
          },
        });
      case "tv":
        return tmdbAPI.get(`/search/tv`, {
          params: {
            language: "en-us",
            query: `${stringQuery}`,
            page: currentPage,
          },
        });
      case "movie":
        return tmdbAPI.get(`/search/movie`, {
          params: {
            language: "en-us",
            query: `${stringQuery}`,
            page: currentPage,
          },
        });
      case "people":
        return tmdbAPI.get(`/search/person`, {
          params: {
            language: "en-us",
            query: `${stringQuery}`,
            page: currentPage,
          },
        });
      default:
        return tmdbAPI.get(`/search/multi`, {
          params: {
            language: "en-us",
            query: `${stringQuery}`,
            page: currentPage,
          },
        });
    }
  },
  getTrendingFilm: (filmType) => tmdbAPI.get(`/trending/${filmType}/week`),
  getFilmCredits: (filmType, filmId) =>
    tmdbAPI.get(`/${filmType}/${filmId}/credits`),
  getFilmReviews: (filmType, filmId) =>
    tmdbAPI.get(`/${filmType}/${filmId}/reviews`),
  getFilmVideos: (filmType, filmId) =>
    tmdbAPI.get(`/${filmType}/${filmId}/videos`),
  getListFilm: (filmType, listType) => tmdbAPI.get(`/${filmType}/${listType}`), //listType: popular, top_rated, ...
  getFilmImages: (filmType, filmId) =>
    tmdbAPI.get(`/${filmType}/${filmId}/images`),
  getEpisodesGroup: (tvId) => tmdbAPI.get(`/tv/${tvId}/episode_groups`),
};
