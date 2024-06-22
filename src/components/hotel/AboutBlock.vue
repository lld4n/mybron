<script setup lang="ts">
import Block from "../ui/Block.vue";
import HotelButton from "./HotelButton.vue";
</script>

<template>
  <Block title="Об отеле">
    <div :class="$style.text">
      Сетевой пятизвездочный отель на Новинском бульваре, в 400 м от станции метро
      Смоленская. Расстояние до аэропорта Внуково составляет 29 км, а до Киевского
      железнодорожного вокзала — 2 км. Большой театр находится в 3 км, Государственная
      Третьяковская галерея — в 4 км, Храм Василия Блаженного — в 3 км.<br />Для
      размещения предлагаются 300 номеров различных категорий: Стандарт, Супериор,
      Делюкс, Люкс. Здесь же можно забронировать самый большой в России Люкс площадью
      490 кв. м. В каждом номере имеются большие удобные кровати, современная техника,
      отделанная мрамором ванная комната с отдельным душем и отапливаемым полом.<br />На
      территории отеля работает ресторан OVO, где подают блюда современной итальянской
      кухни, японский ресторан Megumi и бар The Lounge.
    </div>
    <HotelButton text="Полное описание" :click="() => $router.push('/hotel/1/about')" />
  </Block>
</template>

<style module lang="scss">
.text {
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: var(--tg-theme-text-color);
  padding: 0 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
