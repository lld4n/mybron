<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import StatusView from "../ui/views/StatusView.vue";
import Title from "../ui/wrappers/Title.vue";
import { useInter } from "../../utils/i18n";
import Text from "../ui/wrappers/Text.vue";
import CopyButton from "../ui/CopyButton.vue";
import HotelButton from "./HotelButton.vue";

interface Props {
  status: string;
  id: number;
}

defineProps<Props>();
const q = useInter();
const handle = () => {
  window.Telegram.WebApp.openTelegramLink("https://t.me/MoyabronBot");
};
</script>

<template>
  <Block>
    <div :class="$style.top">
      <div :class="$style.info">
        <StatusView
          :status="
            status === 'Ожидает подтверждения'
              ? 'success'
              : ['Аннулировано, без штрафа', 'Аннулировано, штраф'].includes(status)
                ? 'fail'
                : 'loading'
          "
        />
        <Title>{{ status }}</Title>
      </div>
      <Text :s="14" :l="18" :c="$style.copy">
        {{ q.i18n.hotel.status.number }}
        <CopyButton :text="String(id)" :title="q.i18n.hotel.status.copy" />
      </Text>
    </div>
    <HotelButton
      v-if="status === 'Новый'"
      :text="q.i18n.hotel.status.button"
      :click="handle"
    />
    <!--    <div :class="$style.fail" v-if="status === 'fail'">-->
    <!--      <div :class="$style.first">-->
    <!--        <Text :s="17" :l="22">{{ q.i18n.hotel.status.hold }}</Text>-->
    <!--        &lt;!&ndash;TODO: валюта&ndash;&gt;-->
    <!--        <Text :s="17" :l="22">52 000.52 ₽</Text>-->
    <!--      </div>-->
    <!--      <div :class="$style.first">-->
    <!--        <Text :s="17" :l="22">{{ q.i18n.hotel.status.return }}</Text>-->
    <!--        &lt;!&ndash;TODO: валюта&ndash;&gt;-->
    <!--        <Text :s="17" :l="22">25 000.29 ₽</Text>-->
    <!--      </div>-->
    <!--      <Text :s="17" :l="22" :c="$style.link">{{ q.i18n.hotel.status.dft }}</Text>-->
    <!--    </div>-->
  </Block>
</template>

<style module lang="scss">
.top {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px 16px 16px 16px;
}
.info {
  display: flex;
  align-items: center;
  gap: 6px;
}
.copy {
  display: flex;
  align-items: center;
  gap: 4px;
}
.fail {
  padding-left: 16px;
}
.first {
  padding: 11px 16px 11px 0;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
}
.link {
  cursor: pointer;
  padding: 11px 0;
  color: var(--tg-theme-link-color);
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
