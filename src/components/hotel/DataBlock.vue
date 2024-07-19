<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import Input from "../ui/Input.vue";
import { ref, watch } from "vue";
import { useOrder } from "../../utils";
import { useInter } from "../../utils/i18n";
const name = ref("");
const surname = ref("");
const phone = ref("");
const email = ref("");
const order = useOrder();
watch(name, (v) => order.change("firstName", v));
watch(surname, (v) => order.change("lastName", v));
watch(phone, (v) => order.change("phone", v));
watch(email, (v) => order.change("email", v));
const q = useInter();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>{{ q.i18n.data.block.kzzaxu }}</Title>
    </div>
    <div :class="$style.list">
      <Input
        v-model="name"
        :name="q.i18n.data.block.gwiaje"
        :placeholder="q.i18n.data.block.req"
      />
      <Input
        v-model="surname"
        :name="q.i18n.data.block.bmjznr"
        :placeholder="q.i18n.data.block.req"
      />
      <Input v-model="phone" :name="'Телефон'" :placeholder="q.i18n.data.block.req" />
      <Input v-model="email" :name="'Почта'" :placeholder="q.i18n.data.block.req" />
    </div>
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 12px;
}
.list {
  display: flex;
  flex-direction: column;
  padding: 0 0 16px 16px;
}
</style>
