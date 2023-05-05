<template>
  <p
    v-if="filmReviews.length === 0"
    class="m-5 w-full text-center text-primary"
  >
    There is no reviews for this film.
  </p>
  <ul v-else class="">
    <li
      v-for="(review, index) in filmReviews"
      :key="index"
      class="flex w-full p-5 gap-2"
    ><div>
      <figure class="w-10 h-10">
        <img
          class="w-full h-full rounded-full object-fill"
          :src="`${review.author_details?.avatar_path}`"
          alt="reviewer avatar"
        />
      </figure>
    </div>
      <div class="flex flex-col">
        <p class="text-primary">{{ review.author }}</p>
        <div>
          <p
            class="text-white"
          >
            <span v-if="!review.isExpanded">
              <span v-if="review.restContent">{{ `${review.shortContent + review.ellipsis }`}}</span>
              <span v-else>{{ review.shortContent}}</span>
            </span>
            <span v-else>
              {{ review.shortContent + review.restContent }}
            </span>
            <button type="button" class="ml-5 underline italic text-sm" v-if="review.restContent  && !review.isExpanded" @click="showReview(index)">show more</button>
            <button type="button" class="ml-5 underline italic text-sm" v-if="review.restContent && review.isExpanded" @click="showReview(index)">show less</button>
          </p>
        </div>
      </div>
    </li>
  </ul>
  <div class="flex justify-center mb-5" v-if="filmReviews.length > 5">
    <button
      class="w-10 h-10 bg-primary text-black rounded-full hover:scale-110 transition duration-300"
      @click="getMoreFilmReviews()"
      v-if="filmReviews.length > 0 && filmReviews.length <= 5"
    >
      <font-awesome-icon :icon="['fas', 'angles-down']" />
    </button>
    <button
      class="w-10 h-10 bg-primary text-black rounded-full hover:scale-110 transition duration-300"
      @click="getFilmReviews()"
      v-if="filmReviews.length > 5"
    >
      <font-awesome-icon :icon="['fas', 'angles-up']" />
    </button>
  </div>
</template>

<script setup>
import FilmAPI from "../../services/FilmAPI";
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["film"]);
const route = useRoute();

const filmReviews = ref([]);
const getFilmReviews = async () => {
  try {
    const res = await FilmAPI.getFilmReviews(
      route.params.filmType,
      props.film.id
    );
    filmReviews.value = [];
    res.data.results.forEach((el, index) => {
      el.shortContent = el.content.slice(0, 450)
      el.ellipsis = '...'
      el.restContent = el.content.slice(450)
      filmReviews.value.push(el);
    });
    filmReviews.value = filmReviews.value.slice(0, 5);

    if (Array.isArray(filmReviews.value)) {
      filmReviews.value.forEach((el) => {
        el.isExpanded = false;
        if (
          el.author_details &&
          typeof el.author_details.avatar_path === "string"
        ) {
          if (!el.author_details.avatar_path.includes("gravatar")) {
            el.author_details.avatar_path = `https://image.tmdb.org/t/p/w200${el.author_details.avatar_path}`; //if avatar not gravatar, set it as default logo
          } else {
            el.author_details.avatar_path =
              el.author_details.avatar_path.substring(1);
          }
        } else {
          el.author_details.avatar_path = new URL(`/src/assets/logo.png`, window.location.origin);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getMoreFilmReviews = async () => {
  try {
    const res = await FilmAPI.getFilmReviews(
      route.params.filmType,
      props.film.id
    );
    filmReviews.value = [];
    res.data.results.forEach((el, index) => {
      filmReviews.value.push(el);
    });
    if (Array.isArray(filmReviews.value)) {
      filmReviews.value.forEach((el) => {
        el.isExpanded = false;
        if (
          el.author_details &&
          typeof el.author_details.avatar_path === "string"
        ) {
          if (!el.author_details.avatar_path.includes("gravatar")) {
            el.author_details.avatar_path = `https://image.tmdb.org/t/p/w200${el.author_details.avatar_path}`; //if avatar not gravatar, set it as default logo
          } else {
            el.author_details.avatar_path =
              el.author_details.avatar_path.substring(1);
          }
        } else {
          el.author_details.avatar_path = new URL(`/src/assets/logo.png`, window.location.origin) ;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const showReview = (index) => {
  filmReviews.value[index].isExpanded = !filmReviews.value[index].isExpanded
  console.log(filmReviews.value[index]);
}
await getFilmReviews();
</script>

<style lang="scss" scoped></style>
