<script setup lang="ts">
import MainInfo from "../../components/common/MainInfo.vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import { useInter } from "../../utils/i18n";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const q = useInter();
const router = useRouter();
onMounted(() => {
  window.Telegram.WebApp.MainButton.text = q.i18n.done;
  window.Telegram.WebApp.MainButton.onClick(() => {
    router.go(-1);
  }).show();
});
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <MainInfo :search="true" />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
