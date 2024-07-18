<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import CarouselCount from "../ui/carousel/CarouselCount.vue";
import Carousel from "../ui/carousel/Carousel.vue";
import Text from "../ui/wrappers/Text.vue";
import AmenityCarousel from "../hotel/AmenityCarousel.vue";
import RoomItemCard from "./RoomItemCard.vue";
import ShowRoom from "../../assets/show-room.svg";
import { RenderRoom } from "../../pages/hotel/types.ts";
import Size from "../../assets/size.svg";
import { useInter } from "../../utils/i18n";
import { ref } from "vue";
interface Props {
  room: RenderRoom;
  click: (code: string) => void;
}
const q = useInter();
const show = ref<"default" | "in" | "out">("default");
const handle = () => {
  if (show.value === "default") show.value = "in";
  else if (show.value === "in") {
    show.value = "out";
    setTimeout(() => {
      show.value = "default";
    }, 300);
  }
};
defineProps<Props>();
</script>

<template>
  <Block v-if="room.rooms.length > 0">
    <CarouselCount>
      <img :src="url.url" :class="$style.img" v-for="url of room.room.photos.photos" />
    </CarouselCount>
    <div :class="$style.content" @click="handle">
      <Text :s="22" :l="28" :w="600">{{ room.room.name }}</Text>
      <Text :s="14" :l="18" :c="$style.info">
        <Size />
        <div>{{ room.room.size }} {{ q.i18n.slug === "ru" ? " м²" : " m²" }}</div>
        <div>•</div>
        <!--        TODO: кровать и валюта-->
        <div>Кровать</div>
      </Text>
      <Text :s="20" :l="24" :c="$style.price">
        <div>
          {{ q.i18n.slug === "ru" ? "от " : "from " }}
          {{ Math.min(...room.rooms.map((e) => e.price)) }} ₽
        </div>
        <ShowRoom :class="[$style.icon, { [$style.rotate]: show === 'in' }]" />
      </Text>
    </div>
    <div
      :class="[
        $style.block,
        {
          [$style.in]: show === 'in',
          [$style.out]: show === 'out',
        },
      ]"
    >
      <AmenityCarousel
        :am="room.room.availableAmenities.availableAmenities"
        :no-show="true"
      />
      <Carousel>
        <RoomItemCard
          :class="$style.item"
          :item="item"
          v-for="item of room.rooms"
          :click="click"
        />
      </Carousel>
    </div>
  </Block>
</template>

<style module lang="scss">
.img {
  flex: 0 0 100%;
  min-width: 0;
  height: 200px;
  object-fit: cover;
}
.content {
  background-color: var(--tg-theme-bg-color);
  margin-top: -20px;
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  z-index: 10;
}
.info {
  display: flex;
  align-items: center;
  gap: 6px;
  path {
    fill: var(--tg-theme-text-color);
  }
  rect {
    stroke: var(--tg-theme-text-color);
  }
}
.price {
  padding-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  path {
    fill: var(--tg-theme-text-color);
  }
}
.rotate {
  transform: rotate(180deg);
}
.icon {
  transition: all 0.3s cubic-bezier(0, 1, 0.7, 1);
}
.block {
  z-index: 9;
  display: flex;
  height: 0;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0, 1, 0.7, 1);
  div {
    transition: all 0.3s cubic-bezier(0, 1, 0.7, 1);
    opacity: 0;
  }
}
.in {
  padding: 0 0 16px 0;
  height: initial;
  div {
    opacity: 1;
  }
}
.out {
  height: 0;
  div {
    opacity: 0;
  }
}
</style>
