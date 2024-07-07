<script setup lang="ts">
import StatusBlock from "../../components/hotel/StatusBlock.vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import ButtonsBlock from "../../components/hotel/ButtonsBlock.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { api, useStore } from "../../utils";
// import TotalBlock from "../../components/hotel/TotalBlock.vue";
// import SummaryBlock from "../../components/hotel/SummaryBlock.vue";
// import EstimatedBlock from "../../components/hotel/EstimatedBlock.vue";
const route = useRoute();
const store = useStore();
onMounted(async () => {
  if (!store.auth) return;
  const info = await api
    .get("order/" + route.params.id, {
      headers: {
        Authorization: store.auth,
      },
    })
    .json();
  const details = await api
    .get("order/details?orderId=" + route.params.id, {
      headers: {
        Authorization: store.auth,
      },
    })
    .json();

  console.log(info, details);
});
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
