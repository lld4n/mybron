<script setup lang="ts">
import Text from "../ui/wrappers/Text.vue";
import { useInter } from "../../utils/i18n";
import { AvailableAmenityDto } from "../../utils";
import AmenityView from "../ui/views/AmenityView.vue";
const q = useInter();
interface Props {
  am: AvailableAmenityDto[];
  noShow?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div :class="$style.wrapper">
    <template v-for="item of am.filter((e) => e.included).slice(0, 5)">
      <div :class="$style.tag" v-if="item.included">
        <AmenityView :group="item.groupName" />
        <Text :s="14" :l="18">{{ item.name }}</Text>
      </div>
    </template>
    <Text
      v-if="!noShow"
      :s="14"
      :l="18"
      :c="$style.link"
      @click="$router.push('/hotel/amenities')"
    >
      {{ q.i18n.hotel.amenity }}
    </Text>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 16px;
}
.tag {
  align-items: center;
  display: flex;
  gap: 5px;
  border: 1px solid var(--tertiary-fill-background);
  padding: 6px 10px;
  border-radius: 4px;
  overflow: hidden;
  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  path {
    fill: var(--tg-theme-text-color);
  }
  svg {
    flex: 0 0 18px;
    width: 18px;
    height: auto;
  }
}
.link {
  padding: 8px 16px;
  display: flex;
  gap: 3px;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--tertiary-fill-background);
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
