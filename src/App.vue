<template>
  <div class="relative min-h-screen md:flex font-roboto bg-dark">
    <SideBar />

    <!-- content -->
    <main class="flex-1 min-w-0 min-h-screen border-l border-gray-darken">
      <router-view :key="route.fullPath"></router-view>
    </main>

    <!-- <RightBar /> -->
  </div>
</template>

<script setup>
import SideBar from "/src/components/SideBar/SideBar.vue";
import axios from "axios";
import RightBar from "./components/RightBar/RightBar.vue";
import { useGeneralStore } from "./stores/GeneralStore";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();

const generalStore = useGeneralStore();
const currentFilmType = generalStore.currentFilmType;
</script>

<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
