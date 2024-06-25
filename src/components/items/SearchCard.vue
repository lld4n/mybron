<script setup lang="ts">
import Text from "../ui/wrappers/Text.vue";
import Apartment from "../../assets/icons/apartment.svg";
import Point from "../../assets/icons/point.svg";
import { useInter } from "../../utils/i18n";

export type Item = { type: ItemType; id: number; name: string };
type ItemType = "city" | "hotel";

interface Props {
  click: (item: Item) => void;
  id: number;
  name: string;
  city?: string;
  type: ItemType;
  noShow?: boolean;
}

defineProps<Props>();
const q = useInter();
</script>

<template>
  <div
    v-if="!noShow"
    :class="$style.item"
    @click="
      () =>
        click({
          type,
          name,
          id,
        })
    "
  >
    <Apartment v-if="type === 'hotel'" />
    <Point v-if="type === 'city'" />
    <div :class="$style.info">
      <div :class="$style.left">
        <Text :s="17" :l="22">{{ name }}</Text>
        <Text :s="14" :l="18" :g="true" v-if="city">{{ city }}</Text>
        <Text :s="14" :l="18" :g="true" v-if="!city">{{ q.i18n.search.unknown }}</Text>
      </div>
      <Text :s="14" :l="18" :g="true">{{ q.i18n.search.unknown }}</Text>
    </div>
  </div>
</template>

<style module lang="scss">
.item {
  display: flex;
  gap: 16px;
  align-items: center;
  padding-left: 16px;
  cursor: pointer;
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
  &:last-child {
    .info {
      border-bottom: none;
    }
  }
}
.info {
  padding: 10px 16px 10px 0;
  display: flex;
  gap: 16px;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
  flex: 1;
  align-items: center;
  overflow: hidden;
}
.left {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
