<script setup lang="ts">
import ReviewCard from "../../components/items/ReviewCard.vue";
import { useHotel } from "../../utils";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import { onMounted } from "vue";
const hotel = useHotel();
onMounted(() => {
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
});
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <ReviewCard
        v-for="item of hotel.reviews"
        :title="item.title"
        :date="item.publishedDate.split('T')[0]"
        :name="item.user.username"
        :rating="item.rating"
        :text="item.text"
        :avatar="item.user.avatar.medium"
      />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
