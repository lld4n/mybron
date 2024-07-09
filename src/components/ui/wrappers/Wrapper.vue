<script setup lang="ts">
import { useStore } from "../../../utils";
import Copy from "../../../assets/icons/copy.svg";
import CircleCheck from "../../../assets/cicle-check.svg";
import Text from "./Text.vue";
import { onMounted, onUnmounted, watch } from "vue";
interface Props {
  footer?: {
    click: () => void;
    text: string;
    desc?: string;
  };
}
const props = defineProps<Props>();
const store = useStore();

watch(
  () => props,
  () => {
    if (!props.footer) {
      window.Telegram.WebApp.MainButton.onClick(() => {});
      return;
    }
    window.Telegram.WebApp.MainButton.text = props.footer.text;
    window.Telegram.WebApp.MainButton.onClick(() => {
      if (!props.footer) return;
      props.footer.click();
    });
    window.Telegram.WebApp.MainButton.show();
  },
);

onMounted(() => {
  if (!props.footer) return;
  window.Telegram.WebApp.MainButton.text = props.footer.text;
  window.Telegram.WebApp.MainButton.onClick(() => {
    if (!props.footer) return;
    props.footer.click();
  });
  console.log(window.Telegram.WebApp.MainButton);
  window.Telegram.WebApp.MainButton.show();
});
onUnmounted(() => {
  window.Telegram.WebApp.MainButton.hide();
});
const handleClose = () => {
  if (store.message)
    store.setMessage({
      type: store.message.type,
      text: store.message.text,
      desc: store.message.desc,
      out: true,
    });
};
</script>

<template>
  <div>
    <slot></slot>
    <div
      :class="[
        $style.message,
        {
          [$style.out]: store.message.out,
        },
      ]"
      v-if="!!store.message"
    >
      <div :class="$style.content" @click="handleClose">
        <Copy v-if="store.message.type === 'copy'" />
        <CircleCheck v-if="store.message.type === 'linked'" />
        <div :class="$style.right">
          <Text :s="14" :l="18" :w="600" v-if="!!store.message.text">{{
            store.message.text
          }}</Text>
          <Text :s="14" :l="18" :w="400" v-if="!!store.message.desc">{{
            store.message.desc
          }}</Text>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  z-index: 100;
  padding: 12px 16px;
  background-color: var(--tg-theme-bg-color);
}
.btn {
  border-radius: 12px;
  padding: 14px 0;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.43px;
  font-weight: 600;
  width: 100%;
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
  &:disabled {
    opacity: 0.4;
  }
}
.message {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  padding: 12px 16px;
  animation: in_anim 0.2s ease-out;
}
.out {
  animation: out_anim 0.2s ease-out;
}
.content {
  cursor: pointer;
  display: flex;
  background-color: rgba(45, 45, 45, 0.8);
  padding: 10px 12px;
  border-radius: 12px;
  align-items: center;
  gap: 12px;
  color: white;
}
.right {
  display: flex;
  flex-direction: column;
}

@keyframes in_anim {
  from {
    bottom: -100%;
  }
  to {
    bottom: 0;
  }
}
@keyframes out_anim {
  from {
    bottom: 0;
  }
  to {
    bottom: -100%;
  }
}
</style>
