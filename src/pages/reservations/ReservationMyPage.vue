<script setup lang="ts">
import Block from "../../components/ui/wrappers/Block.vue";
import Shape from "../../assets/icons/shape.svg";
import { useInter } from "../../utils/i18n";
import Text from "../../components/ui/wrappers/Text.vue";
import ReservationCard from "../../components/items/ReservationCard.vue";
import { onMounted, ref } from "vue";
import { fetchOrders, GetOrderDto, useStore } from "../../utils";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";

const store = useStore();
const list = ref<GetOrderDto[]>([]);

onMounted(async () => {
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
  if (!store.auth) return;
  list.value = await fetchOrders(store.auth);
});

const q = useInter();
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <Text :s="28" :l="34" :w="700" :c="$style.top">{{ q.i18n.reservation.my }}</Text>
      <Block>
        <div :class="$style.center" v-if="list.length === 0">
          <Shape />
          <Text :s="17" :l="22">{{ q.i18n.reservation.zero }}</Text>
        </div>
        <div :class="$style.content">
          <template v-for="item of list">
            <ReservationCard
              :id="item.id"
              :in-date="new Date(item.checkInDate)"
              :out-date="new Date(item.checkOutDate)"
              :city="item.hotel.city.name"
              :name="item.hotel.name"
              :status="
                item.status === 'Подтвержден'
                  ? 'success'
                  : ['Аннулировано, без штрафа', 'Аннулировано, штраф'].includes(
                        item.status,
                      )
                    ? 'fail'
                    : 'loading'
              "
            />
          </template>
        </div>
      </Block>
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
