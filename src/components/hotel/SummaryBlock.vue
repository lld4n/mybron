<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
// import AmenityCarousel from "./AmenityCarousel.vue";
import Title from "../ui/wrappers/Title.vue";
import Text from "../ui/wrappers/Text.vue";
const url = "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg";
</script>

<template>
  <Block>
    <div :class="$style.wrapper">
      <div :class="$style.top">
        <img :src="url" :class="$style.img" />
        <div :class="$style.info">
          <Title>Супериор с двуспальной кроватью</Title>
          <Text :s="17" :l="22" :c="$style.gray">26 м², одна большая кровать</Text>
        </div>
      </div>
      <div :class="$style.table">
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">Питание</Text>
          <Text :s="17" :l="22" :c="$style.right">Без питания</Text>
        </div>
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">Отмена брони</Text>
          <Text :s="17" :l="22" :class="[$style.right, $style.green]"
            >Бесплатно до 17 июня</Text
          >
        </div>
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">Оплата</Text>
          <Text :s="17" :l="22" :c="$style.right">Оплата картой</Text>
        </div>
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">Гости</Text>
          <Text :s="17" :l="22" :c="$style.right"
            >Константин Рыськов, Анна Константинопольская</Text
          >
        </div>
      </div>
      <!--      <AmenityCarousel />-->
    </div>
  </Block>
</template>

<style module lang="scss">
.wrapper {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.top {
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.gray {
  color: var(--tg-theme-hint-color);
}
.img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}
.table {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.item {
  display: flex;
  gap: 20px;
}
.left {
  min-width: 120px;
  color: var(--tg-theme-hint-color);
}
.green {
  color: #34c759;
}
</style>
