<script setup lang="ts">
import StarsSmallOutLine from "../../../assets/icons/stars/star-small-outline.svg";
import StarsSmall from "../../../assets/icons/stars/star-small.svg";
import StarsBigOutLine from "../../../assets/icons/stars/star-big-outline.svg";
import StarsBig from "../../../assets/icons/stars/star-big.svg";
import StarsVerySmall from "../../../assets/icons/stars/star-very-small.svg";
import StarsVerySmallOutLine from "../../../assets/icons/stars/star-very-small-outline.svg";
interface Props {
  type: "small" | "big" | "very small";
  level: number;
}
const props = defineProps<Props>();
const array: boolean[] = [];
let i = 1;
while (i <= 5) {
  array.push(i <= props.level);
  i++;
}
</script>

<template>
  <div :class="[$style.wrapper, { [$style.gap]: type === 'very small' }]">
    <template v-for="flag of array">
      <StarsBig v-if="type === 'big' && flag" />
      <StarsBigOutLine v-if="type === 'big' && !flag" />
      <StarsSmall v-if="type === 'small' && flag" />
      <StarsVerySmall v-if="type === 'very small' && flag" />
    </template>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}
.gap {
  gap: 2px;
}
</style>
