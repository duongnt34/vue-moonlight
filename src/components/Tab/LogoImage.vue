<template>
  <figure class="w-full h-auto flex justify-center">
    <img
      :src="`https://image.tmdb.org/t/p/w200${logo.file_path}`"
      alt="backdrop"
    />
  </figure>
</template>

<script setup>
const props = defineProps(["logo"]);
</script>

<style lang="scss" scoped></style>
