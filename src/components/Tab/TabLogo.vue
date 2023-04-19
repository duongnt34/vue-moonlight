<template>
  <ul class="Logo--list m-3">
    <li v-for="(logo, index) in logos" :key="index">
      <AsyncLogoImage :logo="logo" />
    </li>
  </ul>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";
import FilmAPI from "../../services/FilmAPI";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps(["film"]);
const AsyncLogoImage = defineAsyncComponent(() => import("./LogoImage.vue"));
const logos = ref([]);
const getScreenshots = async () => {
  try {
    const res = await FilmAPI.getFilmImages(
      route.params.filmType,
      props.film.id
    );
    logos.value = res.data.logos;
  } catch (error) {
    console.log(error);
  }
};

await getScreenshots();
</script>

<style lang="scss" scoped>
.Logo--list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
</style>
