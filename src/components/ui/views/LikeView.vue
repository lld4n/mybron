<script setup lang="ts">
import { dates, LikeItem } from "../../../utils";
import Block from "../wrappers/Block.vue";
import Text from "../wrappers/Text.vue";
import { ref } from "vue";
import { useInter } from "../../../utils/i18n";

interface Props {
  city: string;
  list: LikeItem[];
}
const show = ref(false);

const props = defineProps<Props>();
const q = useInter();
const handleShow = () => {
  if (props.list.length > 1) show.value = !show.value;
};
// TODO: перевод
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Text :w="700" :l="24" :s="20" :c="$style.left">{{ city }}</Text>
      <Text
        :class="[$style.link, { [$style.one]: list.length === 1 }]"
        :s="17"
        :l="22"
        @click="handleShow"
      >
        <template v-if="show">Свернуть</template>
        <template v-if="!show"
          >{{ list.length }} {{ list.length > 1 ? "объектов" : "объект" }}</template
        >
      </Text>
    </div>
    <div :class="$style.content">
      <template v-for="(item, index) of list">
        <div
          :class="$style.block"
          v-if="(!show && index === 0) || show"
          @click="$router.push('/hotel/' + item.id)"
        >
          <img :src="item.image" alt="" :class="$style.image" />
          <div :class="$style.right">
            <Text :w="500" :s="17" :l="22" :c="$style.name">{{ item.name }}</Text>
            <Text :c="$style.bottom" :s="13" :l="18">
              <span>{{ city }}</span>
              <span>•</span>
              <span>{{ dates(new Date(item.added), q.i18n) }}</span>
            </Text>
          </div>
        </div>
      </template>
    </div>
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.left {
  flex: 1;
}
.link {
  color: var(--tg-theme-link-color);
  cursor: pointer;
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
.one {
  color: var(--tg-theme-hint-color);
  cursor: not-allowed;
}
.block {
  padding-left: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
  &:last-child {
    .right {
      border-bottom: none;
    }
  }
}
.image {
  width: 55px;
  height: 55px;
  border-radius: 8px;
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 18px 16px 18px 0;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
  overflow: hidden;
}
.name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bottom {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
