<script setup lang="ts">
import StatusBlock from "../../components/hotel/StatusBlock.vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import ButtonsBlock from "../../components/hotel/ButtonsBlock.vue";
import { computed, onMounted, ref } from "vue";
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
import { useInter } from "../../utils/i18n";
const route = useRoute();
const store = useStore();
const q = useInter();
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
const inOutDate = computed(() => {
  const ans = {
    inTime: "",
    outTime: "",
    inCheck: "",
    outCheck: "",
  };
  if (!info.value) return ans;
  const inDate = new Date(info.value.checkInDate);
  const outDate = new Date(info.value.checkOutDate);
  ans.inTime = inDate.toLocaleDateString(q.i18n.slug, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  ans.outTime = outDate.toLocaleDateString(q.i18n.slug, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  ans.inCheck = inDate.toLocaleTimeString(q.i18n.slug, {
    hour: "numeric",
    minute: "numeric",
  });
  ans.outCheck = outDate.toLocaleTimeString(q.i18n.slug, {
    hour: "numeric",
    minute: "numeric",
  });
  return ans;
});
</script>

<template>
  <!--  TODO: случай загрузки и случай, когда ничего не нашлось-->
  <Wrapper>
    <div :class="$style.wrapper" v-if="!!info && !!details">
      <StatusBlock :id="info.id" :status="info.status" />
      <!--      TODO: категория-->
      <EstimatedBlock
        :in-time="inOutDate.inTime"
        :address="info.hotel.address"
        :check-in="inOutDate.inCheck"
        :name="info.hotel.name"
        :check-out="inOutDate.outCheck"
        :category="3"
        :out-time="inOutDate.outTime"
      />
      <ButtonsBlock
        :id="info.id"
        :no-show-cancel="
          ['Аннулировано, без штрафа', 'Аннулировано, штраф'].includes(info.status)
        "
      />
      <!--      TODO: удобства-->
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
  padding: 8px 0 16px 0;
  flex-direction: column;
  gap: 8px;
}
</style>
