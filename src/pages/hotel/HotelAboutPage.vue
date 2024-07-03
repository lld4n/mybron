<script setup lang="ts">
import Block from "../../components/ui/wrappers/Block.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import { useHotel } from "../../utils";
import { useInter } from "../../utils/i18n";
const hotel = useHotel();
const q = useInter();
</script>

<template>
  <div :class="$style.wrapper">
    <Block>
      <div :class="$style.top">
        <Title>{{ q.i18n.hotel.about.page.vkysls }}</Title>
      </div>
      <div :class="$style.text">
        <template v-for="text of hotel.description.split('\n')"
          ><span>{{ text }}</span></template
        >
      </div>
    </Block>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding-top: 12px;
}
.top {
  padding: 24px 16px 8px;
}
.text {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 16px 16px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  color: var(--tg-theme-text-color);
}
</style>
