<script setup lang="ts">
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import Text from "../../components/ui/wrappers/Text.vue";
const Animation = defineAsyncComponent(
  () => import("../../components/ui/Animation.vue"),
);
import { defineAsyncComponent, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useInter } from "../../utils/i18n";
import { api, useStore } from "../../utils";
import { useSettings } from "../../utils/settings.ts";
const value = ref("");
const router = useRouter();
const store = useStore();
const settings = useSettings();
const q = useInter();

onMounted(() => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.secondary_bg_color || "";
  if (settings.email.length === 0) {
    router.push("/settings/email");
  }
});

const send = async () => {
  if (value.value.length === 0 || !store.auth) return;
  let flag = true;
  try {
    await api.post("user/authorization-methods/email-password", {
      body: JSON.stringify({
        email: settings.email,
        password: value.value,
        activationMethod: "BY_CODE",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: store.auth,
      },
    });
  } catch (e) {
    flag = false;
    window.Telegram.WebApp.showPopup(
      {
        title: q.i18n.settings.phone.page.artlpke,
        message: q.i18n.settings.phone.page.upokile,
        buttons: [
          {
            id: "close",
            type: "default",
            text: q.i18n.settings.phone.page.xwkfmw,
          },
        ],
      },
      () => {},
    );
  }
  try {
    if (!flag) return;
    await api.post("user/email-activation/request-activation-email/by-code", {
      headers: {
        Authorization: store.auth,
      },
    });
  } catch (e) {
    flag = false;
    window.Telegram.WebApp.showPopup(
      {
        title: q.i18n.settings.phone.page.artlpke,
        message: q.i18n.settings.phone.page.upokile,
        buttons: [
          {
            id: "close",
            type: "default",
            text: q.i18n.settings.phone.page.xwkfmw,
          },
        ],
      },
      () => {},
    );
  }
  if (flag) {
    await router.push("/settings/code/email");
  }
};
</script>

<template>
  <Wrapper
    :class="$style.wrapper"
    :label="q.i18n.settings.email.page.zsilhn"
    :click="send"
  >
    <div :class="$style.block">
      <Animation type="locker" :c="$style.animation" :loop="false" />
    </div>
    <div :class="$style.top">
      <!--      TODO: перевод-->
      <Text :s="28" :l="34" :w="700">Придумайте пароль</Text>
      <Text :s="17" :l="22">От 6 символов. Пароль понадобится для входа на сайт</Text>
    </div>
    <div :class="$style.content">
      <input
        type="password"
        :class="$style.input"
        v-model="value"
        placeholder="Пароль"
      />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.animation {
  width: 96px;
  height: 96px;
}
.block {
  padding: 24px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  text-align: center;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  width: 100%;
}
.input {
  width: 100%;
  background-color: var(--tg-theme-bg-color);
  padding: 12px 16px;
  color: var(--tg-theme-text-color);
  font-size: 20px;
  line-height: 24px;
  border-radius: 12px;
  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
</style>
