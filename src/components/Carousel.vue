<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";

const [emblaRef] = emblaCarouselVue({
  dragFree: true,
});
</script>

<template>
  <div class="embla" ref="emblaRef">
    <div class="embla__container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
}
</style>
