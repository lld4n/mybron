<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ky from "ky";
import { Geo, useStore } from "../../utils";
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
});
</script>

<style></style>
