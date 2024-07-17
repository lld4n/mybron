<script setup lang="ts">
import Text from "../../components/ui/wrappers/Text.vue";
import RoomCard from "../../components/items/RoomCard.vue";
import {
  dates,
  guests,
  MealsFiltersValues,
  RoomDto,
  useHotel,
  useStore,
} from "../../utils";
import { onMounted, ref } from "vue";
import { fetchHotelInfo } from "../hotel/fetchHotelInfo.ts";
import { useRoute, useRouter } from "vue-router";
import LoadingSimple from "../../components/ui/loading/LoadingSimple.vue";
import { RenderRoom, RenderRoomItem } from "../hotel/types.ts";
import FilterRoomView from "../../components/common/FilterRoomView.vue";
import { useInter } from "../../utils/i18n";
import { fetchRooms } from "../hotel/fetchRooms.ts";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
const store = useStore();
const hotel = useHotel();
const route = useRoute();
const roomsList = ref<RoomDto[]>([]);
const q = useInter();
const router = useRouter();
const loading = ref(true);
const render = ref<RenderRoom[]>([]);
const subtitle = () => {
  let ans = dates(store.in, q.i18n) + " — " + dates(store.out!, q.i18n);
  ans += ", " + guests(store.adultsCount, store.children, q.i18n);
  return ans;
};

onMounted(async () => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.secondary_bg_color || "";
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
  if (hotel.offers.length === 0) {
    await fetchHotelInfo(route.params.id, store, hotel, q.i18n);
  }
  const rooms = await fetchRooms(route.params.id as string);
  roomsList.value = rooms;
  loading.value = false;
  let ans: RenderRoom[] = [];
  for (const item of hotel.offers) {
    const finded = ans.find((e) => e.id === item.roomId);
    const one: RenderRoomItem = {
      code: item.code,
      price: item.priceDetails.client.clientCurrency.gross.price,
      currency: item.priceDetails.client.clientCurrency.gross.currency,
      meals: item.meals.meals,
      payment: item.paymentRecipient,
      cancel: item.cancellationPolicies,
    };
    if (finded) {
      finded.rooms.push(one);
    } else {
      const roomById = rooms.find((e) => e.id === item.roomId);
      if (roomById) {
        ans.push({
          id: item.roomId,
          room: roomById,
          rooms: [one],
        });
      }
    }
  }
  if (hotel.filters.price[0] !== 0) {
    ans = ans.map((card) => {
      return {
        id: card.id,
        room: card.room,
        rooms: card.rooms.filter((r) => r.price > hotel.filters.price[0]),
      };
    });
  }
  if (hotel.filters.price[1] !== 50000) {
    ans = ans.map((card) => {
      return {
        id: card.id,
        room: card.room,
        rooms: card.rooms.filter((r) => r.price < hotel.filters.price[1]),
      };
    });
  }
  if (
    hotel.filters.meals.length !== 0 &&
    hotel.filters.meals.length !== MealsFiltersValues.length
  ) {
    if (hotel.filters.meals.includes("included")) {
      ans = ans.map((card) => {
        return {
          id: card.id,
          room: card.room,
          rooms: card.rooms.filter((r) => r.meals.some((e) => e.included)),
        };
      });
    }
    if (hotel.filters.meals.includes("not included")) {
      ans = ans.map((card) => {
        return {
          id: card.id,
          room: card.room,
          rooms: card.rooms.filter((r) => r.meals.some((e) => !e.included)),
        };
      });
    }
  }
  // TODO: проверка кроватей
  // TODO: проверка удобств именно у номера
  render.value = ans;
  console.log(ans);
});

const handleClick = (code: string) => {
  const item = hotel.offers.find((e) => e.code === code);
  if (item) {
    const room = roomsList.value.find((e) => e.id === item.roomId);
    hotel.setOffer(item);
    if (room) hotel.setRoom(room);
    router.push("/checkout");
  }
};
</script>

<template>
  <Wrapper>
    <div :class="$style.center" v-if="loading">
      <LoadingSimple />
    </div>
    <div :class="$style.wrapper" v-else>
      <div :class="$style.header">
        <div :class="$style.info">
          <div :class="$style.item" @click="$router.push('/hotel/info')">
            <div :class="$style.left">
              <Text :s="14" :l="18" :w="600">{{
                store.search?.name || hotel.name
              }}</Text>
              <Text :s="12" :l="16" :c="$style.text">{{ subtitle() }}</Text>
            </div>
          </div>
        </div>
        <FilterRoomView />
      </div>
      <div :class="$style.content">
        <RoomCard v-for="item of render" :room="item" :click="handleClick" />
      </div>
    </div>
  </Wrapper>
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
  margin-right: 8px;
  cursor: pointer;
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
