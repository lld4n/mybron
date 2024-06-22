<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
// flex: 0 0 44px; min-width: 0;
const [emblaRef] = emblaCarouselVue(
  {
    dragFree: true,
  },
  [WheelGesturesPlugin()],
);
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
