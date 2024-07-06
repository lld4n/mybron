<script setup lang="ts">
import FilterView from "../../components/common/FilterView.vue";
import ShapeIcon from "../../assets/icons/shape.svg";
import X from "../../assets/icons/x.svg";
import { computed, onMounted, ref } from "vue";
import Marker from "../../assets/icons/marker.svg";
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from "vue-yandex-maps";
import {
  dates,
  guests,
  HotelWithCheapestOfferDto,
  nightsRange,
  router,
  useStore,
} from "../../utils";
import { LngLat } from "ymaps3";
import HotelCard from "../../components/items/HotelCard.vue";
import { useInter } from "../../utils/i18n";
import Text from "../../components/ui/wrappers/Text.vue";
import Search from "../../assets/icons/search.svg";
const store = useStore();
const item = ref<HotelWithCheapestOfferDto | null>(null);
const q = useInter();
const coor = computed(() => {
  let long = 0;
  let lat = 0;
  let i = 0;
  for (const h of store.hotels) {
    long += h.geo.coordinates.longitude;
    lat += h.geo.coordinates.latitude;
    i++;
  }
  return [long / i, lat / i] as LngLat;
});

onMounted(() => {
  if (store.hotels.length === 0) {
    router.push("/search/results");
  }
});

const handleMarker = (f: HotelWithCheapestOfferDto | null) => {
  item.value = f;
};

const subtitle = () => {
  let ans = dates(store.in, q.i18n) + " — " + dates(store.out!, q.i18n);
  ans += ", " + guests(store.adultsCount, store.children, q.i18n);
  return ans;
};

const theme = computed(() => {
  return window.Telegram.WebApp.colorScheme || "light";
});
</script>

<template>
  <div :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.info">
        <div :class="$style.left">
          <Text :s="14" :l="18" :w="600">{{ store.search?.name }}</Text>
          <Text :s="13" :l="18">{{ subtitle() }}</Text>
        </div>
        <Search />
      </div>
      <FilterView />
    </header>
    <div :class="$style.map">
      <yandex-map
        :settings="{
          location: {
            center: coor,
            zoom: 14,
          },
          theme,
        }"
        width="100%"
        height="100%"
      >
        <yandex-map-default-scheme-layer />
        <yandex-map-default-features-layer />
        <template v-for="e of store.hotels">
          <yandex-map-marker
            :settings="{
              coordinates: [e.geo.coordinates.longitude, e.geo.coordinates.latitude],
            }"
          >
            <div
              :class="[$style.marker, { [$style.active]: item && item.id === e.id }]"
              @click="() => handleMarker(e)"
            >
              <Text :s="14" :l="18" :w="600">
                <!--                TODO: Валюта-->
                {{ e.minimalPriceDetails.client.clientCurrency.gross.price }} ₽
              </Text>
              <Marker :class="$style.bottom" />
            </div>
          </yandex-map-marker>
        </template>
      </yandex-map>
    </div>
    <div v-if="!!item" :class="$style.view">
      <div :class="$style.top">
        <div :class="$style.line" />
      </div>
      <button :class="$style.close" @click.prevent="() => handleMarker(null)">
        <X />
      </button>
      <HotelCard
        v-if="!!item"
        :left="true"
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
    <div :class="$style.block">
      <button :class="$style.btn" @click="$router.push('/search/results')">
        <ShapeIcon /> {{ q.i18n.search.map.page.veddgm }}
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
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
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 0 16px;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
}
.left {
  flex: 1;
  overflow: hidden;
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
  position: fixed;
  bottom: 12px;
  right: 0;
  left: 0;
  border-radius: 12px;
}
.btn {
  display: flex;
  padding: 13px 24px;
  border-radius: 11px;
  font-size: 17px;
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
}
.map {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6d6d71;
  height: 100%;
}
.view {
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--tg-theme-bg-color);
  padding-bottom: 12px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  animation: in_anim 0.5s ease;
}

@keyframes in_anim {
  from {
    bottom: -100%;
  }
  to {
    bottom: 0;
  }
}

.top {
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line {
  height: 3px;
  width: 24px;
  background-color: var(--tertiary-fill-background);
  border-radius: 2px;
}
.close {
  position: absolute;
  top: 24px;
  right: 20px;
  background-color: var(--tg-theme-bg-color);
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  border-radius: 50%;
  box-shadow:
    0 4px 12px 0 #00000029,
    0 1px 1px 0 #00000029;
  path {
    fill: var(--tg-theme-text-color);
  }
  svg {
    width: 15px;
    height: 15px;
  }
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    svg {
      opacity: 0.6 !important;
    }
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      svg {
        opacity: 0.85;
      }
    }
  }
}
.marker {
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 3px 8px;
  box-shadow:
    0 4px 12px 0 #00000029,
    0 1px 1px 0 #00000029;
  border-radius: 12px;
  position: relative;
  background-color: white;
}
.active {
  background-color: var(--tg-theme-button-color);
  div {
    color: var(--tg-theme-button-text-color);
  }
  path {
    fill: var(--tg-theme-button-color);
  }
}
.bottom {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
</style>
