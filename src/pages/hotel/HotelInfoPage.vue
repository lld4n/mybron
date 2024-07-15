<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import MainInfo from "../../components/common/MainInfo.vue";
import { useInter } from "../../utils/i18n";
const q = useInter();
</script>

<template>
  <Wrapper :footer="() => $router.go(-1)" :text="q.i18n.hotel.info.page.jcigyr">
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
