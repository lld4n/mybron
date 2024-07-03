<script setup lang="ts">
import RatingView from "../ui/views/RatingView.vue";
import StarsView from "../ui/views/StarsView.vue";
import CopyButton from "../ui/CopyButton.vue";
import Walking from "../../assets/icons/walking.svg";
import Text from "../ui/wrappers/Text.vue";
import { onMounted, ref } from "vue";
import { AvailableAmenityDto } from "../../utils";
import AmenityCarousel from "./AmenityCarousel.vue";
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
} from "vue-yandex-maps";
import MinutesFromDistanceView from "../ui/views/MinutesFromDistanceView.vue";
interface Props {
  id: number;
  rating?: number;
  stars: number;
  name: string;
  amenities: AvailableAmenityDto[];
  center: number;
  address: string;
  latitude: number;
  longitude: number;
}

defineProps<Props>();
const showMap = ref(false);
onMounted(() => {
  showMap.value = true;
});
</script>

<template>
  <div :class="$style.wrapper">
    <RatingView v-if="rating" :level="rating" type="big" :c="$style.rating" />
    <div :class="$style.top">
      <StarsView :level="stars" type="small" />
      <div :class="$style.title">{{ name }}</div>
    </div>
    <AmenityCarousel :am="amenities" />
    <div :class="$style.meters">
      <Text :s="14" :l="18" :c="$style.item">
        <Walking />
        <MinutesFromDistanceView :d="center" />
        <span :class="$style.gray">{{ center }} км</span>
      </Text>
    </div>
    <div :class="$style.map">
      <yandex-map
        :settings="{
          location: {
            center: [longitude, latitude],
            zoom: 14,
          },
        }"
        width="100%"
        height="200px"
      >
        <yandex-map-default-scheme-layer />
        <yandex-map-default-features-layer />
        <yandex-map-default-marker
          :settings="{ coordinates: [longitude, latitude], title: name }"
        />
      </yandex-map>
    </div>
    <CopyButton :text="address" title="Адрес" :class="$style.copu" />
  </div>
</template>

<style module lang="scss">
.meters {
  display: flex;
  padding: 20px 16px 0;
  flex-direction: column;
  gap: 8px;
}
.gray {
  color: var(--tg-theme-hint-color);
}
.item {
  display: flex;
  align-items: center;
  gap: 4px;
  path {
    fill: var(--tg-theme-text-color);
  }
  &:last-child {
    svg {
      width: 13px;
      height: 15px;
    }
  }
  svg {
    flex: 0 0 16px;
  }
}
.wrapper {
  border-radius: 16px;
  background-color: var(--tg-theme-bg-color);
  position: relative;
}
.rating {
  position: absolute;
  top: 0;
  right: 16px;
}
.top {
  padding: 16px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  svg {
    width: 12px;
    height: 12px;
  }
  path {
    fill: #ff9500;
  }
}
.title {
  font-size: 28px;
  line-height: 31px;
  font-weight: 700;
}
.map {
  overflow: hidden;
  padding: 16px 16px 0 16px;
}
.copu {
  padding: 16px;
}
.img {
  width: 100%;
  height: auto;
  margin: 16px 0 8px;
  border-radius: 8px;
}
</style>
