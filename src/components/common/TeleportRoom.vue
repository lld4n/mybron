<script setup lang="ts">
import { dates, HotelOfferCancellationPolicyDto } from "../../utils";
import { InfoTypeRoom } from "../items/RoomItemCard.vue";
import Cross from "../../assets/room-cross.svg";
import Dot from "../../assets/room-dot.svg";
import Text from "../ui/wrappers/Text.vue";
import { computed } from "vue";
import { useInter } from "../../utils/i18n";
const q = useInter();
interface Props {
  item: InfoTypeRoom | null;
  cancel: HotelOfferCancellationPolicyDto | null;
  show: boolean;
  close: () => void;
}

const props = defineProps<Props>();

const cancelDate = computed(() => {
  if (!props.cancel) return;
  const time = new Date(props.cancel?.penaltyDateTime);
  let ans = dates(time, q.i18n) + " ";
  ans += time.getHours() + ":" + time.getMinutes();
  return ans;
});
</script>

<template>
  <Teleport to="body">
    <!--          TODO: перевод-->
    <div :class="$style.wrapper" v-if="show && item" @click="close">
      <div :class="$style.content" @click.stop="() => {}">
        <div :class="$style.top">
          <Text :s="22" :l="28" :w="600">{{ item.title }}</Text>
          <Cross @click="close" :class="$style.cross" />
        </div>
        <Text :s="17" :l="22" :class="$style.text" v-if="item.text.length > 0">
          {{ item.text }}
        </Text>
        <div :class="$style.list" v-if="item.list.length > 0">
          <div :class="$style.item" v-for="label of item.list">
            <Dot />
            <Text :s="17" :l="22" :c="$style.label">{{ label }}</Text>
          </div>
        </div>
        <div
          :class="$style.cancel"
          v-if="!!cancelDate && item.list.length === 0 && item.text.length === 0"
        >
          <div :class="$style.cancel__item">
            <div :class="[$style.tab, $style.green]" />
            <div :class="$style.right">
              <Text :s="17" :l="22" :w="500">Бесплатная отмена</Text>
              <Text :s="17" :l="22" :g="true">До {{ cancelDate }}</Text>
            </div>
          </div>
          <div :class="$style.cancel__item">
            <div :class="[$style.tab, $style.red]" />
            <div :class="$style.right">
              <Text :s="17" :l="22" :w="500">Штраф 100%</Text>
              <Text :s="17" :l="22" :g="true">С {{ cancelDate }}</Text>
            </div>
          </div>
        </div>
        <div :class="$style.footer">
          <button @click="close" :class="$style.btn">
            <Text :s="17" :l="22" :w="600">Понятно</Text>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style module lang="scss">
.wrapper {
  cursor: pointer;
  position: fixed;
  background-color: #00000080;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  animation: fade-in 0.3s forwards;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.content {
  cursor: default;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: var(--tg-theme-bg-color);
  border-radius: 16px 16px 0 0;
  animation: transform-in 0.3s forwards;
}
@keyframes transform-in {
  from {
    bottom: -50%;
  }
  to {
    bottom: 0;
  }
}
.top {
  display: flex;
  align-items: flex-start;
  padding: 16px 16px 12px 16px;
  div {
    flex: 1;
  }
}
.cross {
  path {
    fill: var(--tg-theme-subtitle-text-color);
  }
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
}

.footer {
  border-top: 1px solid var(--tg-theme-secondary-bg-color);
  padding: 14px 16px;
}
.btn {
  width: 100%;
  background-color: var(--tertiary-fill-background);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
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
}

.text {
  padding: 0 16px 16px 16px;
}
.list {
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  padding-bottom: 16px;
}
.item {
  display: flex;
  align-items: center;
  gap: 19px;
}
.label {
  padding: 11px 16px 11px 0;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
  &:last-child {
    border-bottom: none;
  }
}
.cancel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px 16px;
  &__item {
    gap: 12px;
    display: flex;
    align-items: center;
  }
}
.tab {
  height: 40px;
  width: 3px;
  border-radius: 2px;
}
.green {
  background-color: #34c759;
}
.red {
  background-color: #ff3b30;
}
</style>
