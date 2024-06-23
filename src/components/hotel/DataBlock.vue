<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import Input from "../ui/Input.vue";
import { ref } from "vue";
const name = ref("");
const surname = ref("");
const phone = ref("");
const email = ref("");
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>Ваши данные</Title>
    </div>
    <div :class="$style.list">
      <Input id="name" label="Имя" v-model="name" />
      <Input id="surname" label="Фамилия" v-model="surname" />
      <Input id="phone" label="Телефон" v-model="phone" />
      <Input id="email" label="Почта" v-model="email" type="email" />
    </div>
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 20px;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px 16px;
}
</style>
