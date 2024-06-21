<script setup lang="ts">
import { useStore } from "../utils";
import Copy from "../assets/icons/copy.svg";
interface Props {
  footer?: {
    click: () => void;
    text: string;
  };
}
defineProps<Props>();
const store = useStore();
</script>

<template>
  <div>
    <slot></slot>
    <div :class="$style.footer">
      <div :class="$style.message" v-if="!!store.message">
        <div :class="$style.content" @click="store.setMessage(null)">
          <template v-if="store.message.type === 'copy'">
            <Copy />
            <div>{{ store.message.text }}</div>
          </template>
        </div>
      </div>
      <div :class="$style.block" v-if="!!footer">
        <button :class="$style.btn" @click="footer.click">{{ footer.text }}</button>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.footer {
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.block {
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
}
</style>
