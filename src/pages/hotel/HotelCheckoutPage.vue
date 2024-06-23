<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import EstimatedBlock from "../../components/hotel/EstimatedBlock.vue";
import SummaryBlock from "../../components/hotel/SummaryBlock.vue";
import TotalBlock from "../../components/hotel/TotalBlock.vue";
import WishesBlock from "../../components/hotel/WishesBlock.vue";
import GuestsBlock from "../../components/hotel/GuestsBlock.vue";
import DataBlock from "../../components/hotel/DataBlock.vue";
const close = () => {
  window.Telegram.WebApp.close();
};
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Оплатить',
      click: () => close(),
      desc: 'Приложение закроется, бот пришлет ссылку на оплату',
    }"
  >
    <div :class="$style.wrapper">
      <EstimatedBlock :rating="5" />
      <SummaryBlock />
      <DataBlock />
      <GuestsBlock />
      <WishesBlock />
      <TotalBlock />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 12px 0 110px;
  gap: 8px;
}
</style>
