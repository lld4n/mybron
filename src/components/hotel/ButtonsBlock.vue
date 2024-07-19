<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import X from "../../assets/hotel-buttons/x.svg";
import Phone from "../../assets/hotel-buttons/phone.svg";
import Chat from "../../assets/hotel-buttons/chat.svg";
import { useInter } from "../../utils/i18n";
import Text from "../ui/wrappers/Text.vue";
import { api, useStore } from "../../utils";
import { useRouter } from "vue-router";
interface Props {
  id: number;
  noShowCancel?: boolean;
  cancelDate?: Date;
}

const props = defineProps<Props>();
const q = useInter();
const store = useStore();
const router = useRouter();
const handleCancel = () => {
  if (!store.auth) return;
  const now = new Date();
  window.Telegram.WebApp.showPopup(
    {
      title: q.i18n.hotel.buttons.cancel,
      message:
        props.cancelDate && now.getTime() > props.cancelDate.getTime()
          ? "Платная отмена"
          : q.i18n.hotel.buttons.popup.nnn,
      buttons: [
        {
          id: "cancel",
          type: "destructive",
          text: q.i18n.hotel.buttons.popup.cancel,
        },
        {
          id: "close",
          type: "default",
          text: q.i18n.hotel.buttons.popup.close,
        },
      ],
    },
    (button_id) => {
      if (button_id === "cancel") {
        api
          .post("order/" + props.id + "/cancel", {
            headers: {
              Authorization: store.auth,
            },
          })
          .json()
          .then((res: any) => {
            console.log(res);
            if ("message" in res) {
              window.Telegram.WebApp.showAlert(res.message);
            } else {
              store.setMessage({
                type: "cancel",
                text: q.i18n.hotel.buttons.message.canceled,
              });
              router.push("/reservation/my");
            }
          });
      }
    },
  );
};

const handleBot = () => {
  window.Telegram.WebApp.openTelegramLink("https://t.me/MoyabronBot");
};
</script>

<template>
  <Block>
    <div :class="$style.wrapper">
      <div :class="$style.item" @click="handleCancel" v-if="!noShowCancel">
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
      <div :class="$style.item" @click="() => handleBot()">
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
