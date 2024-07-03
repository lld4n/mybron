<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Text from "../ui/wrappers/Text.vue";
import AddWish from "../../assets/icons/add-wish.svg";
import { ref, watch } from "vue";
import Title from "../ui/wrappers/Title.vue";
import { useInter } from "../../utils/i18n";
const show = ref(false);
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const wish = ref("");
const handleShow = () => {
  show.value = !show.value;
};
watch(wish, () => {
  if (!textareaRef.value) return;
  textareaRef.value.style.height = "86px";
  if (textareaRef.value.scrollHeight < 300) {
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  } else {
    textareaRef.value.style.height = `300px`;
  }
});
const q = useInter();
</script>

<template>
  <Block>
    <div :class="$style.link" v-if="!show" @click="handleShow">
      <AddWish />
      <Text :s="17" :l="22">{{ q.i18n.wishes.block.tvddck }}</Text>
    </div>
    <div :class="$style.top" v-if="show">
      <Title>{{ q.i18n.wishes.block.bxygfb }}</Title>
      <Text :c="$style.link" :s="17" :l="22" @click="handleShow">{{
        q.i18n.wishes.block.iiqkxh
      }}</Text>
    </div>
    <Text v-if="show" :s="17" :l="22" :g="true" :c="$style.add"
      >{{ q.i18n.wishes.block.iutezy }}, {{ q.i18n.wishes.block.snktll }}.
      {{ q.i18n.wishes.block.dqnkzv }} {{ q.i18n.wishes.block.jwzsyk }}.</Text
    >
    <div :class="$style.block" v-if="show">
      <textarea
        :style="{ height: '86px' }"
        ref="textareaRef"
        v-model="wish"
        :class="$style.textarea"
        placeholder="{{ q.i18n.wishes.block.aifvgs }}"
      ></textarea>
    </div>
  </Block>
</template>

<style module lang="scss">
.link {
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
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

.add {
  padding: 4px 16px 0 16px;
}

.block {
  padding: 16px;
}

.textarea {
  padding: 12px;
  border-radius: 12px;
  background-color: var(--tertiary-fill-background);
  color: var(--tg-theme-text-color);
  resize: none;
  width: 100%;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;

  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
</style>
