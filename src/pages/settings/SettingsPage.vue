<script setup lang="ts">
import InterIcon from "../../assets/settings/inter.svg";
import CurrencyIcon from "../../assets/settings/currency.svg";
import TelegramIcon from "../../assets/settings/telegram.svg";
import VKIcon from "../../assets/settings/vk.svg";
import YandexIcon from "../../assets/settings/ya.svg";
import PhoneIcon from "../../assets/settings/phone.svg";
import EmailIcon from "../../assets/settings/email.svg";
import HelpIcon from "../../assets/settings/help.svg";
import StarIcon from "../../assets/settings/star.svg";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import Block from "../../components/ui/wrappers/Block.vue";
import Text from "../../components/ui/wrappers/Text.vue";
import { onMounted, ref } from "vue";
import { useInter } from "../../utils/i18n";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";

const name = ref("");
onMounted(() => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.secondary_bg_color || "";
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
  name.value =
    (window.Telegram.WebApp.initDataUnsafe.user?.first_name ||
      q.i18n.settings.unknown) +
    " " +
    (window.Telegram.WebApp.initDataUnsafe.user?.last_name || "");
});
const q = useInter();
</script>

<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <Block>
        <div :class="$style.item" @click="$router.push('/settings/language')">
          <InterIcon />
          <div :class="$style.right">
            <Text :s="17" :l="22" :w="400">{{ q.i18n.settings.language }}</Text>
            <Text :s="17" :l="22" :w="400" :c="$style.info"
              >{{ q.i18n.name }} <ChevronRight
            /></Text>
          </div>
        </div>
        <div :class="$style.item" @click="$router.push('/settings/currency')">
          <CurrencyIcon />
          <div :class="$style.right">
            <Text :s="17" :l="22" :w="400">{{ q.i18n.settings.currency }}</Text>
            <Text :s="17" :l="22" :w="400" :c="$style.info"
              >{{ q.currency }} <ChevronRight
            /></Text>
          </div>
        </div>
      </Block>
      <div>
        <Text :s="13" :l="18" :c="$style.title">{{ q.i18n.settings.methods }}</Text>
        <Block>
          <div :class="$style.item">
            <TelegramIcon />
            <div :class="$style.right">
              <Text :s="17" :l="22" :w="400">Telegram</Text>
              <Text :s="17" :l="22" :w="400" :c="$style.info">{{ name }}</Text>
            </div>
          </div>
          <div :class="$style.item">
            <VKIcon />
            <div :class="$style.right">
              <Text :s="17" :l="22" :w="400">VK</Text>
              <Text :s="17" :l="22" :w="400" :c="$style.info"
                >{{ q.i18n.settings.add }} <ChevronRight
              /></Text>
            </div>
          </div>
          <div :class="$style.item">
            <YandexIcon />
            <div :class="$style.right">
              <Text :s="17" :l="22" :w="400">{{ q.i18n.settings.yandex }}</Text>
              <Text :s="17" :l="22" :w="400" :c="$style.info"
                >{{ q.i18n.settings.add }} <ChevronRight
              /></Text>
            </div>
          </div>
          <div :class="$style.item" @click="$router.push('/settings/phone')">
            <PhoneIcon />
            <div :class="$style.right">
              <Text :s="17" :l="22" :w="400">{{ q.i18n.settings.phone2 }}</Text>
              <Text :s="17" :l="22" :w="400" :c="$style.info"
                >{{ q.i18n.settings.add }} <ChevronRight
              /></Text>
            </div>
          </div>
          <div :class="$style.item" @click="$router.push('/settings/email')">
            <EmailIcon />
            <div :class="$style.right">
              <Text :s="17" :l="22" :w="400">{{ q.i18n.settings.email2 }}</Text>
              <Text :s="17" :l="22" :w="400" :c="$style.info"
                >{{ q.i18n.settings.add }} <ChevronRight
              /></Text>
            </div>
          </div>
        </Block>
      </div>
      <Block>
        <div :class="$style.item">
          <HelpIcon />
          <div :class="$style.right">
            <Text :s="17" :l="22" :w="400">{{ q.i18n.settings.help }}</Text>
          </div>
        </div>
        <div :class="$style.item">
          <StarIcon />
          <div :class="$style.right">
            <Text :s="17" :l="22" :w="400">{{ q.i18n.settings.news }}</Text>
          </div>
        </div>
      </Block>
      <Block>
        <Text :c="$style.link" :s="17" :l="22">{{ q.i18n.settings.juristic }}</Text>
      </Block>
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.item {
  cursor: pointer;
  display: flex;
  padding: 0 0 0 16px;
  align-items: center;
  gap: 18px;
  &:last-child {
    .right {
      border-bottom: none;
    }
  }
}
.right {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  align-items: center;
  flex: 1;
  padding: 11px 16px 11px 0;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
}
.info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--tg-theme-hint-color);
  path {
    stroke: var(--tg-theme-hint-color);
  }
}
.title {
  padding: 5px 16px;
  text-transform: uppercase;
  color: var(--tg-theme-hint-color);
}
.link {
  cursor: pointer;
  padding: 11px 16px;
  color: var(--tg-theme-link-color);
}
</style>
