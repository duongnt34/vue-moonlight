<template>
  <ul class="backdrop--list m-3">
    <li v-for="(backdrop, index) in backdrops" :key="index">
      <AsyncBackdropImage :backdrop="backdrop" />
    </li>
  </ul>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";
import FilmAPI from "../../services/FilmAPI";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps(["film"]);
const AsyncBackdropImage = defineAsyncComponent(() =>
  import("./BackdropImage.vue")
);
const backdrops = ref([]);
const getScreenshots = async () => {
  try {
    const res = await FilmAPI.getFilmImages(
      route.params.filmType,
      props.film.id
    );
    backdrops.value = res.data.backdrops;
  } catch (error) {
    console.log(error);
  }
};

await getScreenshots();
</script>

<style lang="scss" scoped>
.backdrop--list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
</style>
