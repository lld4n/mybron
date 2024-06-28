<script setup lang="ts">
import Text from "../../components/ui/wrappers/Text.vue";
import Carousel from "../../components/ui/carousel/Carousel.vue";
import UpDown from "../../assets/icons/up-down.svg";
import RoomCard from "../../components/items/RoomCard.vue";
import { dates, guests, useHotel, useStore } from "../../utils";
import { onMounted, ref } from "vue";
import { fetchHotelInfo } from "./fetchHotelInfo.ts";
import { useRoute } from "vue-router";
import LoadingSimple from "../../components/ui/loading/LoadingSimple.vue";
import { RenderRoom, RenderRoomItem } from "./types.ts";
const store = useStore();
const hotel = useHotel();
const route = useRoute();
const loading = ref(true);
const render = ref<RenderRoom[]>([]);
const subtitle = () => {
  let ans = dates(store.in) + " — " + dates(store.out!);
  ans += ", " + guests(store.adultsCount, store.children);
  return ans;
};

onMounted(async () => {
  if (hotel.offers.length === 0) {
    await fetchHotelInfo(route.params.id, store, hotel);
  }
  loading.value = false;
  console.log(hotel.offers);
  const ans: RenderRoom[] = [];
  for (const item of hotel.offers) {
    const finded = ans.find((e) => e.id === item.roomId);
    const one: RenderRoomItem = {
      price: item.priceDetails.client.clientCurrency.gross.price,
      currency: item.priceDetails.client.clientCurrency.gross.currency,
      meals: item.meals.meals,
      payment: item.paymentRecipient,
      cancel: item.cancellationPolicies,
    };
    if (finded) {
      finded.rooms.push(one);
    } else {
      ans.push({
        id: item.roomId,
        name: item.name,
        images: [],
        beds: item.availableBedSets?.beds || [],
        amenities: hotel.amenities,
        rooms: [one],
      });
    }
    render.value = ans;
  }
  console.log(ans);
});
</script>

<template>
  <div :class="$style.center" v-if="loading">
    <LoadingSimple />
  </div>
  <div :class="$style.wrapper" v-else>
    <div :class="$style.header">
      <div :class="$style.info">
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="14" :l="18" :w="600">{{ store.search?.name || hotel.name }}</Text>
            <Text :s="12" :l="16" :c="$style.text">{{ subtitle() }}</Text>
          </div>
        </div>
      </div>
      <Carousel v-if="false">
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="12" :l="16" :c="$style.text">Стоимость</Text>
            <Text :s="14" :l="18" :w="600">Любая</Text>
          </div>
          <UpDown />
        </div>
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="12" :l="16" :c="$style.text">Стоимость</Text>
            <Text :s="14" :l="18" :w="600">Любая</Text>
          </div>
          <UpDown />
        </div>
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="12" :l="16" :c="$style.text">Стоимость</Text>
            <Text :s="14" :l="18" :w="600">Любая</Text>
          </div>
          <UpDown />
        </div>
        <div :class="$style.item">
          <div :class="$style.left">
            <Text :s="12" :l="16" :c="$style.text">Стоимость</Text>
            <Text :s="14" :l="18" :w="600">Любая</Text>
          </div>
          <UpDown />
        </div>
      </Carousel>
    </div>
    <div :class="$style.content">
      <RoomCard v-for="item of render" :room="item" />
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}
.info {
  padding: 12px 0;
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.item {
  flex: 0 0 auto;
  min-width: 0;
  padding: 5px 10px;
  background-color: var(--tertiary-fill-background);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-right: 8px;
  &:first-child {
    margin-left: 16px;
  }
  &:last-child {
    margin-right: 16px;
  }
  path {
    fill: var(--tg-theme-text-color);
  }
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.text {
  color: var(--tg-theme-hint-color);
}
.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px;
}
.center {
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
