<template>
  <Transition name="modal-animation">
    <div
      v-show="modalActive"
      class="modal flex justify-center items-center h-screen w-screen fixed top-0 left-0 backdrop-blur-sm bg-black/30"
    >
      <Transition name="modal-animation-inner">
        <div
          v-show="modalActive"
          class="modal-inner relative max-w-4/5 w-4/5 h-3/5 shadow-md bg-white px-[64px] py-[16px]"
        >
          <font-awesome-icon
            class="absolute top-3 right-3 text-2xl cursor-pointer hover:text-red-800"
            @click="close"
            icon="far fa-times-circle"
          ></font-awesome-icon>
          <!-- Modal Content -->
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps(["modalActive"]);
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<style lang="scss" scoped></style>
