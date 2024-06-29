<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Text from "../ui/wrappers/Text.vue";
import AddGuest from "../../assets/icons/add-guest.svg";
import { ref } from "vue";
import Title from "../ui/wrappers/Title.vue";
import Input from "../ui/Input.vue";
const show = ref(false);
const name = ref("");
const surname = ref("");
const handleShow = () => {
  show.value = !show.value;
};
</script>

<template>
  <Block>
    <div :class="$style.link" v-if="!show" @click="handleShow">
      <AddGuest />
      <Text :s="17" :l="22">Добавить второго гостя</Text>
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
