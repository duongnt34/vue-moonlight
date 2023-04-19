<template>
  <figure class="w-full h-auto flex justify-center">
    <img
      :src="`https://image.tmdb.org/t/p/w200${backdrop.file_path}`"
      alt="backdrop"
    />
  </figure>
</template>

<script setup>
const props = defineProps(["backdrop"]);
</script>

<style lang="scss" scoped></style>
