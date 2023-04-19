<template>
  <div class="tabs w-full">
    <ul class="tabs__header flex border-b-2 border-primary text-primary">
      <li
        class="cursor-pointer duration-300 ease-in-out p-2"
        :class="{
          ' text-black bg-primary': title == selectedTitle,
        }"
        v-for="title in tabTitles"
        :key="title"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup>
import { provide, ref, useSlots } from "vue";

defineProps();

const slots = useSlots();
const tabTitles = ref(slots.default().map((tab) => tab.props.title));
const selectedTitle = ref(tabTitles.value[0]);
provide("selectedTitle", selectedTitle);
</script>

<style lang="scss" scoped>
.tabs__header {
  overflow-x: auto;
}
/* Hide the vertical scrollbar */
::-webkit-scrollbar {
  display: none; /* Hide the scrollbar */
}

/* Hide the horizontal scrollbar */
::-webkit-scrollbar-horizontal {
  display: none; /* Hide the scrollbar */
}
</style>
