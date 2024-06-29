<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import EstimatedBlock from "../../components/hotel/EstimatedBlock.vue";
import SummaryBlock from "../../components/hotel/SummaryBlock.vue";
import TotalBlock from "../../components/hotel/TotalBlock.vue";
import WishesBlock from "../../components/hotel/WishesBlock.vue";
import GuestsBlock from "../../components/hotel/GuestsBlock.vue";
import DataBlock from "../../components/hotel/DataBlock.vue";
import { api, useHotel, useStore } from "../../utils";
const hotel = useHotel();
const store = useStore();
console.log("OFFER", hotel.offer);
const close = async () => {
  if (!hotel.offer || !store.auth) return;
  const body = {
    accommodations: [
      {
        offerCode: hotel.offer.code,
        guests: [
          {
            firstName: "lldan",
            lastName: "lldan",
          },
        ],
      },
    ],
  };
  const data = await api
    .post("order", {
      headers: {
        "Content-Type": "application/json",
        Authorization: store.auth,
      },
      body: JSON.stringify(body),
    })
    .json();
  console.log(data);
  // window.Telegram.WebApp.openTelegramLink("https://t.me/MoyabronBot");
};
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Оплатить',
      click: () => close(),
      desc: 'Приложение закроется, бот пришлет ссылку на оплату',
    }"
  >
    <div :class="$style.wrapper">
      <EstimatedBlock
        v-if="!!hotel.time"
        :category="hotel.category"
        :in-time="hotel.time.timeIn"
        :address="hotel.address"
        :check-in="hotel.time.checkIn"
        :name="hotel.name"
        :check-out="hotel.time.checkOut"
        :out-time="hotel.time.timeOut"
      />
      <SummaryBlock
        v-if="!!hotel.offer"
        :cancel="hotel.offer.cancellationPolicies"
        :name="hotel.offer.name"
        :payment="hotel.offer.paymentRecipient"
        :am="hotel.amenities"
        :meals="hotel.offer.meals.meals"
        :no-show-guests="true"
      />
      <DataBlock />
      <GuestsBlock />
      <WishesBlock />
      <TotalBlock
        v-if="!!hotel.offer"
        :total="hotel.offer.priceDetails.client.clientCurrency.gross.price"
        :vat="hotel.offer.priceDetails.client.clientCurrency.gross.vatAmount"
        :name="hotel.offer.name"
      />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 12px 0 110px;
  gap: 8px;
}
</style>
