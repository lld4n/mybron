<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {
  window.Telegram.WebApp.BackButton.isVisible = true;
  window.Telegram.WebApp.onEvent("backButtonClicked", () => {
    router.push("/");
  });
});
</script>

<template>
  <router-link to="/">обратно</router-link>
</template>

<style scoped lang="scss"></style>
