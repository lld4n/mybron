<script setup lang="ts">
import StatusBlock from "../../components/hotel/StatusBlock.vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import ButtonsBlock from "../../components/hotel/ButtonsBlock.vue";
// import TotalBlock from "../../components/hotel/TotalBlock.vue";
// import SummaryBlock from "../../components/hotel/SummaryBlock.vue";
// import EstimatedBlock from "../../components/hotel/EstimatedBlock.vue";
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <StatusBlock status="success" />
      <StatusBlock status="loading" />
      <StatusBlock status="cancel" />
      <StatusBlock status="fail" />
      <StatusBlock status="absence" />
      <!--      <EstimatedBlock />-->
      <!--      <EstimatedBlock :rating="1" />-->
      <ButtonsBlock />
      <ButtonsBlock :no-show-cancel="true" />
      <!--      <SummaryBlock />-->
      <!--      <TotalBlock />-->
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
