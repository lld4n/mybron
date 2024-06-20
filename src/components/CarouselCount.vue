<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { onMounted, ref } from "vue";
const count = ref(0);
const selected = ref(0);
const [emblaRef, emblaApi] = emblaCarouselVue(
  {
    dragFree: false,
  },
  [WheelGesturesPlugin()],
);

onMounted(() => {
  if (!emblaApi || !emblaApi.value) return;
  const update = () => {
    if (!emblaApi || !emblaApi.value) return;
    count.value = emblaApi.value.scrollSnapList().length;
    selected.value = emblaApi.value.selectedScrollSnap() + 1;
  };
  update();
  emblaApi.value.on("select", update);
  emblaApi.value.on("reInit", update);
});
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.embla" ref="emblaRef">
      <div :class="$style.container">
        <slot></slot>
      </div>
    </div>
    <div :class="$style.count">{{ selected }} • {{ count }}</div>
  </div>
</template>

<style module lang="scss">
.embla {
  overflow: hidden;
}
.container {
  display: flex;
}
.wrapper {
  position: relative;
}
.count {
  position: absolute;
  background-color: #00000080;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 6px;
  font-size: 11px;
  line-height: 13px;
  font-weight: 400;
  border-radius: 10px;
  color: white;
}
</style>
