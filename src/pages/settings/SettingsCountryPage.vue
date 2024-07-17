<script setup lang="ts">
import Search from "../../assets/icons/search.svg";
import { onMounted, ref, watch } from "vue";
import Block from "../../components/ui/wrappers/Block.vue";
import countries from "../../assets/countries.json";
import FlagView from "../../components/ui/views/FlagView.vue";
import Text from "../../components/ui/wrappers/Text.vue";
import { useInter } from "../../utils/i18n";
import { useStore } from "../../utils";
import { useRouter } from "vue-router";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
const v = ref("");
const q = useInter();
const router = useRouter();
const store = useStore();
type Country = {
  co: string;
  ph: string;
  na: string;
  na_en: string;
};
const filtered = ref<Country[]>([]);
onMounted(() => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.secondary_bg_color || "";
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
  filtered.value = countries;
});
watch(v, (n) => {
  if (n.length === 0) {
    filtered.value = countries;
  } else {
    filtered.value = countries.filter(
      (e) =>
        e.na.toLowerCase().includes(n.toLowerCase()) ||
        e.na_en.toLowerCase().includes(n.toLowerCase()),
    );
  }
});
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <label for="find" :class="$style.top">
        <Search />
        <input
          type="text"
          id="find"
          v-model="v"
          :class="$style.input"
          :placeholder="q.i18n.settings.findCountry"
        />
      </label>
      <Block>
        <div
          :class="$style.item"
          v-for="item of filtered"
          @click="
            () => {
              store.setPhone({ code: item.co, ph: item.ph });
              router.replace('/settings/phone');
            }
          "
        >
          <FlagView :code="item.co" />
          <div :class="$style.right">
            <Text :s="17" :l="22" :c="$style.content">{{
              q.i18n.slug === "en" ? item.na_en : item.na
            }}</Text>
            <Text :s="17" :l="22" :g="true">+{{ item.ph }}</Text>
          </div>
        </div>
      </Block>
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.top {
  background-color: var(--tertiary-fill-background);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
}
.input {
  background-color: transparent;
  font-size: 17px;
  line-height: 22px;
  width: 100%;
  color: var(--tg-theme-text-color);
  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
.item {
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-left: 16px;
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
.right {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 11px 16px 11px 0;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
  overflow: hidden;
}

.content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
