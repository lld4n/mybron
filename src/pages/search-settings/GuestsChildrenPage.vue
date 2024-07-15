<script setup lang="ts">
import Block from "../../components/ui/wrappers/Block.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import { useStore } from "../../utils";
import { useInter } from "../../utils/i18n";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import { onMounted } from "vue";
const q = useInter();
const store = useStore();
onMounted(() => {
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
});
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <Block>
        <div :class="$style.top">
          <Title>{{ q.i18n.guests.children.page.vabosk }}</Title>
        </div>
        <template v-for="(age, index) of q.i18n.ages">
          <div
            :class="$style.item"
            @click="
              store.addChildren(index);
              $router.go(-1);
            "
          >
            {{ age }}
          </div>
          <div :class="$style.bar" v-if="index < q.i18n.ages.length - 1" />
        </template>
      </Block>
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
}
.top {
  padding: 16px 16px 4px;
}
.bar {
  margin-left: 16px;
  width: 100%;
  height: 1px;
  background-color: var(--tg-theme-secondary-bg-color);
}
.item {
  padding: 11px 0 11px 16px;
  font-size: 17px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: -0.43px;
  cursor: pointer;
}
</style>
