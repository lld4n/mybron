<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import StarsView from "../ui/views/StarsView.vue";
import Text from "../ui/wrappers/Text.vue";
import CopyButton from "../ui/CopyButton.vue";
import RatingView from "../ui/views/RatingView.vue";
import { useInter } from "../../utils/i18n";
interface Props {
  rating?: number;
}

defineProps<Props>();
const q = useInter();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <StarsView :level="4" type="small" :class="$style.stars" />
      <Text
        :s="20"
        :l="24"
        :w="700"
        @click="$router.push('/hotel/1')"
        v-if="!rating"
        :c="$style.link"
        >Отель метрополь</Text
      >
      <Text :s="28" :l="31" :w="700" v-if="!!rating">Отель метрополь</Text>
      <CopyButton title="Адрес" text="Театральный пр-д, д.2, Москва" />
      <RatingView v-if="!!rating" :level="rating" type="big" :c="$style.rating" />
    </div>
    <div :class="$style.dates">
      <div :class="$style.item">
        <Text :s="13" :l="18" :c="$style.header">{{ q.i18n.hotel.estimated.in }}</Text>
        <Text :s="20" :l="24">1 июня, 2024</Text>
        <Text :s="14" :l="18">после 15:00</Text>
      </div>
      <div :class="$style.item">
        <Text :s="13" :l="18" :c="$style.header">{{ q.i18n.hotel.estimated.out }}</Text>
        <Text :s="20" :l="24">52 июня, 2024</Text>
        <Text :s="14" :l="18">до 15:00</Text>
      </div>
    </div>
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 16px 16px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}
.stars {
  svg {
    width: 12px;
    height: 12px;
  }
  path {
    fill: #ff9500;
  }
}
.link {
  cursor: pointer;
  color: var(--tg-theme-link-color);
}
.rating {
  position: absolute;
  top: 0;
  right: 16px;
}
.dates {
  padding: 20px 16px;
  display: flex;
}
.item {
  padding: 0 24px;
  border-right: 1px solid var(--tg-theme-secondary-bg-color);
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
    border-right: none;
  }
}
.header {
  color: var(--tg-theme-hint-color);
  padding-bottom: 4px;
}
</style>
