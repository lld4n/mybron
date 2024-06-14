<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {
  window.Telegram.WebApp.BackButton.isVisible = true;
  window.Telegram.WebApp.BackButton.onClick(() => {
    router.push("/");
  });
});

onUnmounted(() => {
  window.Telegram.WebApp.BackButton.isVisible = false;
});
</script>

<template>
  <router-link to="/">обратно</router-link>
</template>

<style scoped lang="scss"></style>
