<script setup lang="ts">
import Carousel from "../ui/carousel/Carousel.vue";
import Text from "../ui/wrappers/Text.vue";
import AmenityArrow from "../../assets/icons/amenity-arrow.svg";
import { useInter } from "../../utils/i18n";
import { AvailableAmenityDto } from "../../utils";
import AmenityView from "../ui/views/AmenityView.vue";
const q = useInter();
interface Props {
  am: AvailableAmenityDto[];
}

defineProps<Props>();
</script>

<template>
  <div :class="$style.wrapper">
    <Carousel>
      <div :class="$style.tag" v-for="item of am">
        <AmenityView :group="item.groupName" />
        <Text :s="14" :l="18">{{ item.name }}</Text>
      </div>
    </Carousel>
    <Text :s="13" :l="18" :c="$style.link" @click="$router.push('/hotel/amenities')">
      {{ q.i18n.hotel.amenity }}
      <AmenityArrow />
    </Text>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}
.tag {
  align-items: center;
  flex: 0 0 auto;
  min-width: 0;
  display: flex;
  gap: 5px;
  padding: 6px 10px;
  background-color: var(--tertiary-fill-background);
  border-radius: 4px;
  margin-right: 4px;
  &:first-child {
    margin-left: 16px;
  }
  &:last-child {
    margin-right: 16px;
  }
  path {
    fill: var(--tg-theme-text-color);
  }
  svg {
    width: 18px;
    height: auto;
  }
}
.link {
  padding: 8px 16px;
  display: flex;
  gap: 3px;
  align-items: center;
  cursor: pointer;
  path {
    stroke: var(--tg-theme-text-color);
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
</style>
