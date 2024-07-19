<script setup lang="ts">
import Double from "../../../assets/beds/double.svg";
import Single from "../../../assets/beds/single.svg";
import Sofa from "../../../assets/beds/sofa.svg";
import Bunk from "../../../assets/beds/bunk.svg";
interface Props {
  type: string;
}

defineProps<Props>();
</script>

<template>
  <Double v-if="type === 'double'" />
  <Single v-if="type === 'single'" />
  <Sofa v-if="type === 'sofa'" />
  <Bunk v-if="type === 'bunk-bed'" />
</template>
