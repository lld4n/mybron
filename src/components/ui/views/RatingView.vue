<script setup lang="ts">
import Level0 from "../../../assets/icons/rating/0.svg";
import Level1 from "../../../assets/icons/rating/1.svg";
import Level2 from "../../../assets/icons/rating/2.svg";
import Level3 from "../../../assets/icons/rating/3.svg";
import Level4 from "../../../assets/icons/rating/4.svg";
import Level5 from "../../../assets/icons/rating/5.svg";
import Level6 from "../../../assets/icons/rating/6.svg";
import Level7 from "../../../assets/icons/rating/7.svg";
import Level8 from "../../../assets/icons/rating/8.svg";
import Level9 from "../../../assets/icons/rating/9.svg";
import Level10 from "../../../assets/icons/rating/10.svg";
import Level0M from "../../../assets/icons/rating/0m.svg";
import Level1M from "../../../assets/icons/rating/1m.svg";
import Level2M from "../../../assets/icons/rating/2m.svg";
import Level3M from "../../../assets/icons/rating/3m.svg";
import Level4M from "../../../assets/icons/rating/4m.svg";
import Level5M from "../../../assets/icons/rating/5m.svg";
import Level6M from "../../../assets/icons/rating/6m.svg";
import Level7M from "../../../assets/icons/rating/7m.svg";
import Level8M from "../../../assets/icons/rating/8m.svg";
import Level9M from "../../../assets/icons/rating/9m.svg";
import Level10M from "../../../assets/icons/rating/10m.svg";
interface Props {
  level: number;
  type: "small" | "big";
}
defineProps<Props>();
</script>

<template>
  <Level0 v-if="level === 0 && type === 'big'" />
  <Level1 v-if="level === 1 && type === 'big'" />
  <Level2 v-if="level === 2 && type === 'big'" />
  <Level3 v-if="level === 3 && type === 'big'" />
  <Level4 v-if="level === 4 && type === 'big'" />
  <Level5 v-if="level === 5 && type === 'big'" />
  <Level6 v-if="level === 6 && type === 'big'" />
  <Level7 v-if="level === 7 && type === 'big'" />
  <Level8 v-if="level === 8 && type === 'big'" />
  <Level9 v-if="level === 9 && type === 'big'" />
  <Level10 v-if="level === 10 && type === 'big'" />
  <Level0M v-if="level === 0 && type === 'small'" />
  <Level1M v-if="level === 1 && type === 'small'" />
  <Level2M v-if="level === 2 && type === 'small'" />
  <Level3M v-if="level === 3 && type === 'small'" />
  <Level4M v-if="level === 4 && type === 'small'" />
  <Level5M v-if="level === 5 && type === 'small'" />
  <Level6M v-if="level === 6 && type === 'small'" />
  <Level7M v-if="level === 7 && type === 'small'" />
  <Level8M v-if="level === 8 && type === 'small'" />
  <Level9M v-if="level === 9 && type === 'small'" />
  <Level10M v-if="level === 10 && type === 'small'" />
</template>

<style module lang="scss"></style>
