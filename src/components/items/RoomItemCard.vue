<script setup lang="ts">
import Text from "../ui/wrappers/Text.vue";
import { RenderRoomItem } from "../../pages/hotel/types.ts";
import { dates, RoomDto, useStore } from "../../utils";
import Info from "../../assets/info.svg";
import { useInter } from "../../utils/i18n";
import { computed, ref } from "vue";
import TeleportRoom from "../common/TeleportRoom.vue";
import BedsView from "../ui/views/BedsView.vue";
interface Props {
  item: RenderRoomItem;
  room: RoomDto;
  click: (code: string) => void;
}
const store = useStore();
const show = ref<InfoTypeRoom | null>(null);
export type InfoTypeRoom = {
  title: string;
  type: "text" | "list" | "cancel";
  text: string;
  list: string[];
};
const props = defineProps<Props>();
const q = useInter();
type Render = {
  info: InfoTypeRoom | null;
  text: string;
  green: boolean;
};
const render = computed<Render[]>(() => {
  // TODO: перевод
  const ans: Render[] = [];
  if (props.item.meals.filter((e) => e.included).length === 0) {
    ans.push({
      info: null,
      text: "Питание не включено",
      green: false,
    });
  } else {
    ans.push({
      info: {
        type: "list",
        title: "Питание включено",
        list: props.item.meals.filter((e) => e.included).map((e) => e.name),
        text: "",
      },
      text: "Питание включено",
      green: true,
    });
  }

  if (props.item.cancel.length === 0) {
    ans.push({
      info: null,
      text: "Бесплатная отмена",
      green: true,
    });
  } else {
    const cancelDate = new Date(props.item.cancel[0].penaltyDateTime);
    ans.push({
      info: {
        type: "cancel",
        title: "Бесплатная отмена до " + dates(cancelDate, q.i18n),
        text: "",
        list: [],
      },
      text: "Бесплатная отмена до " + dates(cancelDate, q.i18n),
      green: true,
    });
  }

  if (props.item.guaranteeType === "contract") {
    if (props.item.payment === "HOTEL") {
      ans.push({
        info: null,
        text: "Оплата на месте",
        green: false,
      });
    } else {
      ans.push({
        info: {
          type: "text",
          title: "Оплата сейчас",
          list: [],
          text: "Оплата происходит в боте Моей Брони. Дополнительные взносы, при их наличии, оплачиваются при заезде",
        },
        text: "Оплата сейчас",
        green: false,
      });
    }
  } else {
    ans.push({
      info: {
        type: "text",
        title: "Оплата на месте + нужна карта",
        list: [],
        text: "Оплата проживания происходит при заселении. Для бронирования потребуется указать данные вашей карты.",
      },
      text: "Оплата на месте + нужна карта",
      green: false,
    });
  }

  return ans;
});

const handleClick = (info: InfoTypeRoom | null) => {
  show.value = info;
};

const handleClose = () => {
  show.value = null;
};

const checkBeds = () => {
  if (props.room.availableBedSets.bedSets.length === 0) return false;
  if (props.room.availableBedSets.bedSets[0].beds.length === 0) return false;
  return true;
};
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.list">
      <div :class="$style.bed" v-if="checkBeds()">
        <Text :s="13" :l="18" :class="$style.icon">
          <BedsView :type="room.availableBedSets.bedSets[0].beds[0].type" />
          x{{ room.availableBedSets.bedSets[0].beds[0].amount }}</Text
        >
        <Text :s="11" :l="13">тип кровати может измениться</Text>
      </div>
      <div :class="$style.item" v-for="item of render">
        <Text :s="13" :l="18" :class="[$style.text, { [$style.green]: item.green }]">{{
          item.text
        }}</Text>
        <Info
          v-if="item.info !== null"
          :class="$style.info"
          @click="() => handleClick(item.info)"
        />
      </div>
    </div>
    <div :class="$style.top">
      <Text :s="13" :l="18" v-if="!!store.out" :c="$style.gap">
        <span>
          {{ store.adultsCount + store.children.length }}
          {{ q.i18n.room.item.card.gyvohh }}</span
        >
        <span>•</span>
        <span
          >{{
            Math.ceil(
              (store.out?.getTime() - store.in.getTime()) / (1000 * 60 * 60 * 24),
            )
          }}
          {{ q.i18n.room.item.card.obupqn }}</span
        >
      </Text>
      <!--TODO: валюта-->
      <Text :s="20" :l="24" :w="700">{{ item.price }} ₽</Text>
    </div>

    <div :class="$style.container">
      <button :class="$style.btn" @click="() => click(item.code)">
        <Text :s="17" :l="22" :w="600">{{ q.i18n.room.item.card.hcbqwe }}</Text>
      </button>
    </div>
    <TeleportRoom
      :cancel="item.cancel[0] || null"
      :item="show"
      :show="!!show"
      :close="handleClose"
    />
  </div>
</template>

<style module lang="scss">
.gap {
  display: flex;
  align-items: center;
  gap: 4px;
}
.wrapper {
  padding: 12px 0 12px 12px;
  border: 1px solid var(--tg-theme-secondary-bg-color);
  border-radius: 12px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-left: 16px;
  }
}

.top {
  border-top: 1px solid var(--tg-theme-secondary-bg-color);
  padding: 8px 12px 8px 0;
  display: flex;
  flex-direction: column;
}

.list {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.container {
  padding-right: 12px;
}
.btn {
  min-width: 170px;
  width: 100%;
  padding: 14px 0;
  border-radius: 12px;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
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

.green {
  color: #34c759;
}

.item {
  border-top: 1px solid var(--tg-theme-secondary-bg-color);
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 8px 4px 8px 0;
}
.info {
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
.text {
  flex: 1;
}
.bed {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 8px;
}
.icon {
  display: flex;
  align-items: center;
  gap: 6px;
  path {
    fill: var(--tg-theme-text-color);
  }
}
</style>
