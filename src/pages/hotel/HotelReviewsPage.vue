<script setup lang="ts">
import ReviewCard from "../../components/items/ReviewCard.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <ReviewCard />
    <ReviewCard />
    <ReviewCard />
    <ReviewCard />
    <ReviewCard />
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
