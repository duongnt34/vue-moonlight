<template>
  <TabWrapper class="border-2 border-primary rounded-md" id="filmViewTabs">
    <AsyncTabContent title="Castings" class="w-full">
      <TabCasting :film="film" />
    </AsyncTabContent>
    <AsyncTabContent title="Reviews" class="w-full">
      <TabReview :film="film" />
    </AsyncTabContent>
    <AsyncTabContent title="Backdrops" class="w-full">
      <TabBackdrop :film="film" />
    </AsyncTabContent>
    <AsyncTabContent title="Logo" class="w-full">
      <TabLogo :film="film" />
    </AsyncTabContent>
    <AsyncTabContent title="Poster" class="w-full">
      <TabPoster :film="film" />
    </AsyncTabContent>
  </TabWrapper>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";
import TabWrapper from "./Tab/TabWrapper.vue";
import TabReview from "./Tab/TabReview.vue";
import TabCasting from "./Tab/TabCasting.vue";
import TabBackdrop from "./Tab/TabBackdrop.vue";
import TabLogo from "./Tab/TabLogo.vue";
import TabPoster from "./Tab/TabPoster.vue";

const props = defineProps(["film"]);

//only load when needed
const AsyncTabContent = defineAsyncComponent(() =>
  import("./Tab/TabContent.vue")
);
</script>

<style lang="scss">
#filmViewTabs {
  .tabs__header {
    li {
      font-size: larger;
    }
    li:hover {
      color: white;
    }
  }
}
</style>
