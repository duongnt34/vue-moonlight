<template>
  <figure class="w-full h-auto flex justify-center">
    <img
      :src="`https://image.tmdb.org/t/p/w200${poster.file_path}`"
      alt="poster"
    />
  </figure>
</template>

<script setup>
const props = defineProps(["poster"]);
</script>

<style lang="scss" scoped></style>
