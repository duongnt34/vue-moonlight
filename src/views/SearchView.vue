<template>
  <div class="w-full">
    <div class="m-auto mt-10 w-3/5 text-center">
      <label for="searchQuery" class="text-white text-xl"
        >Find your favourite movies, TV shows, people and more
      </label>
      <div
        class="relative h-12 bg-dark-lighten rounded-lg group z-30 mt-3"
        :class="{ 'rounded-b-none': mapBoxSearchResults && isInputFocused }"
      >
        <div
          class="absolute pointer-events-none inset-y-0 left-0 flex items-center pl-4"
        >
          <span
            ><font-awesome-icon
              icon="fa-solid fa-magnifying-glass"
              class="text-gray-lighten text-lg"
          /></span>
        </div>
        <input
          type="text"
          class="block w-full h-full pl-12 outline-none text-gray-lighten bg-transparent"
          placeholder="Search..."
          v-model="searchQuery"
          @input="getSearchData"
          @keyup.enter="getSearchDataByEnter"
          ref="searchInput"
          @focus="onInputFocus"
          @blur="onInputBlur"
        />
        <div
          class="absolute inset-y-0 right-0 flex items-center text-gray-lighten"
        >
          <select
            name="searchType"
            class="h-full outline-none bg-transparent text-center border-l-gray-lighten border-l"
          >
            <option value="">All</option>
            <option value="">TV Shows</option>
            <option value="">Movies</option>
            <option value="">People</option>
          </select>
        </div>
        <!-- Search Results -->
        <ul
          class="z-30 hidden w-full bg-dark-lighten rounded-b-lg text-white group-focus-within:flex flex-col relative after:absolute after:top-0 after:h-[1px] after:bg-gray-darken after:left-[5%] after:right-[5%]"
          v-if="mapBoxSearchResults"
        >
          <li
            v-for="searchResult in mapBoxSearchResults"
            :key="searchResult.id"
            class="py-3 pl-5 hover:bg-gray-darken cursor-pointer"
          >
            <button
              type="button"
              class="w-full text-left"
              @click="getSearchResultDetail(searchResult)"
            >
              {{ searchResult.name ? searchResult.name : searchResult.title }}
            </button>
          </li>
          <li
            class="py-3 pl-5 hover:bg-gray-darken cursor-pointer hover:rounded-b-lg"
          >
            <button class="w-full">More results</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="ml-10 mt-10">
      <ul class="flex gap-5">
        <li v-for="result in listResults">
          <ThumbnailComponent :film="result"></ThumbnailComponent>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import FilmAPI from "../services/FilmAPI";
import ThumbnailComponent from "../components/ThumbnailComponent.vue";
const isInputFocused = ref(false);
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapBoxSearchResults = ref(null);

const onInputFocus = () => {
  isInputFocused.value = true;
};

const onInputBlur = () => {
  isInputFocused.value = false;
};

const getSearchData = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const res = await FilmAPI.getMultiSearch(searchQuery.value);
      mapBoxSearchResults.value = res.data.results.slice(0, 5);
      return;
    }
    mapBoxSearchResults.value = null;
  }, 500);
};

const getSearchDataByEnter = async () => {
  if (searchQuery.value !== "") {
    const res = await FilmAPI.getMultiSearch(searchQuery.value);
    mapBoxSearchResults.value = res.data.results.slice(0, 5);
    return;
  }
};

const listResults = ref(null);
const getSearchResultDetail = async (searchResult) => {
  const query = searchResult.title ? searchResult.title : searchResult.name;
  if (query !== "") {
    const res = await FilmAPI.getMultiSearch(query);
    listResults.value = res.data.results;
  }
  mapBoxSearchResults.value = null;
};
</script>

<style lang="scss" scoped></style>
