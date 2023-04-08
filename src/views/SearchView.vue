<template>
  <div class="w-full">
    <div class="mx-auto mt-10 w-3/5 text-center">
      <label for="searchQuery" class="text-white text-xl"
        >Find your favourite movies, TV shows, people and more
      </label>
      <form
        @submit.prevent="getSearchData"
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
          ref="searchInput"
          @input="getSearchData"
          @keyup.enter="getSearchDataByEnter"
          @focus="onInputFocus"
          @blur="onInputBlur"
        />
        <div
          class="absolute inset-y-0 right-0 flex items-center text-gray-lighten"
        >
          <select
            name="searchType"
            class="h-full outline-none bg-transparent text-center border-l-gray-lighten border-l"
            v-model="searchType"
          >
            <option
              :value="option.value"
              v-for="option in searchTypeOptions"
              :key="option.value"
            >
              {{ option.label }}
            </option>
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
            <button class="w-full" @click="getSearchDataByEnter">
              More results
            </button>
          </li>
        </ul>
      </form>
    </div>

    <!-- Results section -->
    <section class="mb-10 w-5/6 mx-auto">
      <ul class="result--section">
        <li v-for="result in listResults" class="mt-16">
          <ThumbnailComponent :film="result"></ThumbnailComponent>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FilmAPI from "../services/FilmAPI";
import ThumbnailComponent from "../components/ThumbnailComponent.vue";
const isInputFocused = ref(false);
const searchQuery = ref("");
const searchType = ref("all");
const searchTypeOptions = ref([
  { value: "all", label: "All" },
  { value: "tv", label: "TV Shows" },
  { value: "movies", label: "Movies" },
  { value: "people", label: "People" },
]);
const queryTimeout = ref(null);
const mapBoxSearchResults = ref(null);
const listResults = ref([]);

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
      switch (searchType.value) {
        case "all":
          const res = await FilmAPI.getMultiSearch(searchQuery.value);
          mapBoxSearchResults.value = res.data.results.slice(0, 5);
          return res.data.results;
        case "tv":
          const resTv = await FilmAPI.getTvSearch(searchQuery.value);
          mapBoxSearchResults.value = resTv.data.results.slice(0, 5);
          return resTv.data.results;
        case "movies":
          const resMovies = await FilmAPI.getMovieSearch(searchQuery.value);
          mapBoxSearchResults.value = resMovies.data.results.slice(0, 5);
          return resMovies.data.results;
        case "people":
          const resPeople = await FilmAPI.getPeopleSearch(searchQuery.value);
          mapBoxSearchResults.value = resPeople.data.results.slice(0, 5);
          return resPeople.data.results;
      }
    }
    mapBoxSearchResults.value = null;
  }, 500);
};
const getSearchDataByEnter = async () => {
  if (searchQuery.value !== "") {
    switch (searchType.value) {
      case "all":
        const res = await FilmAPI.getMultiSearch(searchQuery.value);
        listResults.value = res.data.results;
        searchQuery.value = "";
        return;
      case "tv":
        const resTv = await FilmAPI.getTvSearch(searchQuery.value);
        listResults.value = resTv.data.results;
        return resTv.data.results;
      case "movies":
        const resMovies = await FilmAPI.getMovieSearch(searchQuery.value);
        listResults.value = resMovies.data.results;
        return resMovies.data.results;
      case "people":
        const resPeople = await FilmAPI.getPeopleSearch(searchQuery.value);
        listResults.value = resPeople.data.results;
        return resPeople.data.results;
    }
  } else if (listResults.value.length === 0) {
    alert("Please enter a keyword");
  }
};
</script>

<style lang="scss" scoped>
.result--section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
}
</style>
