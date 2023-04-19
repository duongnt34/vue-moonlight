<template>
  <div class="relative min-h-screen md:flex font-sourcesanspro bg-dark">
    <!-- Nav -->
    <SideBar />

    <!-- content -->
    <main class="flex-1 min-w-0 min-h-screen border-l border-gray-darken">
      <router-view :key="route.fullPath"></router-view>
    </main>

    <!-- Footer -->
  </div>
  <footer
    class="w-full p-2 bg-dark border-t border-gray-darken text-sm text-primary flex justify-between items-center"
  >
    <p><font-awesome-icon :icon="['far', 'copyright']" /> 2023 duongnt.</p>
    <ul class="flex flex-wrap gap-2">
      <li class="hover:scale-110">
        <button type="button">
          <font-awesome-icon :icon="['fab', 'facebook']" />
        </button>
      </li>
      <li class="hover:scale-110">
        <button type="button">
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </button>
      </li>
      <li class="hover:scale-110">
        <button type="button">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </button>
      </li>
      <li class="hover:scale-110">
        <button type="button">
          <font-awesome-icon :icon="['fab', 'github']" />
        </button>
      </li>
    </ul>
  </footer>
</template>

<script setup>
import SideBar from "/src/components/SideBar/SideBar.vue";
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
