<template>
  <!-- General info -->
  <section
    class="section--viewFilm bg-center bg-no-repeat bg-cover"
    ref="viewFilm"
  >
    <div class="p-12 text-white bg-black/[.8] md:text-lg">
      <!-- title -->
      <div class="text-4xl py-5">
        <h1>{{ film.name }}</h1>
      </div>
      <div class="flex md:flex-row flex-col gap-3">
        <!-- content -->
        <div class="md:w-1/2 flex flex-col md:flex-row gap-3">
          <div class="md:w-1/3">
            <img
              class="border-2 border-primary rounded-md"
              :src="`https://image.tmdb.org/t/p/w300${film.poster_path}`"
              alt="film poster"
            />
          </div>
          <div class="md:w-2/3 flex flex-col justify-between">
            <ul>
              <li class="">
                <StarRating
                  class="text-lg"
                  :rating="film.vote_average"
                ></StarRating>
                <span class="text-primary"
                  >({{ film.vote_average?.toFixed(1) }})</span
                >
              </li>
              <li v-if="film.release_date">
                Release date:
                <span class="text-primary">{{
                  formatDate(film.release_date)
                }}</span>
              </li>
              <li v-if="film.first_air_date">
                Release date:
                <span class="text-primary">{{
                  formatDate(film.first_air_date)
                }}</span>
              </li>
              <li v-if="film.runtime">
                Runtime:
                <span class="text-primary">{{ film.runtime }} min</span>
              </li>
              <li v-if="film.number_of_seasons">
                Seasons:
                <span class="text-primary">{{ film.number_of_seasons }}</span>
              </li>
              <li v-if="film.number_of_episodes">
                Episodes:
                <span class="text-primary">{{ film.number_of_episodes }}</span>
              </li>
              <li class="flex gap-1">
                <span>Genres:</span>
                <ul class="flex flex-wrap gap-2">
                  <li
                    class="text-primary hover:text-white transition duration-300"
                    v-for="(genre, index) in film.genres"
                  >
                    <button>{{ genre.name }}</button>
                    <span v-if="index < film.genres.length - 1">,</span>
                  </li>
                </ul>
              </li>
              <li>
                Release company:
                <span class="text-primary">{{
                  film.production_companies[0]?.name
                }}</span>
              </li>
              <li>
                Release Country:
                <span class="text-primary">{{
                  film.production_countries[0]?.name
                }}</span>
              </li>
            </ul>
            <div>
              <p class="">Plot:</p>
              <p class="overflow-hidden line-clamp-5 text-primary">
                {{ film.overview }}
              </p>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 flex flex-col gap-2">
          <!--Season and Episodes Dropdowns -->
          <div class="flex gap-2" v-if="route.params.filmType == 'tv'">
            <!-- Season Dropdown -->
            <div class="relative">
              <button
                type="button"
                class="bg-primary rounded-lg text-black p-2"
                @click="toggleSeasonDropdown"
              >
                <p>
                  Seasons: {{ currentSeason }}
                  <font-awesome-icon :icon="['fas', 'caret-down']" />
                </p>
              </button>
              <ul
                class="absolute bg-dark-darken border-primary border-2 !rounded-lg shadow-lg z-10 w-full"
                v-if="isSeasonDropdownOpen"
              >
                <li
                  v-for="(season, index) in seasons"
                  :key="index"
                  :value="season"
                  class="p-2 hover:bg-primary hover:text-black transition duration-300 cursor-pointer"
                  @click="selectSeason(season)"
                >
                  {{ season }}
                </li>
              </ul>
            </div>

            <!-- Episodes Dropdown -->
            <div class="relative">
              <button
                class="bg-primary rounded-lg text-black p-2"
                type="button"
                @click="toggleEpisodeDropdown"
              >
                <p>
                  Episodes: {{ currentEpisode }}
                  <font-awesome-icon :icon="['fas', 'caret-down']" />
                </p>
              </button>
              <ul
                class="absolute bg-dark-darken border-primary border-2 !rounded-lg shadow-lg z-10 w-96 max-h-96 overflow-auto"
                v-if="isEpisodeDropdownOpen && episodes.length > 0"
              >
                <li
                  v-for="(episode, index) in episodes"
                  :key="index"
                  :value="episode.episode_number"
                  class="p-2 hover:bg-primary hover:text-black transition duration-300 cursor-pointer overflow-hidden"
                  @click="selectEpisode(episode.episode_number)"
                >
                  {{ `${episode.episode_number}: ${episode.name}` }}
                </li>
              </ul>
              <p
                class="absolute bg-dark-darken border-primary border-2 !rounded-lg shadow-lg z-10 w-96 max-h-96 overflow-auto"
                v-else-if="isEpisodeDropdownOpen && episodes.length == 0"
              >
                There's no episodes for this season yet
              </p>
            </div>
          </div>

          <!-- Player -->
          <iframe
            class="w-full h-full"
            :data-src="filmVideosUrl"
            frameborder="0"
            allowfullscreen="true"
            :src="filmVideosUrl"
          ></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- Advanced Material -->
  <section class="px-12 py-5">
    <FilmViewTabs :film="film" :filmVideos="filmVideos"></FilmViewTabs>
  </section>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import FilmViewTabs from "./FilmViewTabs.vue";
import StarRating from "./Utils/StarRating.vue";
import FilmAPI from "../services/FilmAPI";

const route = useRoute();
const router = useRouter();

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const filmUrl = `https://api.themoviedb.org/3/${route.params.filmType}/${route.params.id}?api_key=${apiKey}`;
const filmVideosUrl = computed(() => {
  let url = "";
  if (route.params.filmType == "movie") {
    url = `https://www.2embed.to/embed/tmdb/movie?id=${route.params.id}`;
    console.log(url);
  } else if (route.params.filmType == "tv") {
    url = `https://www.2embed.to/embed/tmdb/tv?id=${route.params.id}&s=${currentSeason.value}&e=${currentEpisode.value}`;
  }
  return url;
});

const film = ref(null);

// episodes functions
const episodes = ref([]);
const currentEpisode = ref(1);
const getEpisodes = async () => {
  try {
    episodes.value = [];
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${route.params.id}/season/${currentSeason.value}?api_key=${apiKey}`
    );
    episodes.value.push(...res.data.episodes);
  } catch (error) {
    console.log(error);
  }
};
const isEpisodeDropdownOpen = ref(false);
const toggleEpisodeDropdown = () => {
  isEpisodeDropdownOpen.value = !isEpisodeDropdownOpen.value;
};
const selectEpisode = (episode) => {
  currentEpisode.value = episode;
  isEpisodeDropdownOpen.value = false;
};

// season functions
const seasons = ref([]);
const currentSeason = ref(1);
const getSeasons = async () => {
  for (let i = 0; i < film.value.number_of_seasons; i++) {
    seasons.value.push(i + 1);
  }
};
const isSeasonDropdownOpen = ref(false);
const toggleSeasonDropdown = () => {
  isSeasonDropdownOpen.value = !isSeasonDropdownOpen.value;
};
const selectSeason = (season) => {
  currentSeason.value = season;
  currentEpisode.value = 1;
  isSeasonDropdownOpen.value = false;
};

const getFilmInfo = async () => {
  try {
    const res = await axios.get(filmUrl);
    film.value = res.data;
    film.value.name = film.value.title || film.value.name; //tv has name, movie has title
  } catch (error) {
    if (error.response && error.response.status === 404) {
      router.push({ path: "/404" });
    } else {
      console.log(error);
    }
  }
};

const filmVideos = ref(null);
const getFilmVideos = async () => {
  try {
    const res = await FilmAPI.getFilmVideos(
      route.params.filmType,
      route.params.id
    );
    filmVideos.value = res.data.results;
    if (filmVideos.value.length > 4) {
      filmVideos.value.length = 4;
    }
  } catch (error) {
    console.log(error);
  }
};

// Format date
const formatDate = (tmdbDate) => {
  const dateString = tmdbDate; //String
  const dateParts = dateString.split("-");
  const day = dateParts[2];
  const month = dateParts[1];
  const year = dateParts[0];
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

watch(
  () => currentSeason.value,
  () => {
    getEpisodes();
  }
);

await getFilmInfo();
await getFilmVideos();

const viewFilm = ref(null);
onMounted(() => {
  viewFilm.value.style = `background-image: url(https://image.tmdb.org/t/p/original${film.value.backdrop_path})`;
  if (route.params.filmType == "tv") {
    getEpisodes();
    getSeasons();
  }
});
</script>

<style lang="scss" scoped></style>
