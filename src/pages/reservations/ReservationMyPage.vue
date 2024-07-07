<script setup lang="ts">
import Block from "../../components/ui/wrappers/Block.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import Shape from "../../assets/icons/shape.svg";
import { useInter } from "../../utils/i18n";
import Text from "../../components/ui/wrappers/Text.vue";
import ReservationCard from "../../components/items/ReservationCard.vue";
import { onMounted, ref } from "vue";
import {
  api,
  GetOrderDto,
  GetOrdersResponse,
  OrderDetailsResponse,
  OrderDto,
  useStore,
} from "../../utils";
const store = useStore();
const list = ref<GetOrderDto[]>([]);
const detailsMap = ref<{ [key: number]: OrderDto }>({});
async function fetchOrders() {
  const data: GetOrdersResponse = await api
    .get("orders", {
      headers: {
        Authorization: store.auth,
      },
    })
    .json();
  list.value = data.orders;
  console.log(data);
}
onMounted(async () => {
  if (!store.auth) return;
  await fetchOrders();
  for (const item of list.value) {
    const details: OrderDetailsResponse = await api
      .get("order/details?orderId=" + item.id, {
        headers: {
          Authorization: store.auth,
        },
      })
      .json();
    detailsMap.value[item.id] = details.order;
  }
});

const q = useInter();
</script>

<template>
  <div :class="$style.wrapper">
    <Block>
      <div :class="$style.top">
        <Title>{{ q.i18n.reservation.my }}</Title>
      </div>
      <div :class="$style.center" v-if="list.length === 0">
        <Shape />
        <Text :s="17" :l="22">{{ q.i18n.reservation.zero }}</Text>
      </div>
      <div :class="$style.content">
        <ReservationCard status="success" />
        <ReservationCard status="fail" />
        <ReservationCard status="loading" />
      </div>
    </Block>
  </div>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 4px;
}
.wrapper {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.center {
  color: var(--tg-theme-hint-color);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  text-align: center;
  svg {
    width: 48px;
    height: 40px;
  }
  path {
    fill: var(--tg-theme-hint-color);
  }
}
</style>
