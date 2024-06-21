<script setup lang="ts">
import Wrapper from "../../components/Wrapper.vue";
import MainInfo from "../../components/MainInfo.vue";
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Применить',
      click: () => $router.go(-1),
    }"
  >
    <MainInfo />
  </Wrapper>
</template>

<style lang="scss"></style>
