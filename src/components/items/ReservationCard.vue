<script setup lang="ts">
import Text from "../ui/wrappers/Text.vue";
import DateView from "../ui/views/DateView.vue";
import StatusView from "../ui/views/StatusView.vue";
import { dates } from "../../utils";
import { useInter } from "../../utils/i18n";
// Новый, В обработке, Ожидает подтверждения, Не подтвержден, Ожидает подтверждения клиента, Ожидает аннуляции
// Подтвержден
// Аннулировано, без штрафа Аннулировано, штраф
interface Props {
  status: "success" | "fail" | "loading";
  id: number;
  // photo: string;
  inDate: Date;
  outDate: Date;
  city: string;
  name: string;
  // guests: number;
}
defineProps<Props>();
const q = useInter();
const url = "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg";
</script>

<template>
  <div :class="$style.wrapper" @click="$router.push('/reservation/' + id)">
    <div :class="$style.left">
      <div :class="$style.status">
        <StatusView :status="status" />
      </div>
      <img :src="url" :class="$style.img" />
    </div>
    <div :class="$style.right">
      <Text :s="17" :l="22" :w="500">
        <DateView
          :left="dates(inDate, q.i18n, { week: true })"
          :right="dates(outDate, q.i18n, { week: true })"
        />
      </Text>
      <div :class="$style.info">
        <Text :s="13" :l="18">{{ city }}</Text>
        <Text :s="13" :l="18">•</Text>
        <Text :s="13" :l="18">{{ name }}</Text>
      </div>
      <!--      <Text :s="11" :l="13" :c="$style.bottom">1 номер для 2 взрослых</Text>-->
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  cursor: pointer;
  padding: 0 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  &:last-child {
    .right {
      border-bottom: none;
    }
  }
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
.img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
}
.right {
  padding: 12px 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
}
.info {
  display: flex;
  gap: 4px;
  align-items: center;
}
.bottom {
  margin-top: 7px;
  color: var(--tg-theme-hint-color);
}
.left {
  position: relative;
}
.status {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--tg-theme-bg-color);
  svg {
    width: 14px;
    height: 14px;
  }
}
</style>
