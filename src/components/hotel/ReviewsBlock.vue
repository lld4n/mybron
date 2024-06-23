<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import { useInter } from "../../utils/i18n";
import HotelButton from "./HotelButton.vue";
import ReviewCard from "../items/ReviewCard.vue";
const q = useInter();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>{{ q.i18n.hotel.reviews.name }}</Title>
    </div>
    <div>
      <ReviewCard :mini="true" />
      <ReviewCard :mini="true" />
    </div>
    <HotelButton
      :text="'48 ' + q.i18n.hotel.reviews.button"
      :click="() => $router.push('/hotel/1/reviews')"
    />
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 12px;
}
</style>
