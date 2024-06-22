<script setup lang="ts">
import Copy from "../../assets/icons/copy.svg";
import { useStore } from "../../utils";
import { useInter } from "../../utils/i18n";
interface Props {
  text: string;
  title: string;
}
const props = defineProps<Props>();
const store = useStore();
const q = useInter();
const copy = async () => {
  await navigator.clipboard.writeText(props.text);
  store.setMessage({
    type: "copy",
    text: props.title + " " + q.i18n.copy,
  });
};
</script>

<template>
  <button :class="$style.btn" @click="copy">
    <span>{{ text }}</span>
    <Copy />
  </button>
</template>

<style module lang="scss">
.btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  span {
    color: var(--tg-theme-link-color);
  }
  svg {
    width: 16px;
    height: 16px;
  }
  path {
    fill: var(--tg-theme-link-color);
  }
}
</style>
