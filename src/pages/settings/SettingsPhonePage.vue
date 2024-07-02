<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import Text from "../../components/ui/wrappers/Text.vue";
import Animation from "../../assets/loading/phone.json";
import { LottieAnimation } from "lottie-web-vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import FlagView from "../../components/ui/views/FlagView.vue";
const value = ref("");
const disabled = ref(true);
const router = useRouter();
function isNumber(str: string) {
  return /^\d+$/.test(str);
}
watch(value, (v, o) => {
  disabled.value = v.length === 0;
  if (v.length > o.length) {
    let ans = "";
    let i = 0;
    for (const l of v) {
      i++;
      if (isNumber(l)) {
        ans += l;
      }
      if (i === 3 || i === 7) ans += " ";
      if (i > 11) break;
    }
    value.value = ans;
  }
});
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Применить',
      click: () => router.push('/settings/code/phone'),
      disabled,
    }"
    :class="$style.wrapper"
  >
    <div :class="$style.block">
      <LottieAnimation
        :animation-data="Animation"
        :auto-play="true"
        :loop="false"
        :speed="1"
        :class="$style.animation"
      />
    </div>
    <div :class="$style.top">
      <Text :s="28" :l="34" :w="700">Привязать номер</Text>
      <Text :s="17" :l="22">На ваш номер поступит SMS с кодом подтверждения</Text>
    </div>
    <div :class="$style.content">
      <div :class="$style.left">
        <FlagView code="RU" />
        <Text :s="20" :l="24">+7</Text>
      </div>
      <input
        type="text"
        :class="$style.input"
        v-model="value"
        inputmode="numeric"
        placeholder="000 000 0000"
      />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.animation {
  width: 96px;
  height: 96px;
}
.block {
  padding: 24px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  text-align: center;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  width: 100%;
}
.input {
  width: 100%;
  background-color: var(--tg-theme-bg-color);
  padding: 12px 16px 12px 12px;
  color: var(--tg-theme-text-color);
  font-size: 20px;
  line-height: 24px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
.left {
  padding: 12px;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  background-color: var(--tg-theme-bg-color);
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  border-right: 1px solid var(--tg-theme-secondary-bg-color);
}
</style>
