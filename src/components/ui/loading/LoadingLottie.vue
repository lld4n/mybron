<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const Animation = defineAsyncComponent(() => import("../Animation.vue"));
</script>

<template>
  <Animation type="luggage" :c="$style.loading" :loop="true" />
</template>

<style module lang="scss">
.loading {
  width: 128px;
  height: 128px;
}
</style>
