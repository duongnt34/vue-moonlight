//Get genres from API and store in a map

import { ref } from "vue";
import axios from "axios";

export const useFetchGenresMap = () => {
  const genresMap = ref(new Map());
  const genresTVMap = ref(new Map());
  const genresMovieMap = ref(new Map());
  const getGenresMap = async () => {
    try {
      const movieGenres = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=24f589f067b82514c67395b54c2c2b42`
      );
      movieGenres.data.genres.forEach((el) => {
        if (!genresMap.value.get(el.id)) {
          genresMap.value.set(el.id, el.name);
          genresMovieMap.value.set(el.id, el.name);
        }
      });

      const tvGenres = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=24f589f067b82514c67395b54c2c2b42`
      );
      tvGenres.data.genres.forEach((el) => {
        if (!genresMap.value.get(el.id)) {
          genresMap.value.set(el.id, el.name);
          genresTVMap.value.set(el.id, el.name);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  getGenresMap();

  return { genresMap, genresMovieMap, genresTVMap };
};
