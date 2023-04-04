<template>
  <Suspense>
    <AsyncFilmView />
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>

<script setup>
import AsyncFilmView from "../components/AsyncFilmView.vue";
</script>
