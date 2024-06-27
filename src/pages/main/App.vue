<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ky from "ky";
import { api, Geo, useStore } from "../../utils";
const store = useStore();
onMounted(async () => {
  try {
    const ipData: { ip: string } = await ky
      .get("https://api.ipify.org?format=json")
      .json();
    const coorData: Geo = await ky
      .get("https://ipapi.co/" + ipData.ip + "/json/")
      .json();
    store.setGeo(coorData);
    console.log(coorData);
  } catch (e) {}

  try {
    const userData = {
      initData: window.Telegram.WebApp.initDataUnsafe,
      initDataRaw: window.Telegram.WebApp.initData,
    };
    const jsonData = await api
      .post("/auth/sign-in/by-telegram", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      .json();
    console.log("AUTH", jsonData);
  } catch (e) {}
});
</script>

<style></style>
