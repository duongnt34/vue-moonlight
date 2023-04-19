<template>
  <div class="tab-content" v-if="title == selectedTitle">
    <slot />
  </div>
</template>

<script setup>
import { inject } from "vue";

defineProps(["title"]);
const selectedTitle = inject("selectedTitle");
</script>

<style lang="scss" scoped></style>
