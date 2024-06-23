<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Text from "../ui/wrappers/Text.vue";
</script>

<template>
  <Block>
    <div :class="$style.link">
      <Text :s="17" :l="22">Указать всех гостей</Text>
    </div>
  </Block>
</template>

<style module lang="scss">
.link {
  cursor: pointer;
  padding: 11px 16px;
  color: var(--tg-theme-link-color);
}
</style>
