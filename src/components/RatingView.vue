<script setup lang="ts">
import Level0 from "../assets/icons/rating/0.svg";
import Level1 from "../assets/icons/rating/1.svg";
import Level2 from "../assets/icons/rating/2.svg";
import Level3 from "../assets/icons/rating/3.svg";
import Level4 from "../assets/icons/rating/4.svg";
import Level5 from "../assets/icons/rating/5.svg";
import Level6 from "../assets/icons/rating/6.svg";
import Level7 from "../assets/icons/rating/7.svg";
import Level8 from "../assets/icons/rating/8.svg";
import Level9 from "../assets/icons/rating/9.svg";
import Level10 from "../assets/icons/rating/10.svg";
interface Props {
  level: number;
  clas?: string;
}
defineProps<Props>();
</script>

<template>
  <Level0 v-if="level === 0" :class="clas" />
  <Level1 v-if="level === 1" :class="clas" />
  <Level2 v-if="level === 2" :class="clas" />
  <Level3 v-if="level === 3" :class="clas" />
  <Level4 v-if="level === 4" :class="clas" />
  <Level5 v-if="level === 5" :class="clas" />
  <Level6 v-if="level === 6" :class="clas" />
  <Level7 v-if="level === 7" :class="clas" />
  <Level8 v-if="level === 8" :class="clas" />
  <Level9 v-if="level === 9" :class="clas" />
  <Level10 v-if="level === 10" :class="clas" />
</template>

<style module lang="scss"></style>
