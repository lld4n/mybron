<script setup lang="ts">
import FilterView from "../../components/common/FilterView.vue";
import MapIcon from "../../assets/icons/map.svg";
import HotelCard from "../../components/items/HotelCard.vue";
import {
  api,
  dates,
  dateToApi,
  guests,
  HotelWithCheapestOfferDto,
  nightsRange,
  SearchHotelByCityRequest,
  SearchHotelByHotelRequest,
  SearchHotelResponse,
  useStore,
} from "../../utils";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Text from "../../components/ui/wrappers/Text.vue";
import LoadingLottie from "../../components/ui/loading/LoadingLottie.vue";
const loading = ref(true);
const fetched = ref(false);
const list = ref<HotelWithCheapestOfferDto[]>([]);
const store = useStore();
const router = useRouter();
onMounted(async () => {
  if (!store.search || !store.out) {
    await router.push("/");
    return;
  }
  if (store.hotels.length > 0) {
    list.value = store.hotels;
    loading.value = false;
    fetched.value = true;
    return;
  }
  loading.value = true;
  fetched.value = false;
  const URL =
    store.search.type === "city" ? "hotels/search/by-city" : "hotels/search/by-hotel";

  const data: SearchHotelByHotelRequest & SearchHotelByCityRequest = {
    checkInDate: dateToApi(store.in),
    checkOutDate: dateToApi(store.out),
    filters: {
      numberOfGuests: store.adultsCount + store.children.length,
    },
  };

  if (store.search.type === "city") {
    data.cityId = store.search.id;
  } else {
    data.hotelId = store.search.id;
  }

  if (store.filters.price[0] !== 0) {
    data.filters.minDailyPrice = store.filters.price[0];
  }
  if (store.filters.price[1] !== 50000) {
    data.filters.maxDailyPrice = store.filters.price[1];
  }
  if (store.filters.stars.length > 0) {
    data.filters.hotelCategories = store.filters.stars;
  }
  if (store.filters.payment.length > 0) {
    data.filters.paymentRecipients = store.filters.payment.map((e) =>
      e.toLocaleUpperCase(),
    );
  }
  if (store.filters.other.includes("breakfast")) {
    data.filters.breakfastIncluded = true;
  }
  if (store.filters.other.includes("card")) {
    data.filters.guaranteeTypeCardIncluded = true;
  }

  const jsonData: SearchHotelResponse = await api
    .post(URL, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .json();
  console.log(jsonData.hotels);
  if (store.filters.sort === "default") {
    list.value = jsonData.hotels;
  } else if (store.filters.sort === "stars") {
    list.value = jsonData.hotels.sort((a, b) => b.info.category - a.info.category);
  } else if (store.filters.sort === "cheap") {
    list.value = jsonData.hotels.sort(
      (a, b) =>
        a.minimalPriceDetails.client.clientCurrency.net.price -
        b.minimalPriceDetails.client.clientCurrency.net.price,
    );
  } else if (store.filters.sort === "expensive") {
    list.value = jsonData.hotels.sort(
      (a, b) =>
        b.minimalPriceDetails.client.clientCurrency.net.price -
        a.minimalPriceDetails.client.clientCurrency.net.price,
    );
  } else if (store.filters.sort === "closeness") {
    list.value = jsonData.hotels.sort(
      (a, b) => a.geo.distanceToCenter - b.geo.distanceToCenter,
    );
  }
  store.setHotels(list.value);
  loading.value = false;
  fetched.value = true;
});

const subtitle = () => {
  let ans = dates(store.in) + " — " + dates(store.out!);
  ans += ", " + guests(store.adultsCount, store.children);
  return ans;
};
</script>

<template>
  <div :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.info" @click="$router.push('/search/filter/info')">
        <div :class="$style.title">{{ store.search?.name }}</div>
        <div :class="$style.subtitle">{{ subtitle() }}</div>
      </div>
      <FilterView />
    </header>
    <div :class="$style.list" v-if="list.length > 0">
      <HotelCard
        v-for="item of list"
        :id="item.id"
        :images="[item.info.photo.url]"
        :price="{
          all: item.minimalPriceDetails.client.clientCurrency.net.price,
          currency: item.minimalPriceDetails.client.clientCurrency.net.currency,
          nights: nightsRange(store.in, store.out!),
        }"
        :center="Number(item.geo.distanceToCenter.toFixed(2))"
        :name="item.info.name"
        :stars="item.info.category"
      />
    </div>
    <div :class="$style.center" v-if="loading">
      <LoadingLottie />
    </div>
    <div :class="$style.center" v-if="fetched && list.length === 0">
      <Text :s="17" :l="22" :w="600">Ничего не найдено</Text>
      <Text :s="17" :l="22" :g="true"
        >Попробуйте изменить фильтры или выбрать другое направление</Text
      >
    </div>
    <div :class="$style.block">
      <button
        :class="$style.btn"
        :disabled="(fetched && list.length === 0) || loading"
        @click="$router.push('/search/map')"
      >
        <MapIcon /> На карте
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--tg-theme-bg-color);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0 8px 0;
}
.info {
  cursor: pointer;
  margin: 0 16px;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
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
.title {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: var(--tg-theme-text-color);
}
.subtitle {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--tg-theme-hint-color);
}
.block {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--tg-theme-bg-color);
  position: fixed;
  bottom: 12px;
  right: 12px;
  border-radius: 12px;
}
.btn {
  display: flex;
  padding: 13px 24px;
  font-size: 17px;
  border-radius: 11px;
  line-height: 22px;
  align-items: center;
  font-weight: 600;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  gap: 6px;
  path {
    fill: var(--tg-theme-button-text-color);
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
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
.list {
  background-color: var(--tg-theme-bg-color);
  margin-top: 116px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px 0 62px;
}
.center {
  text-align: center;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
}
</style>
