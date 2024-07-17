<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import MainInfo from "../../components/common/MainInfo.vue";
import { useInter } from "../../utils/i18n";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const q = useInter();
const router = useRouter();
onMounted(() => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.bg_color || "";
  window.Telegram.WebApp.MainButton.text = q.i18n.hotel.info.page.jcigyr;
  window.Telegram.WebApp.MainButton.onClick(() => {
    router.go(-1);
  }).show();
});
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <MainInfo />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 8px;
}
</style>
