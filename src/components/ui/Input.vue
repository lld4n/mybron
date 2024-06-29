<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  label: string;
  id: string;
  type?: string;
  active?: boolean;
}

const [model] = defineModel();
const focus = () => {
  active.value = true;
};
const blur = () => {
  // @ts-ignore
  if (model.value.length === 0) active.value = false;
};
const props = defineProps<Props>();
const active = ref(props.active || false);
</script>

<template>
  <label :for="id" :class="$style.label">
    <span
      :class="[
        $style.placeholder,
        {
          [$style.active]: active,
        },
      ]"
      >{{ label }}</span
    >
    <input
      :type="type ? type : 'text'"
      :id="id"
      :class="$style.input"
      v-model="model"
      @focus="focus"
      @blur="blur"
    />
  </label>
</template>

<style module lang="scss">
.label {
  width: 100%;
  background-color: var(--tg-theme-bg-color);
  height: 48px;
  position: relative;
}
.input {
  width: 100%;
  background-color: var(--tg-theme-bg-color);
  padding: 18px 0 8px;
  font-size: 17px;
  line-height: 22px;
  color: var(--tg-theme-text-color);
  border-bottom: 1px solid var(--tg-theme-hint-color);
}
.placeholder {
  color: var(--tg-theme-hint-color);
  position: absolute;
  font-size: 17px;
  line-height: 22px;
  font-weight: 400;
  transition: all 0.3s ease;
  top: 18px;
  left: 0;
}
.active {
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  top: 0;
}
</style>
