<script setup lang="ts">
import LoadingIcon from "../../../assets/loading/loading.svg";
</script>

<template>
  <LoadingIcon :class="$style.loading" />
</template>

<style module lang="scss">
.loading {
  animation: spin 1s linear infinite;
  path {
    stroke: var(--tg-theme-link-color);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
