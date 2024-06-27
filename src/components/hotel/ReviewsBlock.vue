<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import { useInter } from "../../utils/i18n";
import HotelButton from "./HotelButton.vue";
import ReviewCard from "../items/ReviewCard.vue";
import { HotelReviewDto } from "../../utils";
const q = useInter();
interface Props {
  reviews: HotelReviewDto[];
}

defineProps<Props>();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>{{ q.i18n.hotel.reviews.name }}</Title>
    </div>
    <div>
      <ReviewCard
        v-for="item of reviews.slice(0, 2)"
        :mini="true"
        :avatar="item.user.avatar.medium"
        :title="item.title"
        :date="item.publishedDate.split('T')[0]"
        :name="item.user.username"
        :rating="item.rating"
        :text="item.text"
      />
    </div>
    <HotelButton
      :text="reviews.length + ' ' + q.i18n.hotel.reviews.button"
      :click="() => $router.push('/hotel/1/reviews')"
    />
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 12px;
}
</style>
