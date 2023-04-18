<template>
  <div class="accordion text-white bg-dark-lighten">
    <div class="flex justify-between">
      <p>Title</p>
      <button :aria-expanded="isExpanded" @click="toggle">+</button>
    </div>
    <Transition name="fade">
      <div v-if="isExpanded">
        <p>Content</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isExpanded = ref(false);
const toggle = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style lang="scss" scoped>
.fade-enter-from {
  max-height: 0;
}
.fade-enter-to {
  max-height: 10px;
}

.fade-leave-from {
  max-height: 10px;
}
.fade-leave-to {
  max-height: 0;
}
.fade-leave-active,
.fade-enter-active {
  transition-property: max-height;
  transition-duration: 0.5s;
  overflow: hidden;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;
}
</style>
