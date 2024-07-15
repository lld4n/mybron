<script setup lang="ts">
import FilterView from "../../components/common/FilterView.vue";
import MapIcon from "../../assets/icons/map.svg";
import HotelCard from "../../components/items/HotelCard.vue";
import Search from "../../assets/icons/search.svg";
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
  useLastSearch,
  useStore,
} from "../../utils";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Text from "../../components/ui/wrappers/Text.vue";
import LoadingLottie from "../../components/ui/loading/LoadingLottie.vue";
import ProgressBar from "../../components/ui/loading/ProgressBar.vue";
import { useInter } from "../../utils/i18n";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
const loading = ref(true);
const fetched = ref(false);
const list = ref<HotelWithCheapestOfferDto[]>([]);
const store = useStore();
const router = useRouter();
const q = useInter();
const lastSearch = useLastSearch();
const progress = ref(0);
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
  progress.value = 0;
  const timer = setInterval(() => {
    progress.value++;
  }, 500);
  const URL =
    store.search.type === "city" ? "hotels/search/by-city" : "hotels/search/by-hotel";

  const data: SearchHotelByHotelRequest & SearchHotelByCityRequest = {
    checkInDate: dateToApi(store.in),
    checkOutDate: dateToApi(store.out),
    filters: {
      numberOfGuests: store.adultsCount,
    },
  };
  lastSearch.addList({
    id: store.search.id,
    in: store.in.getTime(),
    out: store.out.getTime(),
    name: store.search.name,
    guests: store.adultsCount,
    type: store.search.type,
  });
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
  clearInterval(timer);
  progress.value = 100;
  console.log(jsonData.hotels);
  setTimeout(() => {
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
  }, 500);
});

const subtitle = () => {
  let ans = dates(store.in, q.i18n) + " — " + dates(store.out!, q.i18n);
  ans += ", " + guests(store.adultsCount, store.children, q.i18n);
  return ans;
};
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <header :class="$style.header">
        <div :class="$style.info" @click="$router.push('/search/filter/info')">
          <div :class="$style.left">
            <Text :s="14" :l="18" :w="600">{{ store.search?.name }}</Text>
            <Text :s="13" :l="18">{{ subtitle() }}</Text>
          </div>
          <Search />
        </div>
      </header>
      <div :class="$style.list" v-if="list.length > 0">
        <FilterView />
        <Text
          :c="$style.count"
          :s="14"
          :l="18"
          :g="true"
          v-if="fetched && list.length > 0"
        >
          {{ q.i18n.search.results.page.qqqqqq }} {{ list.length }}
          {{ q.i18n.search.results.page.wwwwww }}
        </Text>
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
      <div :class="$style.loading" v-if="loading">
        <FilterView />
        <div :class="$style.center">
          <LoadingLottie />
          <Text :s="16" :l="22" :w="500" :c="$style.margin">{{
            q.i18n.search.results.page.ffffff
          }}</Text>
          <ProgressBar :width="progress" />
        </div>
      </div>
      <div :class="$style.center" v-if="fetched && list.length === 0">
        <Text :s="17" :l="22" :w="600">{{ q.i18n.search.results.page.xxanha }}</Text>
        <Text :s="17" :l="22" :g="true">{{ q.i18n.search.results.page.ltuaar }}</Text>
      </div>
      <div :class="$style.block">
        <button
          :class="$style.btn"
          :disabled="(fetched && list.length === 0) || loading"
          @click="$router.push('/search/map')"
        >
          <MapIcon /> {{ q.i18n.search.results.page.vkwokh }}
        </button>
      </div>
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  background-color: var(--tg-theme-bg-color);
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
  //box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
}

.info {
  cursor: pointer;
  margin: 0 16px;
  padding: 5px 12px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
  transition: opacity 0.1s ease-out;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;

  //path {
  //  fill: var(--tg-theme-hint-color);
  //}

  &:not([disabled]):active {
    opacity: 0.6 !important;
  }

  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.left {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  //background-color: var(--tg-theme-bg-color);
  position: fixed;
  bottom: 24px;
  right: 0;
  left: 0;
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
  margin-top: 66px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 80px;
}

.loading {
  background-color: var(--tg-theme-bg-color);
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 66px;
}
.center {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 72px;
}
.margin {
  margin-top: 8px;
}
.count {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
