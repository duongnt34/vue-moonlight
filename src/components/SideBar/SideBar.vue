<template>
  <div class="bg-dark text-gray-100 flex justify-between md:hidden">
    <!-- logo -->
    <a href="#" class="block p-4 text-white font-bold">Moonlight</a>
    <!-- button -->
    <button
      class="p-4 focus:outline-none focus:bg-gray-700"
      @click="showSideBar = !showSideBar"
    >
      <font-awesome-icon class="h-5 w-5" icon="fa-solid fa-bars" />
    </button>
  </div>

  <!-- sidebar -->
  <div
    class="absolute inset-y-0 left-0 bg-dark text-blue-100 w-64 space-y-6 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out z-10"
    :class="{
      'translate-x-0': showSideBar,
    }"
  >
    <!-- logo -->
    <a
      href="#"
      class="uppercase text-white md:flex hidden items-center space-x-3 justify-center mt-10"
    >
      <img class="w-8 h-8" src="../../assets/logo.png" alt="logo" />
      <span class="text-2xl font-semibold">
        <span class="text-white">Moon</span>
        <span class="text-primary">Light</span>
      </span>
    </a>
    <!-- nav  -->
    <nav class="pl-7">
      <!-- menu -->
      <div class="text-gray-lighten">
        <p class="uppercase text-white text-lg font-medium mb-5">Menu</p>
        <div class="pl-7">
          <div v-for="menu in menus">
            <RouterLink
              :to="menu.to"
              class="space-x-5 my-5 flex text-lg items-center hover:text-white cursor-pointer"
              @click="showSideBar = false"
            >
              <font-awesome-icon :icon="menu.icon" fixed-width />
              <span>{{ menu.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- personal -->
      <!-- <div class="text-gray-lighten">
        <p class="uppercase text-white text-lg font-medium mb-5">Personal</p>
        <div class="pl-7">
          <div v-for="personal in personals">
            <RouterLink
              :to="personal.to"
              class="space-x-5 my-5 flex text-lg items-center hover:text-white cursor-pointer"
              @click="showSideBar = false"
            >
              <font-awesome-icon :icon="personal.icon" fixed-width />
              <span class="ml-5">{{ personal.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div> -->

      <!-- general -->
      <div class="text-gray-lighten">
        <p class="uppercase text-white text-lg font-medium mb-5">General</p>
        <div class="pl-7">
          <div v-for="general in generals">
            <RouterLink
              :to="general.to"
              class="space-x-5 my-5 flex text-lg items-center hover:text-white cursor-pointer"
              @click="showSideBar = false"
            >
              <font-awesome-icon :icon="general.icon" fixed-width />
              <span class="ml-5">{{ general.name }}</span>
            </RouterLink>
          </div>
        </div>
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
]);

const personals = ref([
  {
    name: "Bookmarked",
    to: { name: "BookmarkedView" },
    current: false,
    icon: `fa-solid fa-bookmark`,
  },
  {
    name: "History",
    to: { name: "HistoryView" },
    current: false,
    icon: `fa-solid fa-clock-rotate-left`,
  },
]);

const generals = ref([
  {
    name: "Profile",
    to: { name: "ProfileView" },
    current: false,
    icon: `fa-solid fa-circle-user`,
  },
  // {
  //   name: "Login",
  //   to: "",
  //   current: false,
  //   icon: `fa-solid fa-right-to-bracket`,
  // },
]);

let showSideBar = ref(false);

const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
.router-active-class {
  border-right-width: 4px;
  --tw-border-opacity: 1;
  border-color: rgb(81 121 255 / var(--tw-border-opacity));
  --tw-text-opacity: 1;
  color: rgb(81 121 255 / var(--tw-text-opacity));
}
</style>
