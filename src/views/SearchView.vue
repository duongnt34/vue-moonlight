<template>
  <div class="w-full">
    <div class="mx-auto mt-10 w-3/5 text-center">
      <label for="searchQuery" class="text-gray-lighten text-xl"
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
          @keydown.enter.prevent="getSearchDataByEnter"
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

        <!-- Search Temporary Results -->
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
    <section class="mb-10 mt-5 w-5/6 mx-auto">
      <h1 class="-mb-10 text-gray-lighten" v-if="listResults.length">
        {{ totalResult }} results found
      </h1>
      <ul class="result--section">
        <li v-for="result in listResults" class="mt-16">
          <ThumbnailComponent :film="result"></ThumbnailComponent>
        </li>
      </ul>
    </section>

    <!-- Pagination -->
    <section class="mt-16 mb-5">
      <Pagination
        :total-page="totalPage"
        :current-page="currentPage"
        @update:current-page="getNewPage"
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FilmAPI from "../services/FilmAPI";
import ThumbnailComponent from "../components/ThumbnailComponent.vue";
import Pagination from "../components/Utils/Pagination.vue";
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
const totalPage = ref(0);
const currentPage = ref(0);
const totalResult = ref(0);

const onInputFocus = () => {
  isInputFocused.value = true;
};
const onInputBlur = () => {
  isInputFocused.value = false;
};

/**
 * Get search data when input and update to temporary mapbox list result
 */
const getSearchData = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "" && searchType.value !== "") {
      const res = await FilmAPI.getSearch(searchQuery.value, searchType.value);
      mapBoxSearchResults.value = res.data.results.slice(0, 5);
      return;
    }
    mapBoxSearchResults.value = null;
  }, 500);
};

/**
 * Get search data when press enter
 */
const getSearchDataByEnter = async () => {
  clearTimeout(queryTimeout.value);
  if (searchQuery.value !== "" && searchType.value !== "") {
    const res = await FilmAPI.getSearch(searchQuery.value, searchType.value);
    listResults.value = res.data.results;
    currentPage.value = 1;
    totalPage.value = res.data.total_pages;
    totalResult.value = res.data.total_results;
  } else if (listResults.value.length === 0) {
    alert("Please enter a keyword");
  }
  setTimeout(() => {
    mapBoxSearchResults.value = null;
  }, 500);
};

/**
 * Get new page when click on pagination
 */
const getNewPage = async (page) => {
  if (typeof page == "number") {
    const res = await FilmAPI.getSearch(
      searchQuery.value,
      searchType.value,
      page
    );
    listResults.value = res.data.results;
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("a");
  }
};
</script>

<style lang="scss" scoped>
.result--section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid: 1rem;
}
</style>
