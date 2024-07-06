<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Text from "../ui/wrappers/Text.vue";
import Tripadvisor from "../../assets/tripadvisor.svg";
import ReviewView from "../ui/views/ReviewView.vue";
interface Props {
  mini?: boolean;
  name: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  avatar: string;
}

defineProps<Props>();
</script>

<template>
  <Block
    :class="{
      [$style.radius]: !!mini,
    }"
  >
    <div :class="$style.top">
      <img :src="avatar" :class="$style.img" alt="avatar" />
      <div :class="$style.info">
        <Text :s="17" :l="22" :w="500">{{ name }}</Text>
        <Text :s="12" :l="16" :c="$style.gray">{{ date }}</Text>
      </div>
      <Text :s="17" :l="22" :w="500" :c="$style.rating">
        <Tripadvisor />
        <ReviewView :rating="rating" />
        {{ rating }}
      </Text>
    </div>
    <Text
      :s="mini ? 14 : 16"
      :l="mini ? 18 : 22"
      :w="600"
      :class="[
        $style.title,
        {
          [$style.mini]: !!mini,
        },
      ]"
      >{{ title }}</Text
    >
    <div
      :class="{
        [$style.block]: !!mini,
      }"
    >
      <Text
        :s="mini ? 14 : 16"
        :l="mini ? 18 : 22"
        :class="[
          {
            [$style.text]: !mini,
            [$style.mini]: !!mini,
          },
        ]"
        >{{ text }}</Text
      >
    </div>
  </Block>
</template>

<style module lang="scss">
.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}
.top {
  padding: 12px 16px;
  display: flex;
  gap: 10px;
}
.mini {
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.gray {
  color: var(--tg-theme-hint-color);
}
.block {
  margin-left: 16px;
  padding: 0 16px 12px 0;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
}
.text {
  padding: 0 16px 12px;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.img {
  object-fit: cover;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.title {
  padding: 0 16px 4px;
}
.radius {
  border-radius: 0;
  &:last-child {
    .block {
      border-bottom: none;
    }
  }
}
</style>
