<template>
  <swiper
    class="rounded-lg"
    :lazy="true"
    :preload-images="false"
    :modules="modules"
    :slides-per-view="1"
    :loop="false"
    navigation
    :autoplay="{ delay: 5000, disableOnInteraction: false }"
  >
    <swiper-slide v-for="film in trendingFilms">
      <div
        class="relative w-full pt-[45%] cursor-pointer"
        @click="viewFilm(film.id)"
      >
        <img
          class="absolute top-0 swiper-lazy"
          :data-src="`https://image.tmdb.org/t/p/original/${film.backdrop_path}`"
          alt=""
        />
        <div class="swiper-lazy-preloader">
          <img src="../../assets/logo.png" alt="" />
        </div>
        <div
          class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black"
        >
          <div class="md:w-5/12 md:pl-10 pl-2 h-full flex items-center">
            <div>
              <div
                class="text-2xl md:text-5xl md:mb-7 text-primary font-semibold"
              >
                <span>{{ film.title ? film.title : film.name }}</span>
              </div>
              <div class="text-white text-sm md:text-2xl">
                <span>{{ film.title ? film.title : film.name }}</span>
              </div>
              <div class="text-gray-lighten text-sm md:text-base">
                <span
                  >Release date:
                  {{
                    film.release_date ? film.release_date : film.first_air_date
                  }}</span
                >
              </div>
              <div
                class="md:flex gap-3 text-gray-lighten text-sm md:text-base md:mt-7 md:mb-3 hidden"
              >
                <button
                  v-for="genreId in film.genre_ids"
                  class="rounded-lg px-3 pt-1 border-gray-lighten border"
                >
                  {{ genresMap.get(genreId) }}
                </button>
              </div>
              <div class="text-gray-lighten hidden md:block">
                <p class="line-clamp-3">{{ film.overview }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Play button -->
        <!-- <div
          class="absolute bottom-4 left-2 md:left-10 bg-transparent z-50 flex"
        >
          <button
            class="rounded-lg px-3 pt-1 border-gray-lighten border text-gray-lighten"
            @click="viewFilm(film.id)"
          >
            View more...
          </button>
        </div> -->
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay, Lazy } from "swiper";
import "swiper/css";
import { ref } from "vue";
import { useFetchGenresMap } from "../../composables/useFetchGenresMap.js";
import { useGeneralStore } from "../../stores/GeneralStore";
import FilmAPI from "../../services/FilmAPI.js";
import { useRouter } from "vue-router";

const modules = [Navigation, Autoplay, Lazy];

const router = useRouter();
const { genresMap } = useFetchGenresMap();
const generalStore = useGeneralStore();
let trendingFilms = ref([]);
const viewFilm = (id) => {
  router.push({
    name: "FilmView",
    params: { filmType: generalStore.currentFilmType, id: id },
  });
};
const getTrendingFilms = async () => {
  try {
    if (generalStore.currentFilmType == null) {
      const res = await FilmAPI.getTrendingFilm("tv");
      generalStore.changeCurrentFilmType("tv");
      res.data.results.forEach((film) => {
        trendingFilms.value.push(film);
      });
    } else {
      const res = await FilmAPI.getTrendingFilm(generalStore.currentFilmType);
      res.data.results.forEach((film) => {
        trendingFilms.value.push(film);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
getTrendingFilms();
</script>

<style scoped>
.swiper-lazy-preloader {
  /* animation: none !important; */
  /* display: none !important; */
  content: none;
}
.swiper-lazy-preloader:after {
  display: none !important;
  content: none;
}
</style>
