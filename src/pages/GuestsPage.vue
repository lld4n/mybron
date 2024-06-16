<script setup lang="ts">
import Block from "../components/Block.vue";
import Minus from "../assets/icons/minus.svg";
import Plus from "../assets/icons/plus.svg";
import { useStore } from "../utils";
import { computed } from "vue";
const store = useStore();
const adultsCount = computed(() => store.adultsCount);
const childrenCount = computed(() => store.childrenCount);
</script>

<template>
  <div class="guests">
    <div class="content">
      <Block title="Гости" class="list">
        <div class="item">
          <div class="left">
            <div class="text">Взрослые</div>
          </div>
          <div class="right">
            <button
              class="circle"
              :disabled="adultsCount === 1"
              @click="store.changeCounts(adultsCount - 1, childrenCount)"
            >
              <Minus />
            </button>
            <div class="count">{{ adultsCount }}</div>
            <button
              class="circle"
              :disabled="adultsCount === 6"
              @click="store.changeCounts(adultsCount + 1, childrenCount)"
            >
              <Plus />
            </button>
          </div>
        </div>
        <div class="bar" />
        <div class="item">
          <div class="left">
            <div class="text">Дети</div>
            <div class="add">до 18 лет</div>
          </div>
          <div class="right">
            <button
              class="circle"
              :disabled="childrenCount === 0"
              @click="store.changeCounts(adultsCount, childrenCount - 1)"
            >
              <Minus />
            </button>
            <div class="count">{{ childrenCount }}</div>
            <button
              class="circle"
              :disabled="childrenCount === 6"
              @click="store.changeCounts(adultsCount, childrenCount + 1)"
            >
              <Plus />
            </button>
          </div>
        </div>
      </Block>
    </div>
    <div class="footer">
      <button class="btn" @click="$router.push('/')">Применить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.guests {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  height: 100%;
  gap: 10px;
}
.content {
  flex: 1;
}
.list {
  display: flex;
  flex-direction: column;
  &:last-child {
    padding-bottom: 0;
  }
}
.item {
  display: flex;
  align-items: center;
  padding: 12px 0;
}
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
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
.text {
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.43px;
  font-weight: 400;
}
.add {
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: -0.15px;
  color: var(--tg-theme-hint-color);
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.43px;
  font-weight: 600;
  color: var(--tg-theme-button-text-color);
  background-color: var(--tg-theme-button-color);
  border-radius: 12px;
  padding: 14px 0;
}
</style>
