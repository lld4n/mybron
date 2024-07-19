<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Shield from "../../assets/card/shiled.svg";
import Maestro from "../../assets/card/maestro.svg";
import Mastercard from "../../assets/card/mastercard.svg";
import Visa from "../../assets/card/visa.svg";
import Union from "../../assets/card/union.svg";
import World from "../../assets/card/world.svg";
import Text from "../ui/wrappers/Text.vue";
import { ref, watch } from "vue";
import { useOrder } from "../../utils";
const number = ref("");
const term = ref("");
const cvv = ref("");
const owner = ref("");
const order = useOrder();
// TODO: перевод
function isNumber(str: string) {
  return /^\d+$/.test(str);
}
watch(number, (v) => {
  let ans = "";
  v = v.split(" ").join("");
  for (let i = 0; i < v.length; i++) {
    if (i === 16) continue;
    if (isNumber(v[i])) {
      ans += v[i];
      if ((i + 1) % 4 === 0 && i !== v.length - 1) {
        ans += " ";
      }
    }
  }
  number.value = ans;
  order.change("cardNumber", ans.split(" ").join(""));
});
watch(term, (v) => {
  let ans = "";
  v = v.split("/").join("");
  for (let i = 0; i < v.length; i++) {
    if (i === 4) continue;
    if (isNumber(v[i])) {
      ans += v[i];
      if (i === 1) {
        ans += "/";
      }
    }
  }
  term.value = ans;
  order.change("cardTerm", ans);
});
watch(cvv, (v) => {
  let ans = "";
  for (let i = 0; i < v.length; i++) {
    if (i === 3) continue;
    if (isNumber(v[i])) {
      ans += v[i];
    }
  }
  cvv.value = ans;
  order.change("cardCVV", ans);
});
watch(owner, (v) => order.change("cardOwner", v));
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Shield />
      <Text :s="17" :l="22" :w="500" :c="$style.green">Гарантия бронирования</Text>
    </div>
    <Text :s="17" :l="22" :c="$style.text"
      >Данные вашей банковской карты нужны чтобы гарантировать бронирование. Отель
      получит данные карты и спишет полную стоимость при заселении. Бронь будет
      действительна сразу после нажатия на кнопку «Забронировать».</Text
    >
  </Block>
  <Block>
    <div :class="$style.top">
      <Text :s="20" :l="24" :w="700">Добавить карту</Text>
    </div>
    <div :class="$style.cards">
      <Visa />
      <Mastercard />
      <World />
      <Maestro />
      <Union />
    </div>
    <div :class="$style.inputs">
      <input
        type="text"
        :class="$style.input"
        v-model="number"
        placeholder="Номер карты"
        name="number"
        inputmode="numeric"
      />
      <div :class="$style.line">
        <input
          type="text"
          :class="$style.input"
          v-model="term"
          placeholder="ММ / ГГ"
          name="term"
          inputmode="numeric"
        />
        <input
          type="password"
          :class="$style.input"
          v-model="cvv"
          placeholder="CVV код"
          name="cvv"
          inputmode="numeric"
          autocomplete="none"
        />
      </div>
      <input
        type="text"
        :class="$style.input"
        v-model="owner"
        placeholder="Имя и фамилия владельца карты"
        name="owner"
      />
    </div>
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 16px 16px 4px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.green {
  color: #009411;
}
.text {
  padding: 0 16px 12px 16px;
}
.cards {
  padding: 4px 16px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.inputs {
  padding: 0 16px 16px 16px;
}
.input {
  width: 100%;
  font-size: 17px;
  line-height: 22px;
  background-color: transparent;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-text-color);
  padding: 11px 0;
  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
.line {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
