<script setup lang="ts">
import { useStore } from "../../../utils";
import Copy from "../../../assets/icons/copy.svg";
import CircleCheck from "../../../assets/cicle-check.svg";
import CrossGreen from "../../../assets/icons/cross-green.svg";
import Text from "./Text.vue";
import { ref } from "vue";
interface Props {
  click?: () => void;
  label?: string;
  description?: string;
}

defineProps<Props>();
const store = useStore();
const showDescription = ref(true);
const handleShowDescription = () => {
  showDescription.value = false;
};
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
  <div :class="$style.wrapper">
    <slot></slot>
    <div :class="$style.footer">
      <div :class="[$style.message]" v-if="!!store.message">
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
      <div :class="$style.desc" v-if="description && showDescription">
        <Text :s="14" :l="18" :w="600" :c="$style.green">{{ description }}</Text>
        <CrossGreen @click="handleShowDescription" />
      </div>
      <div :class="$style.container" v-if="click && label">
        <button :class="$style.btn" v-if="click && label" @click="click">
          {{ label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  height: 100%;
  min-height: 100%;
}
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
  position: absolute;
  top: calc(0% - 80px);
  left: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  padding: 12px 16px;
  animation: in_anim 0.2s ease-out;
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
  backdrop-filter: blur(20px);
}
.right {
  display: flex;
  flex-direction: column;
}

@keyframes in_anim {
  from {
    top: 100%;
  }
  to {
    top: calc(0% - 80px);
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
.container {
  z-index: 100;
  padding: 12px 16px 16px 16px;
  border-top: 1px solid var(--tg-theme-secondary-bg-color);
  background-color: var(--tg-theme-bg-color);
}
.desc {
  z-index: 100;
  background-color: #f1fff4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid #0094114d;
  color: #009411;
}
</style>
