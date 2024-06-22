<script setup lang="ts">
import StatusBlock from "../../components/hotel/StatusBlock.vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import ButtonsBlock from "../../components/hotel/ButtonsBlock.vue";
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <StatusBlock status="success" />
      <StatusBlock status="loading" />
      <StatusBlock status="cancel" />
      <StatusBlock status="fail" />
      <StatusBlock status="absence" />
      <ButtonsBlock />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  padding-bottom: 16px;
  flex-direction: column;
  gap: 8px;
}
</style>
