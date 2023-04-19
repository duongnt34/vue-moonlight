<template>
  <div class="bg-dark text-gray-100 flex justify-between md:hidden">
    <!-- logo -->
    <RouterLink
      :to="{ name: 'HomeView' }"
      class="block py-2 px-3 md:p-4 text-white font-bold uppercase"
      ><span class="font-semibold">
        <span class="text-white">Moon</span>
        <span class="text-primary">Light</span>
      </span></RouterLink
    >
    <!-- button -->
    <button
      class="py-2 px-3 md:p-4 focus:outline-none focus:bg-gray-700"
      @click="showSideBar = !showSideBar"
    >
      <font-awesome-icon class="h-5 w-5" icon="fa-solid fa-bars" />
    </button>
  </div>

  <!-- sidebar -->
  <div
    class="absolute inset-y-0 left-0 top-10 bg-dark text-blue-100 space-y-6 transform -translate-x-full md:relative md:translate-x-0 md:top-0 md:w-52 w-full transition duration-200 ease-in-out z-50"
    :class="{
      'translate-x-0': showSideBar,
    }"
  >
    <!-- logo -->
    <RouterLink
      :to="{ name: 'HomeView' }"
      class="uppercase text-white md:flex hidden items-center space-x-3 justify-center mt-10"
    >
      <img class="w-8 h-8" src="../../assets/logo.png" alt="logo" />
      <span class="text-2xl font-semibold">
        <span class="text-white">Moon</span>
        <span class="text-primary">Light</span>
      </span>
    </RouterLink>
    <!-- nav  -->
    <nav class="">
      <!-- menu -->
      <div class="text-gray-lighten">
        <ul class="">
          <li v-for="menu in menus">
            <RouterLink
              :to="menu.to"
              active-class="text-black border-r-2 border-primary bg-gradient-to-r from-transparent to-primary"
              class="flex justify-center space-x-5 my-5 text-lg items-center hover:text-white cursor-pointer p-2"
              @click="showSideBar = false"
            >
              <span>{{ menu.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
    <div></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

// navigation
const menus = ref([
  {
    name: "Home",
    to: { name: "HomeView" },
    current: true,
    icon: `fa-solid fa-house`,
  },
  {
    name: "Explore",
    to: { name: "ExploreView" },
    current: false,
    icon: `fa-solid fa-compass`,
  },
  {
    name: "Search",
    to: { name: "SearchView" },
    current: false,
    icon: `fa-solid fa-magnifying-glass`,
  },
  // {
  //   name: "Profile",
  //   to: { name: "ProfileView" },
  //   current: false,
  //   icon: `fa-solid fa-circle-user`,
  // },
]);

let showSideBar = ref(false);

const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
// .router-active-class {
//   border-right-width: 4px;
//   --tw-border-opacity: 1;
//   border-color: rgb(81 121 255 / var(--tw-border-opacity));
//   --tw-text-opacity: 1;
//   color: rgb(81 121 255 / var(--tw-text-opacity));
// }
</style>
