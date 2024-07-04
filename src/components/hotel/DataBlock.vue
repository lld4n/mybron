<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import Input from "../ui/Input.vue";
import { ref, watch } from "vue";
import { useHotel } from "../../utils";
import { useInter } from "../../utils/i18n";
const name = ref("");
const surname = ref("");
const hotel = useHotel();
// const phone = ref("");
// const email = ref("");
watch(name, (v) => {
  hotel.setInfo({
    firstName: v,
    lastName: surname.value,
  });
});
watch(surname, (v) => {
  hotel.setInfo({
    firstName: name.value,
    lastName: v,
  });
});
const q = useInter();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>{{ q.i18n.data.block.kzzaxu }}</Title>
    </div>
    <div :class="$style.list">
      <Input id="name" :label="q.i18n.data.block.gwiaje" v-model="name" />
      <Input id="surname" :label="q.i18n.data.block.bmjznr" v-model="surname" />
      <!--      <Input id="phone" label="{{ q.i18n.data.block.xzpwek }}" v-model="phone" />-->
      <!--      <Input id="email" label="{{ q.i18n.data.block.stnbmb }}" v-model="email" type="email" />-->
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
