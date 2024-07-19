<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Text from "../ui/wrappers/Text.vue";
import AddGuest from "../../assets/icons/add-guest.svg";
import { onMounted, ref, watch } from "vue";
import Input from "../ui/Input.vue";
import Title from "../ui/wrappers/Title.vue";
import { useInter } from "../../utils/i18n";
import { useOrder } from "../../utils";
const show = ref(false);
const order = useOrder();
const name = ref("");
const surname = ref("");
onMounted(() => {
  name.value = order.guestFirstName;
  surname.value = order.guestLastName;
});
const handleShow = () => {
  show.value = !show.value;
};
watch(name, (v) => order.change("guestFirstName", v));
watch(surname, (v) => order.change("guestLastName", v));
const q = useInter();
</script>

<template>
  <Block>
    <div :class="$style.link" v-if="!show" @click="handleShow">
      <AddGuest />
      <Text :s="17" :l="22">
        {{ q.i18n.guests.block.xxgqpx }}
      </Text>
    </div>
    <div :class="$style.top" v-if="show">
      <Title>{{ q.i18n.guests.block.idjerd }}</Title>
      <Text :c="$style.link" :s="17" :l="22" @click="handleShow">{{
        q.i18n.guests.block.ijdraj
      }}</Text>
    </div>
    <div :class="$style.list" v-if="show">
      <Input
        :name="q.i18n.guests.block.hkjmir"
        :placeholder="q.i18n.data.block.req"
        v-model="name"
      />
      <Input
        :placeholder="q.i18n.data.block.req"
        :name="q.i18n.guests.block.fyxknp"
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
  path {
    fill: var(--tg-theme-link-color);
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
  padding: 0 0 16px 16px;
}
</style>
