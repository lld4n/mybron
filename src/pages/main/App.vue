<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ky from "ky";
import { api, LiveSearchResponse, useStore } from "../../utils";
import { useInter } from "../../utils/i18n";
const store = useStore();

type sendData = {
  authDate: string;
  hash: string;
  queryId?: string;
  chatType?: string;
  chatInstance?: string;
  startParam?: string;
  canSendAfter?: number;
  chat?: {
    id: number;
    type: "group" | "supergroup" | "channel";
    title: string;
    username?: string;
    photoUrl?: string;
  };
  user?: sendDataUser;
  receiver?: sendDataUser;
};

type sendDataUser = {
  id: number;
  isBot?: boolean;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: true;
  addedToAttachmentMenu?: true;
  allowsWriteToPm?: true;
  photoUrl?: string;
};
const q = useInter();

onMounted(async () => {
  // @ts-ignore
  window.Telegram.WebApp.disableVerticalSwipes();

  window.Telegram.WebApp.CloudStorage.getItem("language", (_, value) => {
    console.log("определили язык", value);
    if (value) {
      q.changeLanguage(value as "en" | "ru");
    } else {
      if (window.Telegram.WebApp.initDataUnsafe.user?.language_code !== "ru") {
        q.changeLanguage("en");
      }
      window.Telegram.WebApp.CloudStorage.setItem("language", q.i18n.slug);
    }
  });
  window.Telegram.WebApp.CloudStorage.getItem("currency", (_, value) => {
    console.log("определили валюту", value);
    if (value) {
      q.changeCurrency(value as "RUB" | "EUR" | "USD");
    } else {
      window.Telegram.WebApp.CloudStorage.setItem("currency", q.currency);
    }
  });
  try {
    const ipData: { ip: string } = await ky
      .get("https://api.ipify.org?format=json")
      .json();
    const da: { location: { data: { city: string } } } = await ky
      .post("https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address", {
        body: JSON.stringify({ ip: ipData.ip }),
        headers: {
          Authorization: "Token ВСТАВИТЬ СЮДА КЛЮЧ",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .json();
    const data = await api.get("live-search", {
      searchParams: {
        q: da.location.data.city,
      },
    });
    const parsed: LiveSearchResponse = await data.json();
    store.setNear(parsed.liveSearchResults.filter((e) => e.type !== "HOTEL"));
  } catch (e) {}

  try {
    const data = window.Telegram.WebApp.initDataUnsafe;
    const initData: sendData = {
      authDate: new Date(data.auth_date * 1000).toISOString(),
      hash: data.hash,
    };
    if (data.query_id) initData.queryId = data.query_id;
    if (data.chat_type) initData.chatType = data.chat_type;
    if (data.chat_instance) initData.chatInstance = data.chat_instance;
    if (data.start_param) initData.startParam = data.start_param;
    if (data.can_send_after) initData.canSendAfter = data.can_send_after;
    if (data.user) {
      initData.user = {
        id: data.user.id,
        firstName: data.user.first_name,
      };
      if (data.user.last_name) initData.user.lastName = data.user.last_name;
      if (data.user.is_bot) initData.user.isBot = data.user.is_bot;
      if (data.user.username) initData.user.username = data.user.username;
      if (data.user.language_code) initData.user.languageCode = data.user.language_code;
      if (data.user.is_premium) initData.user.isPremium = data.user.is_premium;
      if (data.user.photo_url) initData.user.photoUrl = data.user.photo_url;
      if (data.user.added_to_attachment_menu)
        initData.user.addedToAttachmentMenu = data.user.added_to_attachment_menu;
      if (data.user.allows_write_to_pm)
        initData.user.allowsWriteToPm = data.user.allows_write_to_pm;
    }
    if (data.receiver) {
      initData.receiver = {
        id: data.receiver.id,
        firstName: data.receiver.first_name,
      };
      if (data.receiver.last_name) initData.receiver.lastName = data.receiver.last_name;
      if (data.receiver.is_bot) initData.receiver.isBot = data.receiver.is_bot;
      if (data.receiver.username) initData.receiver.username = data.receiver.username;
      if (data.receiver.language_code)
        initData.receiver.languageCode = data.receiver.language_code;
      if (data.receiver.is_premium)
        initData.receiver.isPremium = data.receiver.is_premium;
      if (data.receiver.photo_url) initData.receiver.photoUrl = data.receiver.photo_url;
      if (data.receiver.added_to_attachment_menu)
        initData.receiver.addedToAttachmentMenu =
          data.receiver.added_to_attachment_menu;
      if (data.receiver.allows_write_to_pm)
        initData.receiver.allowsWriteToPm = data.receiver.allows_write_to_pm;
    }
    if (data.chat) {
      initData.chat = {
        id: data.chat.id,
        title: data.chat.title,
        type: data.chat.type,
      };
      if (data.chat.photo_url) initData.chat.photoUrl = data.chat.photo_url;
      if (data.chat.username) initData.chat.username = data.chat.username;
    }
    const userData = {
      initData: initData,
      initDataRaw: window.Telegram.WebApp.initData,
    };
    const jsonData = await api.post("auth/sign-in/by-telegram", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    store.setAuth(jsonData.headers.get("Authorization") || "");
  } catch (e) {
    console.log(e);
  }
});
</script>

<style></style>
