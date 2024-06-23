<script setup lang="ts">
import CarouselCount from "../../components/ui/carousel/CarouselCount.vue";
import Share from "../../assets/icons/share.svg";
import RatingBlock from "../../components/hotel/RatingBlock.vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import AboutBlock from "../../components/hotel/AboutBlock.vue";
import AdditionalBlock from "../../components/hotel/AdditionalBlock.vue";
import MainBlock from "../../components/hotel/MainBlock.vue";
import InfoBlock from "../../components/hotel/InfoBlock.vue";
import ReviewsBlock from "../../components/hotel/ReviewsBlock.vue";
import AmenityBlock from "../../components/hotel/AmenityBlock.vue";
import ConditionsBlock from "../../components/hotel/ConditionsBlock.vue";
const url = "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg";

const sharePage = () => {};
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Номера от 17 000 ₽',
      click: () => $router.push('/room/1'),
    }"
  >
    <div :class="$style.carousel">
      <CarouselCount>
        <img :src="url" :class="$style.image" />
        <img :src="url" :class="$style.image" />
        <img :src="url" :class="$style.image" />
      </CarouselCount>
      <button :class="$style.share" @click="sharePage"><Share /></button>
    </div>
    <div :class="$style.content">
      <MainBlock />
      <InfoBlock />
      <RatingBlock />
      <AboutBlock />
      <ReviewsBlock />
      <AmenityBlock />
      <ConditionsBlock />
      <AdditionalBlock />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.carousel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.share {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #00000066;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  flex: 0 0 100%;
  min-width: 0;
  height: 400px;
  object-fit: cover;
}
.content {
  background-color: var(--tg-theme-secondary-bg-color);
  z-index: 10;
  min-height: calc(100% - 380px);
  height: 100%;
  margin-top: 380px;
  padding-bottom: 84px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
}
</style>
