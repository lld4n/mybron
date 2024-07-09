<script setup lang="ts">
import Text from "../../components/ui/wrappers/Text.vue";
import { defineAsyncComponent, onMounted, ref, watch } from "vue";
import { useInter } from "../../utils/i18n";
import { useRoute, useRouter } from "vue-router";
import { api, useStore } from "../../utils";
import { useSettings } from "../../utils/settings.ts";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
const Animation = defineAsyncComponent(
  () => import("../../components/ui/Animation.vue"),
);
const store = useStore();
const settings = useSettings();
const n1 = ref("");
const n2 = ref("");
const n3 = ref("");
const n4 = ref("");
const n5 = ref("");
const timer = ref(30);
const i1 = ref<HTMLInputElement>();
const i2 = ref<HTMLInputElement>();
const i3 = ref<HTMLInputElement>();
const i4 = ref<HTMLInputElement>();
const i5 = ref<HTMLInputElement>();
const error = ref(false);
const q = useInter();
const route = useRoute();
const router = useRouter();
onMounted(() => {
  setInterval(() => {
    timer.value--;
  }, 1000);
});
function isNumber(str: string) {
  return /^\d+$/.test(str);
}

watch(n1, (v) => {
  if (!isNumber(v)) {
    n1.value = "";
    return;
  } else if (v.length > 1) {
    n1.value = v[v.length - 1];
  } else {
    n1.value = v;
  }
  if (i2.value) i2.value.focus();
});
watch(n2, (v) => {
  if (!isNumber(v)) {
    n2.value = "";
    if (i1.value) i1.value.focus();
    return;
  } else if (v.length > 1) {
    n2.value = v[v.length - 1];
  } else {
    n2.value = v;
  }
  if (i3.value) i3.value.focus();
});
watch(n3, (v) => {
  if (!isNumber(v)) {
    n3.value = "";
    if (i2.value) i2.value.focus();
    return;
  } else if (v.length > 1) {
    n3.value = v[v.length - 1];
  } else {
    n3.value = v;
  }
  if (i4.value) i4.value.focus();
});
watch(n4, (v) => {
  if (!isNumber(v)) {
    n4.value = "";
    if (i3.value) i3.value.focus();
    return;
  } else if (v.length > 1) {
    n4.value = v[v.length - 1];
  } else {
    n4.value = v;
  }
  if (route.params.from === "email") authEmail();
  if (route.params.from === "phone" && i5.value) i5.value.focus();
});
watch(n5, (v) => {
  if (!isNumber(v)) {
    n5.value = "";
    if (i4.value) i4.value.focus();
    return;
  } else if (v.length > 1) {
    n5.value = v[v.length - 1];
  } else {
    n5.value = v;
  }
  if (route.params.from === "phone") authSms();
});

const authEmail = async () => {
  if (!settings.email) return;
  if (n1.value.length === 0) return;
  if (n2.value.length === 0) return;
  if (n3.value.length === 0) return;
  if (n4.value.length === 0) return;
  // const otp = n1.value + n2.value + n3.value + n4.value;
  // try {
  // TODO: запрос, уточнить
  // } catch (e) {
  window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 1000);
  // }
};

const authSms = async () => {
  if (!settings.phone) return;
  if (n1.value.length === 0) return;
  if (n2.value.length === 0) return;
  if (n3.value.length === 0) return;
  if (n4.value.length === 0) return;
  if (n5.value.length === 0) return;
  const otp = n1.value + n2.value + n3.value + n4.value + n5.value;
  try {
    await api
      .post("user/authorization-methods/sms-otp", {
        body: JSON.stringify({ phone: settings.phone, otp }),
        headers: {
          "Content-Type": "application/json",
          Authorization: store.auth,
        },
      })
      .json();
    await router.push("/settings");
    store.setMessage({
      type: "linked",
      text: q.i18n.settings.code.page.pp,
    });
  } catch (e) {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 1000);
  }
};

const sendAgain = async () => {
  if (!store.auth) return;
  if (route.params.from === "phone") {
    if (!settings.phone) return;
    await api
      .post("auth/request-sms-otp", {
        body: JSON.stringify({ phone: settings.phone }),
        headers: {
          "Content-Type": "application/json",
          Authorization: store.auth,
        },
      })
      .json();
    timer.value = 30;
  }
};
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <div :class="$style.top">
        <Animation type="speech" :c="$style.animation" :loop="false" />
        <div :class="$style.info">
          <Text :s="28" :l="34" :w="700">{{ q.i18n.settings.code.page.bbvtdi }}</Text>
          <Text :s="17" :l="22">
            <template v-if="route.params.from === 'phone'">
              {{ q.i18n.settings.code.page.phone }}
              {{ settings.phone }}
            </template>
            <template v-if="route.params.from === 'email'">
              {{ q.i18n.settings.code.page.email }}
              {{ settings.email }}
            </template>
          </Text>
        </div>
        <div :class="$style.inputs">
          <input
            type="text"
            v-model="n1"
            inputmode="numeric"
            :class="[
              $style.input,
              {
                [$style.error]: error,
              },
            ]"
            ref="i1"
          />
          <input
            type="text"
            v-model="n2"
            inputmode="numeric"
            :class="[
              $style.input,
              {
                [$style.error]: error,
              },
            ]"
            ref="i2"
          />
          <input
            type="text"
            v-model="n3"
            inputmode="numeric"
            :class="[
              $style.input,
              {
                [$style.error]: error,
              },
            ]"
            ref="i3"
          />
          <input
            type="text"
            v-model="n4"
            inputmode="numeric"
            :class="[
              $style.input,
              {
                [$style.error]: error,
              },
            ]"
            ref="i4"
          />
          <input
            v-if="route.params.from === 'phone'"
            type="text"
            v-model="n5"
            inputmode="numeric"
            :class="[
              $style.input,
              {
                [$style.error]: error,
              },
            ]"
            ref="i5"
          />
        </div>
      </div>
      <Text
        :s="17"
        :l="22"
        :w="600"
        :class="[
          $style.link,
          {
            [$style.disabled]: timer > 0,
          },
        ]"
        @click="sendAgain"
      >
        {{ q.i18n.settings.code.page.immkek }}
        <template v-if="timer > 0">0:{{ timer >= 10 ? timer : "0" + timer }}</template>
      </Text>
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.link {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  cursor: pointer;
  color: var(--tg-theme-link-color);
  transition: opacity 0.1s ease-out;
  padding: 14px 0 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.disabled {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.4;
}
.animation {
  width: 96px;
  height: 96px;
}
.top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
}
.info {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 320px;
  padding: 20px 0 24px;
}
.inputs {
  display: flex;
  gap: 8px;
  align-items: center;
}
.input {
  width: 40px;
  height: 48px;
  background-color: var(--tg-theme-bg-color);
  border: 2px solid var(--tg-theme-bg-color);
  text-align: center;
  border-radius: 12px;
  font-size: 20px;
  line-height: 24px;
  color: var(--tg-theme-text-color);
  &:focus {
    border: 2px solid var(--tg-theme-button-color);
  }
}
.error {
  border: 2px solid var(--tg-theme-destructive-text-color);
}
</style>
