<script setup lang="ts">
import {
  OtherFiltersValues,
  PaymentFiltersValues,
  StarsFiltersValues,
  useStore,
} from "../../utils";
import Carousel from "../ui/carousel/Carousel.vue";
import Sort from "../../assets/icons/sort.svg";
import UpDown from "../../assets/icons/up-down.svg";
import StarsView from "../ui/views/StarsView.vue";
const store = useStore();
const toRenderPrice = (v: number) => {
  let ans = "";
  let i = 0;
  const s = String(v);
  for (let j = s.length - 1; j >= 0; j--) {
    i++;
    ans += s[j];
    if (i === 3) {
      i = 0;
      ans += " ";
    }
  }
  ans = ans.split("").reverse().join("");
  ans += " ₽";
  return ans.trim();
};
</script>

<template>
  <Carousel>
    <div
      :class="[$style.sort, { [$style.sorted]: store.filters.sort !== 'default' }]"
      @click="$router.push('/search/filter/sort')"
    >
      <Sort />
    </div>
    <div :class="$style.filter" @click="$router.push('/search/filter/price')">
      <div :class="$style.left">
        <div :class="$style.subtitle">Цена</div>
        <div :class="$style.title">
          <template
            v-if="store.filters.price[0] === 0 && store.filters.price[1] === 50000"
            >Любая</template
          >
          <template
            v-if="store.filters.price[0] === 0 && store.filters.price[1] !== 50000"
            >{{ "до " + toRenderPrice(store.filters.price[1]) }}</template
          >
          <template
            v-if="store.filters.price[0] !== 0 && store.filters.price[1] === 50000"
            >{{ "от " + toRenderPrice(store.filters.price[0]) }}</template
          >
          <template
            v-if="store.filters.price[0] !== 0 && store.filters.price[1] !== 50000"
            >{{
              toRenderPrice(store.filters.price[0]) +
              " — " +
              toRenderPrice(store.filters.price[1])
            }}</template
          >
        </div>
      </div>
      <UpDown />
    </div>
    <div :class="$style.filter" @click="$router.push('/search/filter/payment')">
      <div :class="$style.left">
        <div :class="$style.subtitle">Оплата</div>
        <div :class="$style.title">
          <template v-if="store.filters.payment.length === 0">Любая</template>
          <template
            v-else-if="store.filters.payment.length === PaymentFiltersValues.length"
            >Любая</template
          >
          <template v-else-if="store.filters.payment.length === 1">
            <template v-if="store.filters.payment[0] === 'hotel'"
              >Оплата в отеле</template
            >
            <template v-if="store.filters.payment[0] === 'agency'"
              >Оплата в агентстве</template
            >
          </template>
        </div>
      </div>
      <UpDown />
    </div>
    <div :class="$style.filter" @click="$router.push('/search/filter/stars')">
      <div :class="$style.left">
        <div :class="$style.subtitle">Звезды</div>
        <div :class="$style.title">
          <template
            v-if="
              store.filters.stars.length === 0 ||
              store.filters.stars.length === StarsFiltersValues.length
            "
            >Все</template
          >
          <template v-if="store.filters.stars.length === 1">
            <StarsView :level="store.filters.stars[0]" type="small" />
          </template>
          <template
            v-if="
              store.filters.stars.length > 1 &&
              store.filters.stars.length < StarsFiltersValues.length
            "
            >{{ store.filters.stars.length }} варианта</template
          >
        </div>
      </div>
      <UpDown />
    </div>
    <div :class="$style.filter" @click="$router.push('/search/filter/other')">
      <div :class="$style.left">
        <div :class="$style.subtitle">Другое</div>
        <div :class="$style.title">
          <template
            v-if="
              store.filters.other.length === 0 ||
              store.filters.other.length === OtherFiltersValues.length
            "
            >Все</template
          >
          <template v-else-if="store.filters.other.length === 1">
            <template v-if="store.filters.other[0] === 'card'"
              >С данными карты</template
            >
            <template v-if="store.filters.other[0] === 'breakfast'"
              >С завтраком</template
            >
          </template>
        </div>
      </div>
      <UpDown />
    </div>
  </Carousel>
</template>

<style module lang="scss">
.sort {
  margin-left: 16px;
  flex: 0 0 44px;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
  margin-right: 8px;
  cursor: pointer;
  path {
    fill: var(--tg-theme-text-color);
  }
}
.sorted {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--tg-theme-text-color);
    right: 10px;
    top: 10px;
  }
}

.filter {
  flex: 0 0 auto;
  min-width: 0;
  padding: 5px 10px;
  margin-right: 8px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  path {
    fill: var(--tg-theme-text-color);
  }
  &:last-child {
    margin-right: 16px;
  }
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
</style>
