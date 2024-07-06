<script setup lang="ts">
import Block from "../../components/ui/wrappers/Block.vue";
import Minus from "../../assets/icons/minus.svg";
import Plus from "../../assets/icons/plus.svg";
import CircleX from "../../assets/icons/x-circle.svg";
import { useHotel, useStore } from "../../utils";
import { computed } from "vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import { useInter } from "../../utils/i18n";
const store = useStore();
const hotel = useHotel();
const adultsCount = computed(() => store.adultsCount);
const children = computed(() => store.children);
const q = useInter();
</script>

<template>
  <Wrapper
    :footer="{
      text: q.i18n.guests.page.favgen,
      click: () => $router.go(-1),
    }"
  >
    <div :class="$style.content">
      <Block>
        <div :class="$style.top">
          <Title>{{ q.i18n.guests.page.puqbvl }}</Title>
        </div>
        <div :class="$style.list">
          <div :class="$style.item">
            <div :class="$style.left">{{ q.i18n.guests.page.xqknpx }}</div>
            <div :class="$style.right">
              <button
                :class="$style.circle"
                :disabled="adultsCount === 1"
                @click="
                  () => {
                    hotel.setOffers([]);
                    store.changeAdults(adultsCount - 1);
                  }
                "
              >
                <Minus />
              </button>
              <div :class="$style.count">{{ adultsCount }}</div>
              <button
                :class="$style.circle"
                :disabled="adultsCount === 4"
                @click="
                  () => {
                    hotel.setOffers([]);
                    store.changeAdults(adultsCount + 1);
                  }
                "
              >
                <Plus />
              </button>
            </div>
          </div>
          <div :class="$style.bar" />
          <template v-for="(age, i) of children">
            <div :class="$style.children">
              <div :class="$style.left">
                {{ q.i18n.guests.page.iqcmgp }} {{ q.i18n.ages[age] }}
              </div>
              <div :class="$style.right">
                <div :class="$style.delete" @click="store.removeChildren(i)">
                  <CircleX />
                </div>
              </div>
            </div>
            <div :class="$style.bar" v-if="i !== 3" />
          </template>
          <button
            :class="$style.add"
            v-if="children.length !== 4"
            @click="$router.push('/guests/children')"
          >
            <Plus />
            {{ q.i18n.guests.page.niffbk }}
          </button>
        </div>
      </Block>
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.add {
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  color: var(--tg-theme-link-color);
  font-size: 17px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: -0.43px;
  padding: 11px 0;

  path {
    fill: var(--tg-theme-link-color);
  }

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

.list {
  display: flex;
  flex-direction: column;
  padding: 0 0 0 16px;
}

.item {
  display: flex;
  align-items: center;
  padding: 4px 16px 4px 0;
}

.children {
  display: flex;
  align-items: center;
  padding: 10px 16px 10px 0;
}

.left {
  flex: 1;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.43px;
  font-weight: 400;
}

.right {
  display: flex;
  gap: 8px;
  align-items: center;
}

.circle {
  flex: 0 0 36px;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: var(--tg-theme-secondary-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.5;
  }

  path {
    fill: var(--tg-theme-text-color);
  }

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

.count {
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bar {
  width: 100%;
  height: 1px;
  background-color: var(--tg-theme-secondary-bg-color);
}

.content {
  flex: 1;
  padding: 12px 16px;
}

.top {
  padding: 16px 16px 4px;
}

.delete {
  cursor: pointer;

  path {
    fill: var(--tg-theme-hint-color);
  }

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
</style>
