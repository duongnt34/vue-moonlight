import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useGeneralStore = defineStore("GeneralStore", {
  state: () => {
    return {
      currentFilmType: useStorage("currentFilmType"),
    };
  },
  actions: {
    changeCurrentFilmType(type) {
      this.currentFilmType = type;
    },
  },
  getters: () => {},
});
