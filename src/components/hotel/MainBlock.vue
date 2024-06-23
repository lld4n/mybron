<script setup lang="ts">
import RatingView from "../ui/views/RatingView.vue";
import StarsView from "../ui/views/StarsView.vue";
import CopyButton from "../ui/CopyButton.vue";
import AmenityCarousel from "./AmenityCarousel.vue";
import Walking from "../../assets/icons/walking.svg";
import Point from "../../assets/icons/point.svg";
import Text from "../ui/wrappers/Text.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <RatingView :level="10" type="big" :c="$style.rating" />
    <div :class="$style.top">
      <StarsView :level="5" type="small" />
      <div :class="$style.title">Отель Метрополь</div>
    </div>
    <AmenityCarousel />
    <div :class="$style.meters">
      <Text :s="14" :l="18" :c="$style.item">
        <Walking />
        2 мин пешком до центра
        <span>800 м</span>
      </Text>
      <Text :s="14" :l="18" :c="$style.item">
        <Point />
        2 мин пешком до центра
        <span>800 м</span>
      </Text>
    </div>
    <div :class="$style.map">
      <img src="https://i.ibb.co/yNtsMP8/2024-06-21-21-12-03.jpg" :class="$style.img" />
      <CopyButton text="Театральный пр-д, д.2, Москва" title="Адрес" />
    </div>
  </div>
</template>

<style module lang="scss">
.meters {
  display: flex;
  padding: 20px 16px 0;
  flex-direction: column;
  gap: 8px;
}
.item {
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    color: var(--tg-theme-hint-color);
  }
  path {
    fill: var(--tg-theme-text-color);
  }
  &:last-child {
    svg {
      width: 13px;
      height: 15px;
    }
  }
  svg {
    flex: 0 0 16px;
  }
}
.wrapper {
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
  padding: 16px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  padding: 16px;
}
.img {
  width: 100%;
  height: auto;
  margin: 16px 0 8px;
  border-radius: 8px;
}
</style>
