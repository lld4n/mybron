<script setup lang="ts">
import Block from "../../components/ui/wrappers/Block.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import Shape from "../../assets/icons/shape.svg";
import { useInter } from "../../utils/i18n";
import Text from "../../components/ui/wrappers/Text.vue";
import ReservationCard from "../../components/items/ReservationCard.vue";
import { onMounted } from "vue";

const q = useInter();
onMounted(() => {
  //@ts-ignore
  const AdController = window.Adsgram.init({ blockId: "334" });
  AdController.show()
    .then((result: any) => {
      console.log(result);
      // user watch ad till the end
      // your code to reward user
    })
    .catch((result: any) => {
      console.log(result);
      // user skipped video or get error during playing ad
      // do nothing or whatever you want
    });
});
</script>

<template>
  <div :class="$style.wrapper">
    <Block>
      <div :class="$style.top">
        <Title>{{ q.i18n.reservation.my }}</Title>
      </div>
      <div :class="$style.center">
        <Shape />
        <Text :s="17" :l="22">{{ q.i18n.reservation.zero }}</Text>
      </div>
    </Block>
    <Block>
      <div :class="$style.top">
        <Title>{{ q.i18n.reservation.my }}</Title>
      </div>
      <div :class="$style.content">
        <ReservationCard status="success" />
        <ReservationCard status="fail" />
        <ReservationCard status="loading" />
      </div>
    </Block>
  </div>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 4px;
}
.wrapper {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.center {
  color: var(--tg-theme-hint-color);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  text-align: center;
  svg {
    width: 48px;
    height: 40px;
  }
  path {
    fill: var(--tg-theme-hint-color);
  }
}
</style>
