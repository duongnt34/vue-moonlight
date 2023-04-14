<template>
  <div class="mb-5 w-5/6 mx-auto" ref="filmList">
    <ul class="result--section">
      <li v-for="film in films" class="mt-14">
        <ThumbnailComponent :film="film"></ThumbnailComponent>
      </li>
    </ul>

    <div v-if="isLoading" class="loading">Loading...</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import ThumbnailComponent from "../components/ThumbnailComponent.vue";

const films = ref([]);
const isLoading = ref(false);
const counter = ref(1);

const loadFilms = async (counter) => {
  isLoading.value = true;
  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=a8a6fa2f944128e9712135bc3ca000b1&page=${counter}`
  );
  res.data.results.forEach((film) => {
    films.value.push(film);
  });
  isLoading.value = false;
  console.log(films.value);
};

const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight && !isLoading.value) {
    counter.value++;
    loadFilms(counter.value);
  }
};

onMounted(() => {
  loadFilms(counter.value);
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
