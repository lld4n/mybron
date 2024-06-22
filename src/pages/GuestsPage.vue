<script setup lang="ts">
import Block from "../components/ui/Block.vue";
import Minus from "../assets/icons/minus.svg";
import Plus from "../assets/icons/plus.svg";
import CircleX from "../assets/icons/x-circle.svg";
import { ages, useStore } from "../utils";
import { computed } from "vue";
import Wrapper from "../components/Wrapper.vue";
const store = useStore();
const adultsCount = computed(() => store.adultsCount);
const children = computed(() => store.children);
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Применить',
      click: () => $router.go(-1),
    }"
  >
    <div :class="$style.content">
      <Block title="Гости">
        <div :class="$style.list">
          <div :class="$style.item">
            <div :class="$style.left">Взрослые</div>
            <div :class="$style.right">
              <button
                :class="$style.circle"
                :disabled="adultsCount === 1"
                @click="store.changeAdults(adultsCount - 1)"
              >
                <Minus />
              </button>
              <div :class="$style.count">{{ adultsCount }}</div>
              <button
                :class="$style.circle"
                :disabled="adultsCount === 4"
                @click="store.changeAdults(adultsCount + 1)"
              >
                <Plus />
              </button>
            </div>
          </div>
          <div :class="$style.bar" />
          <template v-for="(age, i) of children">
            <div :class="$style.item">
              <div :class="$style.left">{{ "Ребёнок " + ages[age] }}</div>
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
            Добавить ребёнка
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
  path {
    fill: var(--tg-theme-link-color);
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
}
.item {
  display: flex;
  align-items: center;
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
.delete {
  cursor: pointer;
  path {
    fill: var(--tg-theme-hint-color);
  }
}
</style>
