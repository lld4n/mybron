<script setup lang="ts">
import Carousel from "../ui/carousel/Carousel.vue";
import { useInter } from "../../utils/i18n";
import AddLike from "../../assets/likes/add-like.svg";
import Liked from "../../assets/likes/liked.svg";
import StarsView from "../ui/views/StarsView.vue";
import Text from "../ui/wrappers/Text.vue";
import RatingView from "../ui/views/RatingView.vue";
import { useLikes, useStore } from "../../utils";
import { computed } from "vue";
const likes = useLikes();
interface Props {
  images: string[];
  id: number;
  stars: number;
  name: string;
  city: string;
  reviews?: {
    rating: number;
    count: number;
  };
  center: number;
  price: { all: number; currency: string; nights: number };
  left?: boolean;
}

defineProps<Props>();
const q = useInter();
const store = useStore();
const nights = computed(() => {
  if (!store.out) return 0;
  return Math.ceil(
    Math.abs(store.in.getTime() - store.out.getTime()) / (1000 * 3600 * 24),
  );
});
</script>

<template>
  <div :class="$style.card" @click="$router.push('/hotel/' + id)">
    <div
      :class="[$style.like, { [$style.like__left]: left }]"
      @click.stop="
        likes.addList({
          id,
          image: images[0],
          name: name,
          city: city,
          added: new Date().getTime(),
        })
      "
    >
      <Liked v-if="likes.check(id)" />
      <AddLike v-if="!likes.check(id)" />
    </div>
    <div :class="$style.full">
      <img :src="images[0]" alt="Image" v-if="images.length === 1" />
    </div>
    <Carousel v-if="images.length > 1">
      <img v-for="url of images" :src="url" alt="Image" :class="$style.image" />
    </Carousel>
    <div :class="$style.middle">
      <div :class="$style.left">
        <StarsView :level="3" type="very small" />
        <Text :s="17" :l="22" :w="600">{{ name }}</Text>
        <Text :c="$style.gap" :s="13" :l="18">
          <!--          TODO: Количество отзывов в поиске by--->
          <Text>{{ center }} {{ q.i18n.hotel.card.ygbsng }}</Text>
        </Text>
      </div>
      <!--      TODO: Рейтинг из tripadvisor в поиске by--->
      <RatingView :level="10" type="big" />
    </div>
    <div :class="$style.bottom">
      <!--      TODO: Валюта-->
      <Text :s="22" :l="28" :w="600">{{ price.all }} ₽</Text>
      <Text :s="13" :l="18" v-if="nights > 0"
        >{{ nights }} {{ nights > 1 ? q.i18n.hotel.card.nm : q.i18n.hotel.card.n }},
        {{ store.adultsCount }}
        {{ store.adultsCount > 1 ? q.i18n.hotel.card.gn : q.i18n.hotel.card.g }}</Text
      >
    </div>
  </div>
</template>

<style module lang="scss">
.middle {
  overflow: hidden;
  display: flex;
  padding: 0 16px;
  gap: 12px;
}
.gap {
  display: flex;
  align-items: center;
  gap: 6px;
}
.left {
  flex: 1;
  overflow: hidden;
  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

.bottom {
  display: flex;
  gap: 6px;
  align-items: baseline;
  padding-left: 16px;
}

.price {
  font-size: 22px;
  line-height: 28px;
  font-weight: 600;
  letter-spacing: -0.26px;
}

.card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
}

.image {
  flex: 0 0 340px;
  min-width: 0;
  margin-right: 8px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;

  &:first-child {
    margin-left: 16px;
  }
}
.full {
  padding: 0 16px;
  img {
    border-radius: 8px;
    height: 180px;
    width: 100%;
    object-fit: cover;
  }
}
.like {
  background-color: #00000066;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  right: 24px;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.1s ease-out;
  &__left {
    right: auto;
    left: 24px;
  }
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }

  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
  path {
    fill: var(--tg-theme-bg-color);
  }
}
</style>
