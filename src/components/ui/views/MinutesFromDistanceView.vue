<script setup lang="ts">
import { onMounted, ref } from "vue";

const list: [number, number, string][] = [
  [0, 0.1, "1"],
  [0.1, 0.2, "2"],
  [0.2, 0.3, "4"],
  [0.3, 0.4, "5"],
  [0.4, 0.5, "6"],
  [0.5, 0.6, "7"],
  [0.6, 0.7, "8"],
  [0.7, 0.8, "10"],
  [0.8, 0.9, "11"],
  [0.9, 1, "12"],
  [1, 1.1, "13"],
  [1.1, 1.2, "14"],
  [1.2, 1.3, "16"],
  [1.3, 1.4, "17"],
  [1.4, 1.5, "18"],
  [1.5, 1.6, "19"],
  [1.6, 1.7, "20"],
  [1.7, 1.8, "22"],
  [1.8, 1.9, "23"],
  [2, 3, "36"],
  [3, 4, "48"],
  [4, 5, "60"],
];
interface Props {
  d: number;
}
const render = ref("");

onMounted(() => {
  for (const item of list) {
    if (props.d >= item[0] && props.d <= item[1]) {
      render.value = item[2] + " минут пешком до центра";
      break;
    }
  }
  if (render.value.length === 0) {
    render.value = "до центра больше часа";
  }
});
const props = defineProps<Props>();
</script>

<template>
  <span>{{ render }}</span>
</template>
