<template>
  <div class="star-rating inline-block relative">
    <span>&star;</span>
    <span>&star;</span>
    <span>&star;</span>
    <span>&star;</span>
    <span>&star;</span>
    <div
      class="star-rating_current absolute top-0 overflow-hidden"
      :style="getFilmRating"
    >
      <span>&starf;</span>
      <span>&starf;</span>
      <span>&starf;</span>
      <span>&starf;</span>
      <span>&starf;</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["rating"]);
const getFilmRating = computed(() => {
  return `width: ${props.rating * 10}%;`;
});
</script>

<style lang="scss" scoped></style>
