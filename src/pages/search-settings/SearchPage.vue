<script setup lang="ts">
import Search from "../../assets/icons/search.svg";
import Point from "../../assets/icons/point.svg";
import Apartment from "../../assets/icons/apartment.svg";
import { onMounted, ref, watch } from "vue";
import { api, debounce } from "../../utils";
import Text from "../../components/ui/wrappers/Text.vue";
import Block from "../../components/ui/wrappers/Block.vue";
import LoadingSimple from "../../components/ui/loading/LoadingSimple.vue";
const value = defineModel<string>("value");
const list = ref<SearchItem[]>([]);
const input = ref<HTMLInputElement | null>(null);
const loading = ref(true);
type SearchItem = {
  type: "CITY" | "HOTEL";
  name: string;
  id: number;
};

onMounted(() => {
  input.value?.focus();
});

const fetch = async (q: string) => {
  try {
    loading.value = true;
    const data = await api.get("live-search", {
      searchParams: {
        q,
      },
    });
    const parsed: { liveSearchResults: SearchItem[] } = await data.json();
    list.value = parsed.liveSearchResults;
    console.log(parsed);
    loading.value = false;
  } catch (e) {}
};

const debouncedFetch = debounce(fetch, 500);

watch(value, (v) => {
  if (!v) return;
  debouncedFetch(v);
});
</script>

<template>
  <div :class="$style.wrapper">
    <label :class="$style.header" for="search">
      <Search />
      <input
        id="search"
        type="text"
        placeholder="Город или отель"
        :class="$style.input"
        autocomplete="off"
        v-model="value"
        ref="input"
      />
    </label>
    <div :class="$style.center" v-if="loading">
      <LoadingSimple />
    </div>
    <template v-if="!loading">
      <div :class="$style.content">
        <Block v-if="list.map((e) => e.type).includes('CITY')">
          <template v-for="item of list">
            <div :class="$style.item">
              <Point />
              <div :class="$style.info">
                <div :class="$style.left">
                  <Text :s="17" :l="22">{{ item.name }}</Text>
                  <Text :s="14" :l="18" :g="true">неизвестно</Text>
                </div>
                <Text :s="14" :l="18" :g="true">неизвестно</Text>
              </div>
            </div>
          </template>
        </Block>
      </div>
      <div :class="$style.content">
        <Block v-if="list.map((e) => e.type).includes('HOTEL')">
          <template v-for="item of list">
            <div :class="$style.item">
              <Apartment />
              <div :class="$style.info">
                <div :class="$style.left">
                  <Text :s="17" :l="22">{{ item.name }}</Text>
                  <Text :s="14" :l="18" :g="true">неизвестно</Text>
                </div>
                <Text :s="14" :l="18" :g="true">неизвестно</Text>
              </div>
            </div>
          </template>
        </Block>
      </div>
    </template>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
}
.header {
  margin-bottom: 20px;
  display: flex;
  padding: 8px;
  border-radius: 10px;
  background: var(--tertiary-fill-background);
  gap: 6px;
  align-items: center;
  path {
    fill: var(--tg-theme-hint-color);
  }
}
.input {
  flex: 1;
  width: 100%;
  font-size: 17px;
  line-height: 22px;
  background-color: transparent;
  letter-spacing: -0.4px;
  color: var(--tg-theme-text-color);

  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
.content {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
.item {
  display: flex;
  gap: 16px;
  align-items: center;
  padding-left: 16px;
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
.info {
  padding: 10px 16px 10px 0;
  display: flex;
  gap: 16px;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
  flex: 1;
  align-items: center;
  overflow: hidden;
}
.left {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
