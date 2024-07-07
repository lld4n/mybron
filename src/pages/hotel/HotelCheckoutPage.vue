<script setup lang="ts">
//TODO: все блоки
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import EstimatedBlock from "../../components/hotel/EstimatedBlock.vue";
import SummaryBlock from "../../components/hotel/SummaryBlock.vue";
import TotalBlock from "../../components/hotel/TotalBlock.vue";
// import WishesBlock from "../../components/hotel/WishesBlock.vue";
import GuestsBlock from "../../components/hotel/GuestsBlock.vue";
import DataBlock from "../../components/hotel/DataBlock.vue";
import { api, useHotel, useStore } from "../../utils";
import { useInter } from "../../utils/i18n";
const hotel = useHotel();
const q = useInter();
const store = useStore();
console.log("OFFER", hotel.offer);
const close = async () => {
  if (!hotel.offer || !store.auth) return;

  if (hotel.info.firstName.length === 0 || hotel.info.lastName.length === 0) {
    store.setMessage({
      type: "contact",
      text: q.i18n.hotel.checkout.page.vliqps,
      desc: q.i18n.hotel.checkout.page.uaudli,
    });
    return;
  }
  let guests;
  guests = [hotel.info];
  if (
    hotel.guests.lastName.length > 0 &&
    hotel.guests.firstName.length > 0 &&
    store.adultsCount === 2
  ) {
    guests.push(hotel.guests);
  } else {
    for (let i = 1; i <= store.adultsCount; i++) {
      guests.push(hotel.info);
    }
  }
  const body = {
    accommodations: [
      {
        offerCode: hotel.offer.code,
        guests: guests,
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
  window.Telegram.WebApp.openTelegramLink("t.me/MoyabronBot");
};
</script>

<template>
  <Wrapper
    :footer="{
      text: q.i18n.hotel.checkout.page.qxmzpt,
      click: () => close(),
      desc:
        q.i18n.hotel.checkout.page.wtqrbn + ', ' + q.i18n.hotel.checkout.page.gimmdn,
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
        :am="hotel.room?.availableAmenities.availableAmenities || []"
        :meals="hotel.offer.meals.meals"
        :no-show-guests="true"
        :image="hotel.room?.photos.photos[0].url || ''"
        :size="hotel.room?.size"
      />
      <DataBlock />
      <GuestsBlock v-if="store.adultsCount > 1" />
      <!--      <WishesBlock />-->
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
