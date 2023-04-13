<template>
  <div class="flex justify-center" v-if="pages.length">
    <button
      class="bg-dark-lighten text-white px-4 py-2 rounded-lg hover:scale-110 hover:brightness-110 transition duration-300 ease-in-out"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      Prev
    </button>
    <ul class="flex">
      <li v-for="(page, index) in pages" :key="index">
        <button
          type="button"
          class="bg-dark-lighten text-white px-4 py-2 rounded-lg ml-3 hover:scale-110 hover:brightness-110 transition duration-300 ease-in-out"
          :class="{
            'bg-white text-dark-lighten': page === currentPage,
            'cursor-default bg-transparent pointer-events-none':
              typeof page != 'number',
          }"
          @click="$emit('update:currentPage', page)"
        >
          {{ page }}
        </button>
      </li>
    </ul>
    <button
      v-if="pages.length"
      class="bg-dark-lighten text-white px-4 py-2 rounded-lg ml-3 hover:scale-110 hover:brightness-110 transition duration-300 ease-in-out"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  totalPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

defineEmits(["update:currentPage"]);

const pages = computed(() => {
  const range = [];
  for (let i = 1; i <= props.totalPage; i++) {
    if (
      i == 1 ||
      i == props.totalPage ||
      (i >= props.currentPage - 1 && i <= props.currentPage + 1)
    ) {
      range.push(i);
    } else if (
      (i == props.currentPage - 2 || i == props.currentPage + 2) &&
      range[range.length - 1] !== "..."
    ) {
      range.push("...");
    }
  }
  return range;
});
</script>

<style lang="scss" scoped></style>
