<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import X from "../../assets/hotel-buttons/x.svg";
import Phone from "../../assets/hotel-buttons/phone.svg";
import Chat from "../../assets/hotel-buttons/chat.svg";
import { useInter } from "../../utils/i18n";
import Text from "../ui/wrappers/Text.vue";
const q = useInter();

const handleCancel = () => {
  window.Telegram.WebApp.showPopup(
    {
      title: q.i18n.hotel.buttons.cancel,
      message: "52",
      buttons: [
        {
          id: "close",
          type: "close",
          text: q.i18n.hotel.buttons.popup.close,
        },
        {
          id: "cancel",
          type: "destructive",
          text: q.i18n.hotel.buttons.popup.cancel,
        },
      ],
    },
    (button_id) => {
      console.log(button_id);
    },
  );
};
</script>

<template>
  <Block>
    <div :class="$style.wrapper">
      <div :class="$style.item" @click="handleCancel">
        <div :class="$style.icon">
          <X />
        </div>
        <Text :s="14" :l="18">{{ q.i18n.hotel.buttons.cancel }}</Text>
      </div>
      <div :class="$style.item">
        <div :class="$style.icon">
          <Phone />
        </div>
        <Text :s="14" :l="18">{{ q.i18n.hotel.buttons.call }}</Text>
      </div>
      <div :class="$style.item">
        <div :class="$style.icon">
          <Chat />
        </div>
        <Text :s="14" :l="18">{{ q.i18n.hotel.buttons.chat }}</Text>
      </div>
    </div>
  </Block>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  gap: 12px;
  padding: 20px 16px;
}
.item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--quarternary-fill-background);
  display: flex;
  justify-content: center;
  align-items: center;

  path {
    fill: var(--tg-theme-text-color);
  }
}
</style>
