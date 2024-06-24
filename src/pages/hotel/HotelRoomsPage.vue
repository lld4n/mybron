<script setup lang="ts">
import Text from "../../components/ui/wrappers/Text.vue";
import Carousel from "../../components/ui/carousel/Carousel.vue";
import UpDown from "../../assets/icons/up-down.svg";
import RoomCard from "../../components/items/RoomCard.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <div :class="$style.info">
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="14" :l="18" :w="600">Отель Метрополь</Text>
            <Text :s="12" :l="16" :c="$style.text">31 мая — 8 июня, 2 взрослых</Text>
          </div>
        </div>
      </div>
      <Carousel>
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="12" :l="16" :c="$style.text">Стоимость</Text>
            <Text :s="14" :l="18" :w="600">Любая</Text>
          </div>
          <UpDown />
        </div>
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="12" :l="16" :c="$style.text">Стоимость</Text>
            <Text :s="14" :l="18" :w="600">Любая</Text>
          </div>
          <UpDown />
        </div>
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="12" :l="16" :c="$style.text">Стоимость</Text>
            <Text :s="14" :l="18" :w="600">Любая</Text>
          </div>
          <UpDown />
        </div>
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="12" :l="16" :c="$style.text">Стоимость</Text>
            <Text :s="14" :l="18" :w="600">Любая</Text>
          </div>
          <UpDown />
        </div>
      </Carousel>
    </div>
    <div :class="$style.content">
      <RoomCard />
      <RoomCard />
      <RoomCard />
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}
.info {
  padding: 12px 0;
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.item {
  flex: 0 0 auto;
  min-width: 0;
  padding: 5px 10px;
  background-color: var(--tertiary-fill-background);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-right: 8px;
  &:first-child {
    margin-left: 16px;
  }
  &:last-child {
    margin-right: 16px;
  }
  path {
    fill: var(--tg-theme-text-color);
  }
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.text {
  color: var(--tg-theme-hint-color);
}
.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px;
}
</style>
