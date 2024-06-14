<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  window.Telegram.WebApp.BackButton.isVisible = true;
});
</script>

<template>
  <router-link to="/">обратно</router-link>
</template>

<style scoped lang="scss"></style>
