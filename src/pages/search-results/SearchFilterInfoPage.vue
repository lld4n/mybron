<script setup lang="ts">
import MainInfo from "../../components/common/MainInfo.vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Применить',
      click: () => $router.go(-1),
    }"
  >
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
