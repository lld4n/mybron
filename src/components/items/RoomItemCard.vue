<script setup lang="ts">
import Text from "../ui/wrappers/Text.vue";
import { RenderRoomItem } from "../../pages/hotel/types.ts";
import { useStore } from "../../utils";
interface Props {
  item: RenderRoomItem;
  click: (code: string) => void;
}
const store = useStore();

defineProps<Props>();
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.top">
      <Text :s="20" :l="24" :w="600">{{ item.price }} ₽</Text>
      <Text :s="14" :l="18" v-if="!!store.out"
        >{{ store.adultsCount + store.children.length }} гостя,
        {{
          Math.ceil((store.out?.getTime() - store.in.getTime()) / (1000 * 60 * 60 * 24))
        }}
        ночь</Text
      >
    </div>
    <div :class="$style.list">
      <Text :s="14" :l="18" v-if="item.meals.length === 0">Без питания</Text>
      <Text :s="14" :l="18" :c="$style.green" v-if="item.meals.length > 0">{{
        item.meals[0].name
      }}</Text>
      <Text :s="14" :l="18" v-if="item.cancel.length > 0">Платная отмена</Text>
      <Text :s="14" :l="18" v-if="item.cancel.length === 0" :c="$style.green"
        >Бесплатная отмена</Text
      >
      <Text :s="14" :l="18" v-if="item.payment === 'AGENCY'">Предоплата картой</Text>
      <Text :s="14" :l="18" v-if="item.payment === 'HOTEL'" :c="$style.green"
        >Оплата на месте</Text
      >
    </div>
    <button :class="$style.btn" @click="() => click(item.code)">
      <Text :s="17" :l="22" :w="600">Выбрать</Text>
    </button>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px;
  border: 1px solid var(--tg-theme-secondary-bg-color);
  border-radius: 12px;
}
.top {
  display: flex;
  flex-direction: column;
}
.list {
  margin-top: 16px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.btn {
  min-width: 170px;
  width: 100%;
  padding: 14px 0;
  border-radius: 12px;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.green {
  color: #34c759;
}
</style>
