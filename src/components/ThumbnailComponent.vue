<template>
  <div
    class="relative !w-[200px] !h-[300px] hover:scale-105 hover:brightness-110 transition duration-300 cursor-pointer overflow-visible mx-auto"
    v-if="film"
    @click="viewFilm(film.id)"
  >
    <img
      class="rounded-t-lg w-full h-full object-fit block"
      :src="`https://image.tmdb.org/t/p/w300/${film.poster_path}`"
      alt="Film Poster Path"
    />
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

<style lang="scss" scoped></style>
