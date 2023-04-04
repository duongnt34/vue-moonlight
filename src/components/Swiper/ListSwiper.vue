<template>
  <Swiper
    class="w-full list-swiper !px-2"
    :modules="modules"
    navigation
    :slides-per-view="'auto'"
    :watch-slides-progress="true"
    :space-between="30"
    :lazy="{ enabled: true, checkInView: true }"
    :preload-images="false"
    @swiper="onSwiper"
  >
    <template v-if="films">
      <SwiperSlide
        v-for="film in films.results"
        :key="film.id"
        class="py-2 !w-[175px] relative hover:scale-105 hover:brightness-110 transition duration-300 cursor-pointer overflow-visible"
        @click="viewFilm(film.id)"
      >
        <div class="">
          <img
            class="swiper-lazy rounded-t-lg !w-[175px]"
            :data-src="`https://image.tmdb.org/t/p/w200/${film.poster_path}`"
            alt="Film Poster Path"
          />
          <figcaption
            class="bg-dark-lighten rounded-b-lg py-2 px-1 flex items-center justify-center"
          >
            <p
              class="text-ellipsis whitespace-nowrap overflow-hidden text-gray-lighten"
            >
              {{ film.title ? film.title : film.name }}
            </p>
          </figcaption>
          <div
            class="absolute top-4 left-2 bg-primary text-white text-sm px-2 py-1 rounded-full"
          >
            <span class="mr-1">{{ film.vote_average?.toFixed(1) }}</span>
            <font-awesome-icon class="" icon="fa-solid fa-star" />
          </div>
        </div>
        <div class="swiper-lazy-preloader"></div>
      </SwiperSlide>
    </template>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Lazy, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import { useRouter } from "vue-router";
import { useGeneralStore } from "../../stores/GeneralStore";
import FilmAPI from "../../services/FilmAPI";

const modules = [Navigation, Lazy, Autoplay];

const props = defineProps(["listType"]);
const onSwiper = (swiper) => {};
const router = useRouter();
const generalStore = useGeneralStore();

const viewFilm = (id) => {
  router.push({
    name: "FilmView",
    params: { filmType: generalStore.currentFilmType, id: id },
  });
};

const fetchFilms = async () => {
  try {
    if (generalStore.currentFilmType == null) {
      const res = await FilmAPI.getListFilm("tv", props.listType);
      generalStore.changeCurrentFilmType("tv");
      return res.data;
    } else {
      const res = await FilmAPI.getListFilm(
        generalStore.currentFilmType,
        props.listType
      );
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
const films = await fetchFilms();
</script>

<style lang="scss">
.list-swiper {
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 20px;
    font-weight: bolder;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 20px !important;
    border-radius: 50%;
    color: #fff;
  }
}
</style>
