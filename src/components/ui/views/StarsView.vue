<script setup lang="ts">
import StarsSmallOutLine from "../../../assets/icons/stars/star-small-outline.svg";
import StarsSmall from "../../../assets/icons/stars/star-small.svg";
import StarsBigOutLine from "../../../assets/icons/stars/star-big-outline.svg";
import StarsBig from "../../../assets/icons/stars/star-big.svg";
interface Props {
  type: "small" | "big";
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
  <div :class="$style.wrapper">
    <template v-for="flag of array">
      <StarsBig v-if="type === 'big' && flag" />
      <StarsBigOutLine v-if="type === 'big' && !flag" />
      <StarsSmall v-if="type === 'small' && flag" />
      <StarsSmallOutLine v-if="type === 'small' && !flag" />
    </template>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
