<script setup lang="ts">
import CarouselCount from "../components/CarouselCount.vue";
import Share from "../assets/icons/share.svg";
import RatingBlock from "../components/hotel/RatingBlock.vue";
const url =
  "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/08/collage-maker-07-aug-2023-01-43-pm-4128.jpg";

const sharePage = () => {
  window.Telegram.WebApp.requestContact((success, response) => {
    console.log(success, response);
  });
};
</script>

<template>
  <div :class="$style.carousel">
    <CarouselCount>
      <img :src="url" :class="$style.image" />
      <img :src="url" :class="$style.image" />
      <img :src="url" :class="$style.image" />
    </CarouselCount>
    <button :class="$style.share" @click="sharePage"><Share /></button>
  </div>
  <div :class="$style.content">
    <RatingBlock />
  </div>
</template>

<style module lang="scss">
.carousel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.share {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #00000066;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  flex: 0 0 100%;
  min-width: 0;
  height: 400px;
  object-fit: cover;
}
.content {
  background-color: var(--tg-theme-secondary-bg-color);
  z-index: 10;
  min-height: calc(100% - 380px);
  height: 100%;
  margin-top: 380px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
}
</style>
