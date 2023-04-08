<template>
  <div class="flex flex-col md:flex-row">
    <!-- Link Film Modal -->
    <Modal class="z-50" @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content flex flex-col">
        <h1>This is a Modal Header</h1>
        <p>Modal Content</p>
      </div>
    </Modal>
    <div class="flex w-full h-full">
      <div v-if="film" class="flex-1 flex flex-col relative">
        <div class="absolute top-0">
          <div class="relative">
            <img
              class="md:h-[400px] h-[300px] object-cover w-screen"
              :src="`https://image.tmdb.org/t/p/original/${film.backdrop_path}`"
              alt=""
            />
            <div
              class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black"
            ></div>
          </div>
        </div>
        <div class="relative mt-12 md:mt-0">
          <!-- Poster, Film Info...    -->
          <div
            class="flex flex-col items-center w-full md:flex-row md:h-[400px] md:mt-28 md:px-28"
          >
            <!-- Poster -->
            <img
              class="w-[185px] shadow-md shadow-black rounded-md"
              :src="`https://image.tmdb.org/t/p/original${film.poster_path}`"
              alt="Film poster"
            />
            <!-- Film Info -->
            <div
              class="text-white text-2xl mt-3 px-5 w-full md:flex md:justify-between"
            >
              <div class="flex-1">
                <p class="md:text-5xl">
                  <span>{{ film.name ? film.name : film.title }}</span>
                </p>
                <!-- Star Rating system -->
                <div class="flex justify-between md:block">
                  <div class="flex">
                    <StarRating
                      class="text-primary"
                      :rating="film.vote_average * 10"
                    />
                    <p class="text-base self-center">
                      ({{ film.vote_average?.toFixed(1) }})
                    </p>
                  </div>
                  <!-- length -->
                  <p v-if="film.runtime" class="text-base self-center">
                    Length: {{ film.runtime }} mins
                  </p>
                  <p
                    v-if="film.number_of_seasons"
                    class="text-base self-center"
                  >
                    Seasons: {{ film.number_of_seasons }}
                  </p>
                </div>
                <!-- Released Date -->
                <p v-if="film.release_date" class="text-base self-center">
                  Released: {{ film.release_date }}
                </p>
                <p v-if="film.first_air_date" class="text-base self-center">
                  On air: {{ film.first_air_date }}
                </p>
                <!-- Genres -->
                <ul class="text-base overflow-hidden py-1 mt-1">
                  <li
                    class="float-left my-2"
                    v-for="genre in film.genres"
                    :key="genre.id"
                  >
                    <RouterLink
                      :to="{
                        name: 'ExploreView',
                        query: { genre: genre.name, genreId: genre.id },
                        params: { id: genre.id },
                      }"
                      class="rounded-lg mr-2 px-2 py-1 border-2"
                    >
                      {{ genre.name }}
                    </RouterLink>
                  </li>
                </ul>
              </div>
              <!-- Watch Button -->
              <!-- <div
                class="text-white text-base flex justify-center items-center"
              >
                <button
                  class="w-full bg-primary cursor-pointer rounded-lg py-1 px-2 text-center md:w-20 md:h-20 md:rounded-full md:p-3"
                  @click="toggleModal"
                >
                  <font-awesome-icon icon="fa-solid fa-play" />
                  <span class="md:hidden"> Watch Now </span>
                </button>
              </div> -->
            </div>
          </div>

          <div class="mt-2 w-full md:flex md:flex-row">
            <!-- Tabs -->
            <div class="max-h-full md:w-4/5 px-5 md:-mt-10 mt-5">
              <FilmViewTabs
                class="flex justify-center text-gray-lighten border-x border-gray-darken md:text-lg md:border-l-0"
                :film="film"
              />
            </div>
            <div class="md:-mt-10">
              <p class="text-gray-lighten text-lg mt-3 px-5">Videos:</p>
              <ul class="flex flex-col justify-center items-center">
                <li v-for="video in filmVideos" :key="video.id" class="py-2">
                  <iframe
                    width="300"
                    height="200"
                    :src="`https://www.youtube.com/embed/${video.key}`"
                    :title="video.name"
                    frameborder="1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import FilmViewTabs from "./FilmViewTabs.vue";
import StarRating from "./Utils/StarRating.vue";
import Modal from "./Utils/Modal.vue";
import FilmAPI from "../services/FilmAPI";

const route = useRoute();
const router = useRouter();

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const filmUrl = `https://api.themoviedb.org/3/${route.params.filmType}/${route.params.id}?api_key=${apiKey}`;

const film = ref(null);
const getFilmInfo = async () => {
  try {
    const res = await axios.get(filmUrl);
    film.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const toWatchView = (filmId) => {
  router.push({
    name: "WatchView",
    params: {
      id: filmId,
    },
  });
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

const getFilmWatchProvider = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${route.params.filmType}/${route.params.id}/watch/providers?api_key=${apiKey}`
    );
  } catch (error) {
    // console.log(error);
  }
};

await getFilmInfo();
await getFilmVideos();
await getFilmWatchProvider();
</script>

<style lang="scss" scoped></style>
