<script setup lang="ts">
import Wrapper from "../../components/Wrapper.vue";
import MainInfo from "../../components/common/MainInfo.vue";
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Применить',
      click: () => $router.go(-1),
    }"
  >
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
