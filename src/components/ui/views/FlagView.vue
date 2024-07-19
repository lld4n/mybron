<script setup lang="ts">
interface Props {
  code: string;
}

defineProps<Props>();
</script>

<template>
  <img :src="'/flags/' + code.toUpperCase() + '.svg'" alt="icon" :class="$style.icon" />
</template>

<style module lang="scss">
.icon {
  width: 22px;
  object-fit: cover;
  border: 1px solid #0000001a;
  border-radius: 1.5px;
}
</style>
