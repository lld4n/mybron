<script setup lang="ts">
import Car from "../../../assets/amenities/car.svg";
import Conference from "../../../assets/amenities/conference.svg";
import Cup from "../../../assets/amenities/cup.svg";
import Disabled from "../../../assets/amenities/disabled.svg";
import Fork from "../../../assets/amenities/fork.svg";
import Internet from "../../../assets/amenities/internet.svg";
import Paw from "../../../assets/amenities/paw.svg";
import PersonCard from "../../../assets/amenities/person-card.svg";
import Spa from "../../../assets/amenities/spa.svg";
import Sport from "../../../assets/amenities/sport.svg";
import Building from "../../../assets/amenities/building.svg";
import Dish from "../../../assets/amenities/dish.svg";
import Shield from "../../../assets/amenities/shield.svg";
import Teddy from "../../../assets/amenities/teddy.svg";
interface Props {
  group: string;
}

defineProps<Props>();
</script>

<template>
  <Internet v-if="group === 'Интернет'" :class="$style.icon" />
  <Car v-if="group === 'Транспорт'" :class="$style.icon" />
  <Building v-if="group === 'На территории'" :class="$style.icon" />
  <Conference v-if="group === 'Возможности для конференций'" :class="$style.icon" />
  <Cup v-if="group === 'Бары и рестораны'" :class="$style.icon" />
  <Dish v-if="group === 'Удобства в номере'" :class="$style.icon" />
  <Sport v-if="group === 'Развлечения и спорт'" :class="$style.icon" />
  <Paw v-if="group === 'Питомцы'" :class="$style.icon" />
  <PersonCard v-if="group === 'Стойка регистрации'" :class="$style.icon" />
  <Fork v-if="group === 'Питание'" :class="$style.icon" />
  <Spa v-if="group === 'Банный комплекс'" :class="$style.icon" />
  <Disabled v-if="group === 'Доступная среда'" :class="$style.icon" />
  <Shield v-if="group === 'Безопасность'" :class="$style.icon" />
  <Teddy v-if="group === 'Детям'" :class="$style.icon" />
</template>

<style module lang="scss">
.icon {
  path {
    fill: var(--tg-theme-hint-color);
  }
}
</style>
