<script setup lang="ts">
import Search from "../../assets/icons/search.svg";
import { onMounted, ref, watch } from "vue";
import {
  api,
  dateToApi,
  debounce,
  HotelWithCheapestOfferDto,
  LiveSearchResponse,
  LiveSearchResultDto,
  SearchHotelByGeolocationRequest,
  SearchHotelResponse,
  useStore,
} from "../../utils";
import Text from "../../components/ui/wrappers/Text.vue";
import Block from "../../components/ui/wrappers/Block.vue";
import LoadingSimple from "../../components/ui/loading/LoadingSimple.vue";
import { useInter } from "../../utils/i18n";
import { useRouter } from "vue-router";
// import ky from "ky";
import Title from "../../components/ui/wrappers/Title.vue";
import SearchCard, { Item } from "../../components/items/SearchCard.vue";

const countries = ["RU", "KZ", "UZ", "KG", "TM", "GE", "BY", "AZ", "MD", "TJ", "AM"];
const popular: { id: number; type: "CITY"; name: string; country: string }[] = [
  {
    id: 6,
    type: "CITY",
    name: "Москва",
    country: "Россия",
  },
  {
    id: 37,
    type: "CITY",
    name: "Санкт-Петербург",
    country: "Россия",
  },
  {
    id: 48,
    type: "CITY",
    name: "Сочи",
    country: "Россия",
  },
  {
    id: 575,
    type: "CITY",
    name: "Ереван",
    country: "Армения",
  },
  {
    id: 35,
    type: "CITY",
    name: "Калининград",
    country: "Россия",
  },
];

const value = defineModel<string>("value");
const list = ref<LiveSearchResultDto[]>([]);
const geoList = ref<HotelWithCheapestOfferDto[]>([]);
const input = ref<HTMLInputElement | null>(null);
const fetched = ref(false);
const loadingGeo = ref(true);
const loadingSearch = ref(false);
const q = useInter();
const store = useStore();
const router = useRouter();

onMounted(async () => {
  input.value?.focus();

  try {
    if (!store.geo || !countries.includes(store.geo.country_code)) {
      loadingGeo.value = false;
      return;
    }
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todayFormatted = dateToApi(today);
    const tomorrowFormatted = dateToApi(tomorrow);
    const data: SearchHotelByGeolocationRequest = {
      checkInDate: todayFormatted,
      checkOutDate: tomorrowFormatted,
      geolocation: {
        latitude: store.geo.latitude,
        longitude: store.geo.longitude,
        radius: 25.25,
      },
      filters: {},
    };
    const locatedHotel: SearchHotelResponse = await api
      .post("hotels/search/by-geolocation", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .json();
    geoList.value = locatedHotel.hotels.slice(0, 6);
    loadingGeo.value = false;
  } catch (e) {}
});

const fetch = async (q: string) => {
  try {
    loadingSearch.value = true;
    fetched.value = false;
    const data = await api.get("live-search", {
      searchParams: {
        q,
      },
    });
    const parsed: LiveSearchResponse = await data.json();
    list.value = parsed.liveSearchResults;
    console.log(parsed);
    loadingSearch.value = false;
    fetched.value = true;
  } catch (e) {}
};

const debouncedFetch = debounce(fetch, 500);

watch(value, (v) => {
  if (!v) {
    list.value = [];
    fetched.value = false;
    return;
  }
  debouncedFetch(v);
});

const handleClick = (item: Item) => {
  store.setSearch(item);
  if (!store.out) {
    router.push("/dates");
  } else {
    router.push("/search/results");
  }
};
</script>

<template>
  <div :class="$style.wrapper">
    <label :class="$style.header" for="search">
      <Search />
      <input
        id="search"
        type="text"
        :placeholder="q.i18n.search.input"
        :class="$style.input"
        autocomplete="off"
        v-model="value"
        ref="input"
      />
    </label>
    <div :class="$style.unfind" v-if="fetched && list.length === 0">
      <Text :s="17" :l="22" :w="600">Ничего не найдено</Text>
      <Text :s="17" :l="22" :g="true">Но вот, что вам может подойти</Text>
    </div>
    <div :class="$style.loading__geo" v-if="loadingGeo && list.length === 0">
      <LoadingSimple />
    </div>
    <div :class="$style.loading__search" v-if="loadingSearch">
      <LoadingSimple />
    </div>
    <Block
      v-if="fetched && list.map((e) => e.type).includes('CITY')"
      :class="$style.content"
    >
      <SearchCard
        v-for="item of list"
        :country="item.country"
        :id="item.id"
        :name="item.name"
        :type="item.type === 'CITY' ? 'city' : 'hotel'"
        :click="handleClick"
        :no-show="item.type === 'HOTEL'"
      />
    </Block>
    <Block
      v-if="fetched && list.map((e) => e.type).includes('HOTEL')"
      :class="$style.content"
    >
      <SearchCard
        v-for="item of list"
        :country="item.country"
        :id="item.id"
        :name="item.name"
        :type="item.type === 'CITY' ? 'city' : 'hotel'"
        :click="handleClick"
        :no-show="item.type === 'CITY'"
      />
    </Block>
    <Block v-if="geoList.length > 0 && list.length === 0" :class="$style.content">
      <div :class="$style.top">
        <Title>Рядом с вами</Title>
      </div>
      <SearchCard
        v-for="item of geoList"
        :id="item.id"
        :name="item.info.name"
        :type="item.info.type === 'city' ? 'city' : 'hotel'"
        :country="item.geo.cityName"
        :click="handleClick"
      />
    </Block>
    <Text
      v-if="geoList.length > 0 && list.length === 0"
      :s="13"
      :l="18"
      :g="true"
      :c="$style.add"
      >Основано на выбранном языке и вашем IP</Text
    >
    <Block v-if="list.length === 0" :class="$style.content">
      <div :class="$style.top">
        <Title>Популярное</Title>
      </div>
      <SearchCard
        v-for="item of popular"
        :id="item.id"
        :name="item.name"
        type="city"
        :country="item.country"
        :click="handleClick"
      />
    </Block>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-height: 100%;
}
.header {
  margin-bottom: 20px;
  display: flex;
  padding: 8px;
  border-radius: 10px;
  background: var(--tertiary-fill-background);
  gap: 6px;
  align-items: center;
  path {
    fill: var(--tg-theme-hint-color);
  }
}
.input {
  flex: 1;
  width: 100%;
  font-size: 17px;
  line-height: 22px;
  background-color: transparent;
  letter-spacing: -0.4px;
  color: var(--tg-theme-text-color);

  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
.content {
  margin-bottom: 8px;
  overflow: initial !important;
}
.top {
  padding: 16px 16px 4px 16px;
}

.loading {
  &__geo {
    padding: 40px 0;
    display: flex;
    gap: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__search {
    flex: 1;
    height: 100%;
    display: flex;
    gap: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.add {
  padding: 5px 16px;
}
.unfind {
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}
</style>
