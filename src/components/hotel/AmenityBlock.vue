<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import HotelButton from "./HotelButton.vue";
import { AvailableAmenityDto } from "../../utils";
import { computed } from "vue";
import AmenityView from "../ui/views/AmenityView.vue";
import Text from "../ui/wrappers/Text.vue";
import { useInter } from "../../utils/i18n";
interface Props {
  am: AvailableAmenityDto[];
}
const props = defineProps<Props>();
const list = computed(() => {
  const set: Set<string> = new Set();
  const ans: AvailableAmenityDto[] = [];
  for (const a of props.am) {
    if (!set.has(a.groupName)) {
      ans.push(a);
    }
    set.add(a.groupName);
  }
  console.log(ans);
  return ans;
});
const q = useInter();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>{{ q.i18n.amenity.block.iaizlt }}</Title>
    </div>
    <div :class="$style.list">
      <div :class="$style.item" v-for="item of list">
        <AmenityView :group="item.groupName" />
        <div :class="$style.right">
          <Text :s="17" :l="22" :c="$style.overflow">{{ item.name }}</Text>
          <Text :s="14" :l="18" :g="true" v-if="!!item.price">{{ item.price }} ₽</Text>
        </div>
      </div>
    </div>
    <HotelButton
      :text="q.i18n.amenity.block.bcgjhw"
      :click="() => $router.push('/hotel/amenities')"
    />
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 4px;
}
.item {
  padding-left: 16px;
  display: flex;
  gap: 10px;
  align-items: center;
  &:last-child {
    .right {
      border-bottom: none;
    }
  }
}
.right {
  flex: 1;
  padding: 11px 16px 11px 0;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
  display: flex;
  gap: 10px;
  justify-content: space-between;
  overflow: hidden;
}
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}
</style>
