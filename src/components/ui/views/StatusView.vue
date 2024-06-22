<script setup lang="ts">
import LoadingIcon from "../../../assets/reservation/loading.svg";
import SuccessIcon from "../../../assets/reservation/success.svg";
import FailIcon from "../../../assets/reservation/fail.svg";
interface Props {
  status: "success" | "fail" | "loading";
}
defineProps<Props>();
</script>

<template>
  <SuccessIcon v-if="status === 'success'" />
  <FailIcon v-if="status === 'fail'" :class="$style.fail" />
  <LoadingIcon v-if="status === 'loading'" :class="$style.loader" />
</template>

<style module lang="scss">
.loader {
  animation: spin 3s linear infinite;
}
.fail {
  rect {
    fill: var(--tg-theme-hint-color);
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
