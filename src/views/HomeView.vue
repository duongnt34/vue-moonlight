<template>
  <div class="flex flex-row my-10">
    <div class="w-11/12 mx-auto">
      <div class="flex justify-between !px-2">
        <div class="flex text-gray-lighten gap-2">
          <button
            class="hover:text-white relative w-20 rounded-md duration-300 ease-in-out transition"
            @click="changeCurrentFilmType('tv')"
            :class="{
              'bg-primary text-white': currentFilmType == `tv`,
            }"
            type="button"
          >
            <span>TV Shows</span>
          </button>

          <button
            class="hover:text-white relative w-20 rounded-md duration-300 ease-in-out transition"
            @click="changeCurrentFilmType('movie')"
            :class="{
              'bg-primary text-white': currentFilmType == `movie`,
            }"
            type="button"
          >
            <span>Movies</span>
          </button>
        </div>
        <div class="flex gap-4 items-center">
          <img
            class="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
        </div>
      </div>

      <!-- carousel -->
      <div class="mt-5 relative !px-2">
        <HomeSwiper :key="renderKey" />
      </div>

      <!-- Popular-->
      <div class="mt-10 relative">
        <div class="text-white md:text-2xl px-2">
          <span>Popular</span>
        </div>
        <Suspense>
          <ListSwiper :key="renderKey" :listType="'popular'" />
          <template #fallback>
            <p>loading...</p>
          </template>
        </Suspense>
      </div>

      <!-- Top Rated -->
      <div class="mt-10 relative">
        <div class="text-white md:text-2xl px-2">
          <span>Top Rated</span>
        </div>
        <Suspense>
          <ListSwiper :key="renderKey" :listType="'top_rated'" />
          <template #fallback>
            <p>hello.</p>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeSwiper from "../components/Swiper/HomeSwiper.vue";
import ListSwiper from "../components/Swiper/ListSwiper.vue";
import { computed, ref } from "vue";
import { useGeneralStore } from "../stores/GeneralStore";

const renderKey = ref(0);
const forceRerender = () => {
  renderKey.value += 1;
};

const generalStore = useGeneralStore();
let currentFilmType = computed(() => {
  return generalStore.currentFilmType;
});

const changeCurrentFilmType = (type) => {
  generalStore.changeCurrentFilmType(type);
  forceRerender();
};

const searchText = ref("");
</script>

<style scoped></style>
