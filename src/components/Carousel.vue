<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

const [emblaRef] = emblaCarouselVue({
  dragFree: true,
});
</script>

<template>
  <div :class="$style.embla" ref="emblaRef">
    <div :class="$style.container">
      <slot></slot>
    </div>
  </div>
</template>

<style module lang="scss">
.embla {
  overflow: hidden;
}
.container {
  display: flex;
}
</style>
