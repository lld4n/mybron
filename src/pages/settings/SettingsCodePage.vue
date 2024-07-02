<script setup lang="ts">
import Animation from "../../assets/loading/speech.json";
import { LottieAnimation } from "lottie-web-vue";
import Text from "../../components/ui/wrappers/Text.vue";
import { onMounted, ref, watch } from "vue";
const n1 = ref("");
const n2 = ref("");
const n3 = ref("");
const n4 = ref("");
const timer = ref(30);
const i1 = ref<HTMLInputElement>();
const i2 = ref<HTMLInputElement>();
const i3 = ref<HTMLInputElement>();
const i4 = ref<HTMLInputElement>();
onMounted(() => {
  setInterval(() => {
    timer.value--;
  }, 1000);
});
function isNumber(str: string) {
  return /^\d+$/.test(str);
}

watch(n1, (v) => {
  if (!isNumber(v)) {
    n1.value = "";
  } else if (v.length > 1) {
    n1.value = v[v.length - 1];
  } else {
    n1.value = v;
  }
  if (i2.value) i2.value.focus();
});
watch(n2, (v) => {
  if (!isNumber(v)) {
    n2.value = "";
  } else if (v.length > 1) {
    n2.value = v[v.length - 1];
  } else {
    n2.value = v;
  }
  if (i3.value) i3.value.focus();
});
watch(n3, (v) => {
  if (!isNumber(v)) {
    n3.value = "";
  } else if (v.length > 1) {
    n3.value = v[v.length - 1];
  } else {
    n3.value = v;
  }
  if (i4.value) i4.value.focus();
});
watch(n4, (v) => {
  if (!isNumber(v)) {
    n4.value = "";
  } else if (v.length > 1) {
    n4.value = v[v.length - 1];
  } else {
    n4.value = v;
  }
});
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.top">
      <LottieAnimation
        :animation-data="Animation"
        :auto-play="true"
        :loop="false"
        :speed="1"
        :class="$style.animation"
      />
      <div :class="$style.info">
        <Text :s="28" :l="34" :w="700">Введите код</Text>
        <Text :s="17" :l="22">Отправили код на почту [TODO: ПОЧТА]</Text>
      </div>
      <div :class="$style.inputs">
        <input
          type="text"
          v-model="n1"
          inputmode="numeric"
          :class="$style.input"
          ref="i1"
        />
        <input
          type="text"
          v-model="n2"
          inputmode="numeric"
          :class="$style.input"
          ref="i2"
        />
        <input
          type="text"
          v-model="n3"
          inputmode="numeric"
          :class="$style.input"
          ref="i3"
        />
        <input
          type="text"
          v-model="n4"
          inputmode="numeric"
          :class="$style.input"
          ref="i4"
        />
      </div>
    </div>
    <Text
      :s="17"
      :l="22"
      :w="600"
      :class="[
        $style.link,
        {
          [$style.disabled]: timer > 0,
        },
      ]"
      >Отправить код повторно
      <template v-if="timer > 0">0:{{ timer > 10 ? timer : "0" + timer }}</template>
    </Text>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.link {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  cursor: pointer;
  color: var(--tg-theme-link-color);
  transition: opacity 0.1s ease-out;
  padding: 14px 0 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.disabled {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.4;
}
.animation {
  width: 96px;
  height: 96px;
}
.top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
}
.info {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 320px;
  padding: 20px 0 24px;
}
.inputs {
  display: flex;
  gap: 8px;
  align-items: center;
}
.input {
  width: 40px;
  height: 48px;
  background-color: var(--tg-theme-bg-color);
  border: 2px solid var(--tg-theme-bg-color);
  text-align: center;
  border-radius: 12px;
  font-size: 20px;
  line-height: 24px;
  color: var(--tg-theme-text-color);
  &:focus {
    border: 2px solid var(--tg-theme-button-color);
  }
}
</style>
