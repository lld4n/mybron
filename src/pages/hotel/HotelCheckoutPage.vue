<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import EstimatedBlock from "../../components/hotel/EstimatedBlock.vue";
import SummaryBlock from "../../components/hotel/SummaryBlock.vue";
import TotalBlock from "../../components/hotel/TotalBlock.vue";
// import WishesBlock from "../../components/hotel/WishesBlock.vue";
import CrossGreen from "../../assets/icons/cross-green.svg";
import GuestsBlock from "../../components/hotel/GuestsBlock.vue";
import DataBlock from "../../components/hotel/DataBlock.vue";
import { api, useHotel, useStore } from "../../utils";
import { useInter } from "../../utils/i18n";
import { useRouter } from "vue-router";
import Text from "../../components/ui/wrappers/Text.vue";
import { onMounted, ref } from "vue";
const hotel = useHotel();
const q = useInter();
const store = useStore();
const router = useRouter();
const handleShow = () => {
  show.value = false;
};
const show = ref(true);
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
  window.Telegram.WebApp.openTelegramLink("https://t.me/MoyabronBot");
  let guests;
  guests = [hotel.info];
  if (
    hotel.guests.lastName.length > 0 &&
    hotel.guests.firstName.length > 0 &&
    store.adultsCount === 2
  ) {
    guests.push(hotel.guests);
  } else {
    for (let i = 1; i < store.adultsCount; i++) {
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
  const data: {
    orderId: number;
  } = await api
    .post("order", {
      headers: {
        "Content-Type": "application/json",
        Authorization: store.auth,
      },
      body: JSON.stringify(body),
    })
    .json();
  if (data && data.orderId) {
    await router.push("/reservation/" + data.orderId);
  }
};
onMounted(() => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.secondary_bg_color || "";
  window.Telegram.WebApp.MainButton.text = q.i18n.hotel.checkout.page.qxmzpt;
  window.Telegram.WebApp.MainButton.onClick(() => {
    close();
  }).show();
});
</script>

<template>
  <Wrapper>
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
    <div :class="$style.footer" v-if="show">
      <Text :s="14" :l="18" :w="600" :c="$style.green"
        >Бот пришлет ссылку на оплату в чат</Text
      >
      <CrossGreen @click="handleShow" />
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
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 11px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid #0094114d;
  background-color: #f1fff4;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
}
.green {
  color: #009411;
}
</style>
