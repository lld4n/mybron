<script setup lang="ts">
// import HotelCard from "../../components/items/HotelCard.vue";
import FilterView from "../../components/common/FilterView.vue";
import ShapeIcon from "../../assets/icons/shape.svg";
import X from "../../assets/icons/x.svg";
import { computed, ref, watch } from "vue";
import { useSwipe } from "@vueuse/core";
const viewInfo = ref<"in" | "out" | "default">("default");
const el = ref(null);
const container = ref(null);
// @ts-ignore
const height = computed(() => container.value?.offsetHeight);
const bottom = ref("0");

watch(viewInfo, (value) => {
  if (value) {
    bottom.value = "0";
  }
});

const { isSwiping, lengthY } = useSwipe(el, {
  passive: false,
  onSwipe() {
    if (height.value) {
      if (lengthY.value < 0) {
        const length = Math.abs(lengthY.value);
        bottom.value = `-${length}px`;
      } else {
        bottom.value = "0";
      }
    }
  },
  onSwipeEnd() {
    if (
      lengthY.value < 0 &&
      height.value &&
      Math.abs(lengthY.value) / height.value >= 0.5
    ) {
      bottom.value = "-100%";
      setTimeout(() => {
        viewInfo.value = "default";
      }, 300);
    } else {
      bottom.value = "0";
    }
  },
});

const handleClose = () => {
  if (viewInfo.value === "in") {
    viewInfo.value = "out";
    setTimeout(() => {
      viewInfo.value = "default";
    }, 450);
  } else viewInfo.value = "in";
};
</script>

<template>
  <div :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.info" @click="$router.push('/search/filter/info')">
        <div :class="$style.title">Адлер, Россия</div>
        <div :class="$style.subtitle">31 мая — 8 июня, 2 взрослых</div>
      </div>
      <FilterView />
    </header>
    <div :class="$style.map" @click="handleClose">Здесь будет карта</div>
    <div
      :class="[
        $style.view,
        {
          [$style.animated]: !isSwiping,
          [$style.out]: viewInfo === 'out',
        },
      ]"
      v-if="viewInfo !== 'default'"
      ref="container"
      :style="{ bottom }"
    >
      <div :class="$style.top" ref="el">
        <div :class="$style.line" />
      </div>
      <button :class="$style.close" @click.prevent="handleClose">
        <X />
      </button>
      <!--      <HotelCard />-->
    </div>
    <div :class="$style.block">
      <button :class="$style.btn" @click="$router.push('/search/results')">
        <ShapeIcon /> Список
      </button>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--tg-theme-bg-color);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0 8px 0;
}
.info {
  cursor: pointer;
  margin: 0 16px;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
}
.title {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: var(--tg-theme-text-color);
}
.subtitle {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--tg-theme-hint-color);
}
.block {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--tg-theme-bg-color);
  position: fixed;
  bottom: 12px;
  right: 12px;
  border-radius: 12px;
}
.btn {
  display: flex;
  padding: 13px 24px;
  border-radius: 11px;
  font-size: 17px;
  line-height: 22px;
  align-items: center;
  font-weight: 600;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  gap: 6px;
  path {
    fill: var(--tg-theme-button-text-color);
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
.map {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6d6d71;
  height: 100%;
}
.view {
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--tg-theme-bg-color);
  padding-bottom: 12px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  animation: in_anim 0.5s ease;
  &.animated {
    transition: all 0.2s ease-in-out;
  }
  &.out {
    animation: out_anim 0.5s ease;
  }
}

@keyframes out_anim {
  from {
    bottom: 0;
  }
  to {
    bottom: -100%;
  }
}
@keyframes in_anim {
  from {
    bottom: -100%;
  }
  to {
    bottom: 0;
  }
}

.top {
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line {
  height: 3px;
  width: 24px;
  background-color: var(--tg-theme-hint-color);
  border-radius: 2px;
}
.close {
  position: absolute;
  top: 24px;
  right: 20px;
  background-color: var(--tg-theme-bg-color);
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  border-radius: 50%;
  box-shadow:
    0 4px 12px 0 #00000029,
    0 1px 1px 0 #00000029;
  path {
    fill: var(--tg-theme-text-color);
  }
  svg {
    width: 15px;
    height: 15px;
  }
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    svg {
      opacity: 0.6 !important;
    }
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      svg {
        opacity: 0.85;
      }
    }
  }
}
</style>
