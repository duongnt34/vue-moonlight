<template>
  <ul class="p-5 overflow-hidden md:columns-3">
    <li
      v-for="cast in filmCasts"
      :key="cast.id"
      class="flex w-full items-center mb-2 gap-2"
    >
      <img
        v-if="cast.profile_path"
        class="w-10 h-10 rounded-full object-cover md:w-14 md:h-14"
        :src="`https://image.tmdb.org/t/p/w185${cast.profile_path}`"
        :alt="cast.name"
      />
      <img
        v-else
        class="w-10 h-10 rounded-full object-cover md:w-14 md:h-14"
        src="../../assets/logo.png"
        alt="cast.name"
      />
      <div class="flex flex-col gap-2">
        <p class="font-semibold text-primary">{{ cast.name }}</p>
        <p class="text-sm text-white">{{ cast.character }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import FilmAPI from "../../services/FilmAPI";
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["film"]);
const route = useRoute();
const filmCasts = ref(null);
const getFilmCasts = async () => {
  try {
    const res = await FilmAPI.getFilmCredits(
      route.params.filmType,
      props.film.id
    );
    filmCasts.value = res.data.cast.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
};

await getFilmCasts();
</script>

<style lang="scss" scoped></style>
