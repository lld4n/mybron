<script setup lang="ts">
import { useStore } from "../../../utils";
import Copy from "../../../assets/icons/copy.svg";
import Text from "./Text.vue";
interface Props {
  footer?: {
    click: () => void;
    text: string;
  };
}
defineProps<Props>();
const store = useStore();
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
    <div :class="$style.footer">
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
      <div :class="$style.block" v-if="!!footer">
        <button :class="$style.btn" @click="footer.click">{{ footer.text }}</button>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.footer {
  min-height: 1px;
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
}
.message {
  position: absolute;
  top: -64px;
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
    top: 100%;
  }
  to {
    top: -64px;
  }
}
@keyframes out_anim {
  from {
    top: -64px;
  }
  to {
    top: 100%;
  }
}
</style>
