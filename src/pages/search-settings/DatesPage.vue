<script setup lang="ts">
import DateView from "../../components/ui/views/DateView.vue";
import { months, useStore } from "../../utils";
import { computed } from "vue";

const weeks = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const dates = months();

const store = useStore();
const inDate = computed(() => store.in);
const outDate = computed(() => store.out);
console.log(store.in, store.out);
const areConsecutiveDates = (inDate: Date, outDate: Date) =>
  Math.abs(outDate.getDate() - inDate.getDate()) <= 1;
</script>

<template>
  <div class="dates">
    <div class="dates__main">
      <div class="dates__content">
        <div class="dates__week">
          <div class="dates__week__item" v-for="item of weeks">
            {{ item }}
          </div>
        </div>
        <template v-for="item of dates">
          <div class="dates__name" v-if="item.type === 'name'">{{ item.name }}</div>
          <div class="dates__line" v-if="item.type === 'line'">
            <template v-for="day of item.values">
              <button
                v-if="!!day"
                class="dates__day"
                :class="{
                  dates__day_active:
                    inDate?.getTime() === day.real.getTime() ||
                    outDate?.getTime() === day.real.getTime(),
                  dates__day_active_left: inDate?.getTime() === day.real.getTime(),
                  dates__day_active_right: outDate?.getTime() === day.real.getTime(),
                  dates__day_range:
                    day.real.getTime() > (inDate?.getTime() || 100 ** 10) &&
                    day.real.getTime() < (outDate?.getTime() || 0),
                  dates__day_active_one:
                    (inDate?.getTime() === day.real.getTime() && !outDate) ||
                    (outDate?.getTime() === day.real.getTime() && !inDate),
                  dates__day_left: day.position === 'left',
                  dates__day_right: day.position === 'right',
                  dates__day_consecutive_left:
                    outDate &&
                    inDate.getTime() === day.real.getTime() &&
                    areConsecutiveDates(inDate, outDate),
                  dates__day_consecutive_right:
                    outDate &&
                    outDate.getTime() === day.real.getTime() &&
                    areConsecutiveDates(inDate, outDate),
                }"
                :disabled="day.disabled"
                @click="store.changeDate(day.real)"
              >
                {{ day.day }}
              </button>
              <div v-if="!day" class="dates__empty" />
            </template></div
        ></template>
      </div>
    </div>
    <div class="dates__footer">
      <button
        class="dates__footer__btn"
        @click="$router.go(-1)"
        :disabled="!inDate || !outDate"
      >
        <span class="dates__footer__day" v-if="!outDate">
          {{ inDate.toLocaleDateString("RU-ru", { day: "numeric", month: "long" }) }}
        </span>
        <DateView
          v-if="!!inDate && !!outDate"
          :left="
            inDate?.toLocaleDateString('RU-ru', {
              day: 'numeric',
              month: inDate.getMonth() === outDate.getMonth() ? undefined : 'long',
            }) || 'Заезд'
          "
          :right="
            outDate?.toLocaleDateString('RU-ru', { day: 'numeric', month: 'long' }) ||
            'Выезд'
          "
        />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dates {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__main {
    flex: 1;
    padding: 8px 16px 90px;
  }
  &__name {
    width: 100%;
    padding: 16px 16px 4px 16px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    color: var(--tg-theme-text-color);
  }
  &__day {
    flex: 1;
    padding: 10px 0;
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    color: var(--tg-theme-text-color);
    z-index: 2;
    position: relative;
    &:disabled {
      color: var(--tg-theme-hint-color);
    }
    &_left {
      border-bottom-left-radius: 12px;
      border-top-left-radius: 12px;
    }
    &_right {
      border-bottom-right-radius: 12px;
      border-top-right-radius: 12px;
    }
    &_consecutive {
      &_left {
        border-bottom-right-radius: 0 !important;
        border-top-right-radius: 0 !important;
      }
      &_right {
        border-bottom-left-radius: 0 !important;
        border-top-left-radius: 0 !important;
      }
    }
    &_active {
      background-color: var(--tg-theme-button-color);
      color: var(--tg-theme-button-text-color);
      border-radius: 12px;

      &:before {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: var(--range-fill);
      }
      &_left:before {
        border-bottom-left-radius: 12px;
        border-top-left-radius: 12px;
      }
      &_right:before {
        border-bottom-right-radius: 12px;
        border-top-right-radius: 12px;
      }
      &_one:before {
        border-radius: 12px;
      }
    }
    &_range {
      background-color: var(--range-fill);
    }
  }
  &__empty {
    flex: 1;
  }
  &__line {
    display: flex;
    padding: 2px 8px;
  }
  &__content {
    background-color: var(--tg-theme-bg-color);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
  }
  &__week {
    display: flex;
    padding: 8px;
    &__item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--tg-theme-hint-color);
      font-size: 11px;
      line-height: 13px;
      font-weight: 500;
    }
  }
  &__header {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
  }
  &__block {
    cursor: pointer;
    display: flex;
    padding: 5px 10px;
    gap: 5px;
    align-items: center;
    border-radius: 8px;
    background-color: var(--quarternary-fill-background);
    width: 100%;
    &_active {
      cursor: default;
      padding: 13px 10px;
      .dates__block__top {
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.15px;
      }
    }
    &__left {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    &__top {
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      color: var(--tg-theme-hint-color);
    }
    &__bottom {
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
      letter-spacing: -0.15px;
      color: var(--tg-theme-text-color);
    }
    &__right {
      width: 20px;
      height: 20px;
      flex: 0 0 20px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--tertiary-fill-background);
      :deep(path) {
        fill: var(--tg-theme-hint-color);
      }
    }
  }
  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
    background-color: var(--tg-theme-bg-color);
    padding: 12px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    &__day {
      font-size: 17px;
      line-height: 22px;
      letter-spacing: -0.43px;
      font-weight: 600;
      color: var(--tg-theme-button-text-color);
    }
    &__btn {
      background-color: var(--tg-theme-button-color);
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      :deep(span) {
        font-size: 17px;
        line-height: 22px;
        letter-spacing: -0.43px;
        font-weight: 600;
        color: var(--tg-theme-button-text-color);
      }
      :deep(path) {
        fill: var(--tg-theme-button-text-color);
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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
  }
}
</style>
