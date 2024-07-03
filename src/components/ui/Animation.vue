<script setup lang="ts">
import Luggage from "../../assets/loading/luggage.json";
import Phone from "../../assets/loading/phone.json";
import Mailbox from "../../assets/loading/mailbox.json";
import Speech from "../../assets/loading/speech.json";
import { LottieAnimation } from "lottie-web-vue";
interface Props {
  type: "luggage" | "phone" | "mailbox" | "speech";
  c: string;
  loop: boolean;
}

defineProps<Props>();
</script>

<template>
  <LottieAnimation
    :animation-data="Luggage"
    :auto-play="true"
    :loop="loop"
    :speed="1"
    :class="c"
    v-if="type === 'luggage'"
  />
  <LottieAnimation
    :animation-data="Phone"
    :auto-play="true"
    :loop="loop"
    :speed="1"
    :class="c"
    v-if="type === 'phone'"
  />
  <LottieAnimation
    :animation-data="Speech"
    :auto-play="true"
    :loop="loop"
    :speed="1"
    :class="c"
    v-if="type === 'speech'"
  />
  <LottieAnimation
    :animation-data="Mailbox"
    :auto-play="true"
    :loop="loop"
    :speed="1"
    :class="c"
    v-if="type === 'mailbox'"
  />
</template>
