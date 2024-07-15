<script setup lang="ts">
import { AvailableAmenityDto, useHotel } from "../../utils";
import Block from "../../components/ui/wrappers/Block.vue";
import { computed } from "vue";
import AmenityView from "../../components/ui/views/AmenityView.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import Ellipse from "../../assets/amenities/ellipse.svg";
import Text from "../../components/ui/wrappers/Text.vue";
import { useInter } from "../../utils/i18n";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
const hotel = useHotel();
const q = useInter();
const list = computed(() => {
  const ans: { group: string; content: AvailableAmenityDto[] }[] = [];
  for (const a of hotel.amenities) {
    const i = ans.findIndex((e) => e.group === a.groupName);
    if (i !== -1) {
      ans[i].content.push(a);
    } else {
      ans.push({ group: a.groupName, content: [a] });
    }
  }
  return ans;
});
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <Block v-for="block of list">
        <div :class="$style.top">
          <AmenityView :group="block.group" />
          <Title>{{ block.group }}</Title>
        </div>
        <div :class="$style.content">
          <div :class="$style.item" v-for="item of block.content">
            <Ellipse />
            <div :class="$style.right">
              <Text :s="17" :l="22">{{ item.name }}</Text>
              <!--TODO: валюта-->
              <Text :s="14" :l="18" v-if="!item.included && !!item.price" :g="true"
                >{{ item.price }} ₽</Text
              >
              <Text :s="14" :l="18" v-if="item.included" :g="true">{{
                q.i18n.hotel.amenities.page.zwjabc
              }}</Text>
            </div>
          </div>
        </div>
      </Block>
    </div></Wrapper
  >
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.top {
  padding: 24px 16px 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  path {
    fill: var(--tg-theme-text-color);
  }
}
.item {
  padding-left: 29px;
  display: flex;
  gap: 19px;
  align-items: center;
  &:last-child {
    .right {
      border-bottom: none;
    }
  }
}
.right {
  flex: 1;
  padding: 10px 16px 10px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
}
</style>
