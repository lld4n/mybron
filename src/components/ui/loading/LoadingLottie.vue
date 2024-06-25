<script setup lang="ts">
import Luggage from "../../../assets/loading/luggage.json";
import { LottieAnimation } from "lottie-web-vue";
</script>

<template>
  <LottieAnimation
    :animation-data="Luggage"
    :auto-play="true"
    :loop="true"
    :speed="1"
    :class="$style.loading"
  />
</template>

<style module lang="scss">
.loading {
  width: 128px;
  height: 128px;
}
</style>
