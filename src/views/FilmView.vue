<template>
  <Suspense>
    <AsyncFilmView />
    <template #fallback>
      <div class="flex w-full h-full justify-center items-center">
        <img class="animate-spin w-20 h-20" src="../assets/logo.png" alt="" />
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import AsyncFilmView from "../components/AsyncFilmView.vue";
</script>
