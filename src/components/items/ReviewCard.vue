<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Text from "../ui/wrappers/Text.vue";
import ReviewView from "../ui/views/ReviewView.vue";
const url = "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg";
interface Props {
  mini?: boolean;
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
      <img :src="url" :class="$style.img" />
      <div :class="$style.info">
        <Text :s="17" :l="22" :w="500">Сергей</Text>
        <Text :s="12" :l="16" :c="$style.gray">02.09.2024</Text>
      </div>
      <ReviewView :rating="4" />
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
      >непрофессиональные администраторы на стойке регистрации работали 20.05.2023,
      после того, как заказали завтрак в номер нам сказали, что завтрака не будет</Text
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
        >Большие номера, хорошая уборка в номерах, питание плохое.Инвалидам лучше не
        посещать этот отель, так как муж инвалид, мы просили завтрак в номер, у нас
        номер с полупансионом, но они брали с нас деньги за завтрак в номер к
        инвалиду.</Text
      >
    </div>
  </Block>
</template>

<style module lang="scss">
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
