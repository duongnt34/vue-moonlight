<template>
  <div>
    <TabWrapper id="filmViewTabs">
      <TabContent title="Overall" class="w-full">
        <div class="px-4 pt-3">
          {{ film.overview }}
        </div>
      </TabContent>
      <TabContent title="Starring" class="w-full">
        <ul class="px-4 mt-2 overflow-hidden md:columns-2">
          <li
            v-for="cast in filmCasts"
            :key="cast.id"
            class="flex w-full items-center mb-2 gap-2"
          >
            <img
              class="w-10 h-10 rounded-full object-cover md:w-14 md:h-14"
              :src="`https://image.tmdb.org/t/p/w185${cast.profile_path}`"
              :alt="cast.name"
            />
            <div class="flex flex-col">
              <p class="font-semibold">{{ cast.name }}</p>
              <p class="text-sm">{{ cast.character }}</p>
            </div>
          </li>
        </ul>
      </TabContent>
      <TabContent title="Reviews" class="w-full">
        <p v-if="filmReviews.length === 0" class="px-4 mt-2 w-full text-center">
          There is no reviews for this film.
        </p>
        <ul v-else class="px-4 mt-2">
          <li
            v-for="review in filmReviews"
            :key="review.id"
            class="flex w-full mb-2 gap-2"
          >
            <img
              class="w-10 h-10 rounded-full object-cover"
              :src="`${review.author_details?.avatar_path}`"
              alt="reviewer avatar"
            />
            <div class="flex flex-col">
              <p class="text-primary">{{ review.author }}</p>
              <div>
                <p
                  class="overflow-wrap-anywhere"
                  :class="{ 'line-clamp-3': !review.isExpanded }"
                >
                  {{ review.content }}
                </p>
                <button
                  class="italic text-sm md:text-base"
                  @click="review.isExpanded = !review.isExpanded"
                >
                  <span :class="{ hidden: review.isExpanded }">+</span>
                  <span :class="{ hidden: !review.isExpanded }">-</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </TabContent>
    </TabWrapper>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TabWrapper from "./Tab/TabWrapper.vue";
import TabContent from "./Tab/TabContent.vue";
import FilmAPI from "../services/FilmAPI";
import { useGeneralStore } from "../stores/GeneralStore";

const generalStore = useGeneralStore();
const props = defineProps(["film"]);

const filmCasts = ref(null);
const getFilmCasts = async () => {
  try {
    const res = await FilmAPI.getFilmCredits(
      generalStore.currentFilmType,
      props.film.id
    );
    filmCasts.value = res.data.cast.slice(0, 8);
  } catch (error) {
    console.log(error);
  }
};

const filmReviews = ref(null);
const getFilmReviews = async () => {
  try {
    const res = await FilmAPI.getFilmReviews(
      generalStore.currentFilmType,
      props.film.id
    );
    filmReviews.value = res.data.results;
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
          el.author_details.avatar_path = `/src/assets/logo.png`;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

await getFilmCasts();
await getFilmReviews();
</script>

<style lang="scss">
#filmViewTabs {
  .tabs__header {
    li {
      font-size: larger;
    }
    li:hover {
      color: white;
    }
  }
}
</style>
