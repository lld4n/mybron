<script setup lang="ts">
import Text from "./wrappers/Text.vue";

interface Props {
  name: string;
  placeholder: string;
}

defineProps<Props>();

const [model] = defineModel();
</script>

<template>
  <div :class="$style.label">
    <Text :s="17" :l="22" :c="$style.left">{{ name }}</Text>
    <div :class="$style.right">
      <input
        type="text"
        v-model="model"
        :placeholder="placeholder"
        :class="$style.input"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.label {
  display: flex;
  align-items: center;
  gap: 10px;
  &:last-child {
    .right {
      border-bottom: none;
    }
  }
}
.left {
  min-width: 90px;
}
.right {
  flex: 1;
  padding: 11px 16px 11px 0;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
}
.input {
  width: 100%;
  background-color: var(--tg-theme-bg-color);
  font-size: 17px;
  line-height: 22px;
  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
</style>
