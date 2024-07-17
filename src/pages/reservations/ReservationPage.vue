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
import LoadingSimple from "../../components/ui/loading/LoadingSimple.vue";
import Text from "../../components/ui/wrappers/Text.vue";
import Refresh from "../../assets/refresh.svg";
const route = useRoute();
const store = useStore();
const q = useInter();
const loading = ref(true);
const error = ref(false);
const info = ref<OrderInfoDto | null>(null);
const details = ref<OrderServiceAccommodationDto | null>(null);
onMounted(async () => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.secondary_bg_color || "";
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
  if (!store.auth) {
    error.value = true;
    return;
  }
  try {
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
    loading.value = false;
  } catch (e) {
    error.value = true;
  }
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
const handleRefresh = () => {
  window.location.reload();
};
</script>

<template>
  <div :class="$style.center" v-if="error">
    <!--    TODO: перевод-->
    <Text :s="17" :l="22" :w="600">Не удалось загрузить</Text>
    <Text :s="17" :l="22" :g="true"
      >Попробуйте обновить страницу, или проверьте соединение.</Text
    >
    <Text :s="17" :l="22" :c="$style.reply" @click="handleRefresh"
      ><Refresh /> Обновить</Text
    >
  </div>
  <div :class="$style.center" v-if="loading">
    <LoadingSimple />
  </div>
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
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  text-align: center;
  align-items: center;
}
</style>
