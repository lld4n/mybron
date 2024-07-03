<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Text from "../ui/wrappers/Text.vue";
import AddGuest from "../../assets/icons/add-guest.svg";
import { onMounted, ref, watch } from "vue";
import Title from "../ui/wrappers/Title.vue";
import Input from "../ui/Input.vue";
import { useHotel } from "../../utils";
const show = ref(false);
const hotel = useHotel();
const name = ref("");
const surname = ref("");
interface Props {
  index: number;
}
onMounted(() => {
  name.value = hotel.guests[props.index].firstName;
  surname.value = hotel.guests[props.index].lastName;
  console.log(hotel.guests);
});
const props = defineProps<Props>();
const handleShow = () => {
  show.value = !show.value;
};
watch(name, (v) => {
  hotel.setGuestName(v, props.index, "first");
});
watch(surname, (v) => {
  hotel.setGuestName(v, props.index, "last");
});
</script>

<template>
  <Block>
    <div :class="$style.link" v-if="!show" @click="handleShow">
      <AddGuest />
      <Text :s="17" :l="22">
        <template v-if="index === 0">Добавить второго гостя</template>
        <template v-if="index === 1">Добавить третьего гостя</template>
        <template v-if="index === 2">Добавить четвертого гостя</template>
        <template v-if="index === 3">Добавить пятого гостя</template>
        <template v-if="index === 4">Добавить шестого гостя</template>
        <template v-if="index === 5">Добавить седьмого гостя</template>
        <template v-if="index === 6">Добавить восьмого гостя</template>
      </Text>
    </div>
    <div :class="$style.top" v-if="show">
      <Title>Второй гость</Title>
      <Text :c="$style.link" :s="17" :l="22" @click="handleShow">Свернуть</Text>
    </div>
    <div :class="$style.list" v-if="show">
      <Input :active="name.length > 0" id="name" label="Имя" v-model="name" />
      <Input
        :active="surname.length > 0"
        id="surname"
        label="Фамилия"
        v-model="surname"
      />
    </div>
  </Block>
</template>

<style module lang="scss">
.link {
  display: flex;
  cursor: pointer;
  gap: 14px;
  align-items: center;
  padding: 11px 16px;
  color: var(--tg-theme-link-color);
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.top {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px 0 16px;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px 16px;
}
</style>
