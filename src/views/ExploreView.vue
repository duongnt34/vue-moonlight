<template>
  <div class="mx-auto my-10 w-11/12 px-2">
    <section>
      <div class="flex text-gray-lighten gap-2">
        <button
          class="hover:text-white relative w-24 rounded-md duration-300 ease-in-out transition p-1"
          @click="changeCurrentFilmType('tv')"
          :class="{
            'bg-primary text-black': currentFilmType == `tv`,
          }"
          type="button"
        >
          <span>TV Shows</span>
        </button>
        <button
          class="hover:text-white relative w-24 rounded-md duration-300 ease-in-out transition p-1"
          @click="changeCurrentFilmType('movie')"
          :class="{
            'bg-primary text-black': currentFilmType == `movie`,
          }"
          type="button"
        >
          <span>Movies</span>
        </button>
      </div>
    </section>
    <section class="mt-5">
      <h2 class="text-white text-lg">Genres</h2>
      <ul class="flex gap-2 flex-wrap overflow-auto">
        <li v-for="(genre, index) in genresMap" :key="index">
          <button
            type="button"
            class="rounded-lg px-3 py-1 border-gray-lighten border text-sm"
            ref="genreRefs"
            @click="toggleGenre(genre[0])"
            :class="{
              'bg-primary text-white': selectedGenres.includes(genre[0]),
              'bg-transparent text-gray-lighten': !selectedGenres.includes(
                genre[0]
              ),
            }"
          >
            {{ genre[1] }}
          </button>
        </li>
      </ul>
    </section>

    <section ref="filmList">
      <ul class="result--section md:-mt-5" v-if="films.length">
        <li v-for="film in films" class="mt-14">
          <ThumbnailComponent :film="film"></ThumbnailComponent>
        </li>
      </ul>
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else class="text-gray-lighten text-lg text-center mt-10">
        <p>No results</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import ThumbnailComponent from "../components/ThumbnailComponent.vue";
import { useFetchGenresMap } from "../composables/useFetchGenresMap";
import { useGeneralStore } from "../stores/GeneralStore";

const films = ref([]);
const isLoading = ref(false);
const pageCounter = ref(1);
const genreRefs = ref([]);
const selectedGenres = ref([]);
const generalStore = useGeneralStore();
const { genresMovieMap, genresTVMap } = useFetchGenresMap();
const genresMap = computed(() => {
  if (generalStore.currentFilmType == "movie") {
    return genresMovieMap.value;
  } else {
    return genresTVMap.value;
  }
});
let currentFilmType = computed(() => {
  return generalStore.currentFilmType;
});
const changeCurrentFilmType = (type) => {
  generalStore.changeCurrentFilmType(type);
  pageCounter.value = 1;
  films.value = [];
  loadFilms(pageCounter.value);
};

const discoverUrl = computed(() => {
  return axios.create({
    baseURL: `https://api.themoviedb.org/3/discover/${currentFilmType.value}`,
    headers: {
      "Content-Type": `application/json;charset=utf-8`,
    },
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      page: pageCounter.value,
    },
  });
});

// Initial load
const getDiscoverFilms = async () => {
  isLoading.value = true;
  const res = await discoverUrl.value.get();
  films.value = [];
  res.data.results.forEach((film) => {
    films.value.push(film);
  });
  isLoading.value = false;
};

// Load on actions
const loadFilms = async (pageCounter, genreString) => {
  isLoading.value = true;
  const res = await discoverUrl.value.get("", {
    params: {
      with_genres: genreString,
      page: pageCounter,
    },
  });
  res.data.results.forEach((film) => {
    films.value.push(film);
  });
  isLoading.value = false;
};

const toggleGenre = (genreId) => {
  if (selectedGenres.value.includes(genreId)) {
    selectedGenres.value = selectedGenres.value.filter(
      (genre) => genre !== genreId
    );
  } else {
    selectedGenres.value.push(genreId);
  }
  films.value = [];
  let genreString = selectedGenres.value.join(",");
  loadFilms(1, genreString);
};

const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight && !isLoading.value) {
    pageCounter.value++;
    loadFilms(pageCounter.value);
  }
};

onMounted(() => {
  getDiscoverFilms();
  window.addEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.result--section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
}
</style>
