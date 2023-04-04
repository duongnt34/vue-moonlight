<template>
  <div class="relative">
    <div
      class="!w-[175px] !h-[248px] hover:scale-105 hover:brightness-110 transition duration-300 cursor-pointer overflow-visible"
      v-if="film"
    >
      <img
        class="rounded-t-lg object-cover"
        :src="`https://image.tmdb.org/t/p/w200/${film.poster_path}`"
        alt="Film Poster Path"
      />
      <figcaption
        class="bg-dark-lighten rounded-b-lg py-2 px-1 flex items-center justify-center"
      >
        <p
          class="text-ellipsis whitespace-nowrap overflow-hidden text-gray-lighten"
        >
          {{ film.title ? film.title : film.name }}
        </p>
      </figcaption>
      <div
        class="absolute top-2 left-2 bg-primary text-white text-sm px-2 py-1 rounded-full"
      >
        <span class="mr-1">{{ film.vote_average?.toFixed(1) }}</span>
        <font-awesome-icon class="" icon="fa-solid fa-star" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["film"]);
</script>

<style lang="scss" scoped></style>
