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

const activeStyleClass = ref(`border-b-2 border-b-gray-lighten`);
</script>

<style lang="scss" scoped></style>
