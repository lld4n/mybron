<script setup lang="ts">
import StatusBlock from "../../components/hotel/StatusBlock.vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import ButtonsBlock from "../../components/hotel/ButtonsBlock.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  api,
  OrderDetailsResponse,
  OrderInfoDto,
  OrderInfoResponse,
  OrderServiceAccommodationDto,
  useStore,
} from "../../utils";
import EstimatedBlock from "../../components/hotel/EstimatedBlock.vue";
import TotalBlock from "../../components/hotel/TotalBlock.vue";
import SummaryBlock from "../../components/hotel/SummaryBlock.vue";
// import TotalBlock from "../../components/hotel/TotalBlock.vue";
// import SummaryBlock from "../../components/hotel/SummaryBlock.vue";
// import EstimatedBlock from "../../components/hotel/EstimatedBlock.vue";
const route = useRoute();
const store = useStore();
const info = ref<OrderInfoDto | null>(null);
const details = ref<OrderServiceAccommodationDto | null>(null);
onMounted(async () => {
  if (!store.auth) return;
  const bufferInfo: OrderInfoResponse = await api
    .get("order/" + route.params.id, {
      headers: {
        Authorization: store.auth,
      },
    })
    .json();
  info.value = bufferInfo.order;
  const bufferDetails: OrderDetailsResponse = await api
    .get("order/details?orderId=" + route.params.id, {
      headers: {
        Authorization: store.auth,
      },
    })
    .json();
  details.value = bufferDetails.order.services.services[0];
});
</script>

<template>
  <!--  TODO: случай загрузки и случай, когда ничего не нашлось-->
  <Wrapper>
    <div :class="$style.wrapper" v-if="!!info && !!details">
      <StatusBlock :id="info.id" :status="info.status" />
      <!--      TODO: категория-->
      <EstimatedBlock
        :in-time="info.checkInDate"
        :address="info.hotel.address"
        :check-in="info.checkInDate"
        :name="info.hotel.name"
        :check-out="info.checkOutDate"
        :category="3"
        :out-time="info.checkOutDate"
      />
      <ButtonsBlock
        :no-show-cancel="
          ['Аннулировано, без штрафа', 'Аннулировано, штраф'].includes(info.status)
        "
      />
      <SummaryBlock
        :cancel="details.cancellationPolicies"
        :name="details.offerName"
        :payment="details.paymentRecipient"
        :am="[]"
        :meals="details.meals.meals"
      />
      <TotalBlock
        :total="details.priceDetails.client.clientCurrency.gross.price"
        :vat="details.priceDetails.client.clientCurrency.gross.vatAmount"
        :name="details.offerName"
      />
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
