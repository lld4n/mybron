<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import EstimatedBlock from "../../components/hotel/EstimatedBlock.vue";
import SummaryBlock from "../../components/hotel/SummaryBlock.vue";
import TotalBlock from "../../components/hotel/TotalBlock.vue";
import GuestsBlock from "../../components/hotel/GuestsBlock.vue";
import DataBlock from "../../components/hotel/DataBlock.vue";
import { api, useHotel, useOrder, useStore } from "../../utils";
import { useInter } from "../../utils/i18n";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import WishesBlock from "../../components/hotel/WishesBlock.vue";
import CardBlock from "../../components/hotel/CardBlock.vue";
const hotel = useHotel();

console.log("CHECKOUT", hotel.offer, hotel.room);
const q = useInter();
const store = useStore();
const order = useOrder();
const router = useRouter();
const close = async () => {
  if (!hotel.offer || !store.auth) return;
  if (order.firstName.length === 0 || order.lastName.length === 0) {
    store.setMessage({
      type: "contact",
      text: q.i18n.hotel.checkout.page.vliqps,
      desc: q.i18n.hotel.checkout.page.uaudli,
    });
    return;
  }
  if (hotel.offer.guaranteeType !== "contract") {
    if (
      order.cardCVV.length !== 3 ||
      order.cardNumber.length !== 16 ||
      order.cardOwner.length === 0 ||
      order.cardTerm.length !== 5
    ) {
      store.setMessage({
        type: "contact",
        text: "Необходимо указать данные карты",
      });
      return;
    }
    if (order.phone.length === 0 || order.email.length === 0) {
      store.setMessage({
        type: "contact",
        text: "Необходимо указать контактные данные",
      });
      return;
    }
  }

  let guests = [
    {
      firstName: order.firstName,
      lastName: order.lastName,
    },
  ];
  if (
    order.guestLastName.length > 0 &&
    order.guestFirstName.length > 0 &&
    store.adultsCount === 2
  ) {
    guests.push({
      firstName: order.guestFirstName,
      lastName: order.guestLastName,
    });
  } else {
    for (let i = 1; i < store.adultsCount; i++) {
      guests.push({
        firstName: order.firstName,
        lastName: order.lastName,
      });
    }
  }
  const body: any = {
    accommodations: [
      {
        offerCode: hotel.offer.code,
        guests: guests,
      },
    ],
    comment: order.wish,
  };

  let orderId: number = 0;

  if (
    hotel.offer.guaranteeType === "contract" &&
    hotel.offer.paymentRecipient === "HOTEL"
  ) {
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
    if (data) orderId = data.orderId;
  } else if (
    hotel.offer.guaranteeType === "contract" &&
    hotel.offer.paymentRecipient === "AGENCY"
  ) {
    window.Telegram.WebApp.showAlert("Данный метод оплаты пока что не поддерживается");
  } else {
    body.cardDetails = {
      number: Number(order.cardNumber),
      cardHolder: order.cardOwner,
      expirationMonth: Number(order.cardTerm.split("/")[0]),
      expirationYear: Number("20" + order.cardTerm.split("/")[1]),
      cvv: order.cardCVV,
      cardHolderEmail: order.email,
      cardHolderPhone: order.phone,
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
    if (data) orderId = data.orderId;
  }

  if (orderId) {
    window.Telegram.WebApp.openTelegramLink("https://t.me/MoyabronBot");
    await router.push("/reservation/" + orderId);
  } else {
    window.Telegram.WebApp.showAlert("Произошла ошибка");
  }
};
onMounted(() => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.secondary_bg_color || "";
});
</script>

<template>
  <Wrapper
    :click="close"
    :description="
      hotel.offer?.guaranteeType === 'contract' &&
      hotel.offer?.paymentRecipient === 'AGENCY'
        ? 'Мы пришлем ссылку на оплату в бота'
        : ''
    "
    :label="
      hotel.offer?.guaranteeType === 'contract' &&
      hotel.offer?.paymentRecipient === 'AGENCY'
        ? 'Перейти к оплате'
        : 'Забронировать'
    "
  >
    <div :class="$style.wrapper">
      <EstimatedBlock
        v-if="!!hotel.time"
        :category="hotel.category"
        :in-time="hotel.time.timeIn"
        :address="hotel.address"
        :check-in="hotel.time.checkIn.split(':').slice(0, 2).join(':')"
        :name="hotel.name"
        :check-out="hotel.time.checkOut.split(':').slice(0, 2).join(':')"
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
      <TotalBlock
        :title="
          hotel.offer?.guaranteeType === 'contract' &&
          hotel.offer?.paymentRecipient === 'AGENCY'
            ? 'Оплата сейчас'
            : 'Оплата при заселении'
        "
        v-if="!!hotel.offer"
        :total="hotel.offer.priceDetails.client.clientCurrency.gross.price"
        :vat="hotel.offer.priceDetails.client.clientCurrency.gross.vatAmount"
        :name="hotel.offer.name"
      />
      <CardBlock v-if="!!hotel.offer && hotel.offer.guaranteeType !== 'contract'" />
      <DataBlock />
      <GuestsBlock v-if="store.adultsCount > 1" />
      <WishesBlock />
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
