<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import Text from "../../components/ui/wrappers/Text.vue";
import Animation from "../../assets/loading/mailbox.json";
import { LottieAnimation } from "lottie-web-vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const value = ref("");
const disabled = ref(true);
const router = useRouter();
watch(value, (v) => {
  disabled.value = v.length === 0;
});
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Применить',
      click: () => router.push('/settings/code/email'),
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
      <Text :s="28" :l="34" :w="700">Привязать почту</Text>
      <Text :s="17" :l="22">На вашу почту поступит письмо с кодом подтверждения</Text>
    </div>
    <div :class="$style.content">
      <input
        type="email"
        :class="$style.input"
        v-model="value"
        placeholder="name@example.com"
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
  padding: 12px 16px;
  color: var(--tg-theme-text-color);
  font-size: 20px;
  line-height: 24px;
  border-radius: 12px;
  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
</style>
