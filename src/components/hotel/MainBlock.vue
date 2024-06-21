<script setup lang="ts">
import RatingView from "../RatingView.vue";
import StarsView from "../StarsView.vue";
import CopyButton from "../CopyButton.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.rating">
      <RatingView :level="10" type="big" />
    </div>
    <div :class="$style.top">
      <StarsView :level="5" type="small" />
      <div :class="$style.title">Отель Метрополь</div>
    </div>
    <div :class="$style.map">
      <img src="https://i.ibb.co/yNtsMP8/2024-06-21-21-12-03.jpg" :class="$style.img" />
      <CopyButton text="Театральный пр-д, д.2, Москва" />
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 16px;
  border-radius: 16px;
  background-color: var(--tg-theme-bg-color);
  position: relative;
}
.rating {
  position: absolute;
  top: 0;
  right: 16px;
}
.top {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  svg {
    width: 12px;
    height: 12px;
  }
  path {
    fill: #ff9500;
  }
}
.title {
  font-size: 28px;
  line-height: 31px;
  font-weight: 700;
}
.map {
  margin-top: 20px;
}
.img {
  width: 100%;
  height: auto;
  margin: 16px 0 8px;
}
</style>
