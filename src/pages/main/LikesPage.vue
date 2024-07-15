<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import Shape from "../../assets/icons/shape.svg";
import AddLike from "../../assets/likes/add-like.svg";
import { LikeItem, useLikes } from "../../utils";
import Text from "../../components/ui/wrappers/Text.vue";
import Block from "../../components/ui/wrappers/Block.vue";
import { computed, onMounted } from "vue";
import LikeView from "../../components/ui/views/LikeView.vue";

const likes = useLikes();

const render = computed(() => {
  const map: { [city: string]: LikeItem[] } = {};
  const list = likes.list.sort((a, b) => b.added - a.added);
  for (const item of list) {
    if (map[item.city]) {
      map[item.city].push(item);
    } else {
      map[item.city] = [item];
    }
  }
  return map;
});
// TODO: перевод
onMounted(() => {
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
});
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <Text :c="$style.top" :w="700" :s="28" :l="34">Избранное</Text>
      <LikeView v-for="city of Object.keys(render)" :city="city" :list="render[city]" />
      <Block v-if="likes.list.length === 0" :class="$style.empty">
        <Shape :class="$style.shape" />
        <Text :s="17" :l="22" :g="true">
          Нажимайте <AddLike :class="$style.add" /> чтобы добавлять отели в
          избранное</Text
        >
      </Block>
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.top {
  margin-bottom: 8px;
}
.empty {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 40px 32px 32px;
  text-align: center;
}
.shape {
  width: 48px;
  height: 40px;
  path {
    fill: var(--tg-theme-hint-color);
  }
}
</style>
