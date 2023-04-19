<template>
  <div class="flex flex-col justify-center items-center h-full">
    <h1 class="text-4xl text-primary uppercase font-bold">
      It looks like you are lost
    </h1>
    <button
      class="bg-primary text-black uppercase px-4 py-2 rounded-md my-5 font-semibold"
    >
      <router-link :to="{ name: 'HomeView' }">Go back to Home</router-link>
    </button>
    <img
      class="rounded-full w-1/3"
      src="../assets/404.jpg"
      alt="not found img"
    />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
