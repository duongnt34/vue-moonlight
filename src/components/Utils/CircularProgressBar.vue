<template>
  <div class="flex-shrink-0">
    <div class="circle-wrap">
      <div class="circle">
        <div class="mask half">
          <div class="fill"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.circle-wrap {
  width: 150px;
  height: 150px;
  background: #fefcff;
  border-radius: 50%;
  border: 1px solid #cdcbd0;

  .circle {
    .mask,
    .fill {
      width: 150px;
      height: 150px;
      position: absolute;
      border-radius: 50%;
    }
  }
}

.mask,
.fill {
  clip: rect(0px, 75px, 150px, 0px);
  background-color: #227ded;
}
</style>
