<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import Text from "../../components/ui/wrappers/Text.vue";
const Animation = defineAsyncComponent(
  () => import("../../components/ui/Animation.vue"),
);
import { defineAsyncComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useInter } from "../../utils/i18n";
const value = ref("");
const disabled = ref(true);
const router = useRouter();
const q = useInter();
watch(value, (v) => {
  disabled.value = v.length === 0;
});
</script>

<template>
  <Wrapper
    :footer="{
      text: q.i18n.settings.email.page.zsilhn,
      click: () => router.push('/settings/code/email'),
      disabled,
    }"
    :class="$style.wrapper"
  >
    <div :class="$style.block">
      <Animation type="mailbox" :c="$style.animation" :loop="false" />
    </div>
    <div :class="$style.top">
      <Text :s="28" :l="34" :w="700">{{ q.i18n.settings.email.page.sljjhv }}</Text>
      <Text :s="17" :l="22"
        >{{ q.i18n.settings.email.page.yqngtq }} {{
          q.i18n.settings.email.page.mxqrmc
        }}</Text
      >
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
