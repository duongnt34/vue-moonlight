<template>
  <div
    class="relative !w-[200px] !h-[300px] hover:scale-105 hover:brightness-110 transition duration-300 cursor-pointer overflow-visible mx-auto"
    v-if="film"
    @click="viewFilm(film.id)"
  >
    <img
      v-if="film.poster_path"
      class="rounded-t-lg w-full h-full object-fit block"
      :src="`https://image.tmdb.org/t/p/w300/${film.poster_path}`"
      alt="Film Poster Path"
    />
    <div v-else class="rounded-t-lg w-full h-full object-fit flex justify-center items-center">
      <div class="w-5/6 flex flex-col items-center gap-3">
        <img class="w-20 h-20" :src="logoImg" alt="">
        <p class="text-gray-lighten text-sm">Sorry! This item does not have any images</p>
      </div>
    </div>
    <p
      class="bg-dark-lighten rounded-b-lg py-2 px-1 max-w-full w-full block text-ellipsis text-center whitespace-nowrap overflow-hidden text-gray-lighten"
    >
      {{ film.title ? film.title : film.name }}
    </p>
    <div
      class="absolute top-2 left-2 bg-primary text-white text-sm px-2 py-1 rounded-full"
    >
      <span class="mr-1">{{ film.vote_average?.toFixed(1) }}</span>
      <font-awesome-icon class="" icon="fa-solid fa-star" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useGeneralStore } from "../stores/GeneralStore";
import { ref } from "vue";
import logoImg from '../assets/logo.png'
const props = defineProps(["film"]);
const router = useRouter();
const generalStore = useGeneralStore();
const viewFilm = (id) => {
  if (props.film.media_type) {
    router.push({
      name: "FilmView",
      params: { filmType: props.film.media_type, id: id },
    });
  } else {
    router.push({
      name: "FilmView",
      params: { filmType: generalStore.currentFilmType, id: id },
    });
  }
};
</script>
