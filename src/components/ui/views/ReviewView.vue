<script setup lang="ts">
import ReviewRating5 from "../../../assets/reviews/5.svg";
import ReviewRating4 from "../../../assets/reviews/4.svg";
import ReviewRating3 from "../../../assets/reviews/3.svg";
import ReviewRating2 from "../../../assets/reviews/2.svg";
import ReviewRating1 from "../../../assets/reviews/1.svg";
import ReviewRating0 from "../../../assets/reviews/0.svg";
interface Props {
  rating: number;
}

defineProps<Props>();
</script>

<template>
  <ReviewRating5 v-if="rating === 5" />
  <ReviewRating4 v-if="rating === 4" />
  <ReviewRating3 v-if="rating === 3" />
  <ReviewRating2 v-if="rating === 2" />
  <ReviewRating1 v-if="rating === 1" />
  <ReviewRating0 v-if="rating === 0" />
</template>

<style lang="scss"></style>
