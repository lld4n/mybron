<template>
  <div :class="$style.wrapper">
    <header :class="$style.header">
      <button :class="$style.btn" @click="$router.push('/reservation/my')">
        <Case />
      </button>
      <button :class="$style.btn" @click="$router.push('/settings')">
        <Settings />
      </button>
    </header>
    <main :class="$style.main">
      <Logo />
      <div :class="$style.title">
        <div>Забронируйте отель</div>
        <span>очень быстро</span>
      </div>
      <div :class="$style.list">
        <MainInfo :search="true" />
        <button :class="$style.find" @click="$router.push('/search/results')">
          Найти отели
        </button>
      </div>
    </main>
    <div :class="$style.content">
      <Block>
        <div :class="$style.top">
          <Title>Мои бронирования</Title>
          <div :class="$style.link" @click="$router.push('/reservation/my')">
            Больше
          </div>
        </div>
        <ReservationCard status="loading" />
      </Block>
      <Block>
        <div :class="$style.top">
          <Title>Недавние поиски</Title>
        </div>
        <div :class="$style.bottom">
          <Carousel>
            <div :class="$style.card" @click="$router.push('/hotel/1')">
              <img
                src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
                :class="$style.card__img"
              />
              <div :class="$style.card__right">
                <Text :w="600" :s="14" :l="18">Япония</Text>
                <Text :s="12" :l="16" :c="$style.card__date"
                  ><DateView left="29 сент" right="18 нояб" />, 2 гостя</Text
                >
              </div>
            </div>
            <div :class="$style.card" @click="$router.push('/hotel/1')">
              <img
                src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
                :class="$style.card__img"
              />
              <div :class="$style.card__right">
                <Text :w="600" :s="14" :l="18">Япония</Text>
                <Text :s="12" :l="16" :c="$style.card__date"
                  ><DateView left="29 сент" right="18 нояб" />, 2 гостя</Text
                >
              </div>
            </div>
            <div :class="$style.card" @click="$router.push('/hotel/1')">
              <img
                src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
                :class="$style.card__img"
              />
              <div :class="$style.card__right">
                <Text :w="600" :s="14" :l="18">Япония</Text>
                <Text :s="12" :l="16" :c="$style.card__date"
                  ><DateView left="29 сент" right="18 нояб" />, 2 гостя</Text
                >
              </div>
            </div>
          </Carousel>
        </div>
      </Block>
      <Block>
        <div :class="$style.top">
          <Title>Популярные</Title>
        </div>
        <div :class="$style.bottom">
          <Carousel>
            <div :class="$style.popular" @click="$router.push('/search/results')">
              <img
                src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
                :class="$style.popular__img"
              />
              <Text :w="600" :s="14" :l="18">Япония</Text>
              <Text :w="400" :s="12" :l="16">от 4800 ₽</Text>
            </div>
            <div :class="$style.popular" @click="$router.push('/search/results')">
              <img
                src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
                :class="$style.popular__img"
              />
              <Text :w="600" :s="14" :l="18">Япония</Text>
              <Text :w="400" :s="12" :l="16">от 4800 ₽</Text>
            </div>
            <div :class="$style.popular" @click="$router.push('/search/results')">
              <img
                src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
                :class="$style.popular__img"
              />
              <Text :w="600" :s="14" :l="18">Япония</Text>
              <Text :w="400" :s="12" :l="16">от 4800 ₽</Text>
            </div>
            <div :class="$style.popular" @click="$router.push('/search/results')">
              <img
                src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
                :class="$style.popular__img"
              />
              <Text :w="600" :s="14" :l="18">Япония</Text>
              <Text :w="400" :s="12" :l="16">от 4800 ₽</Text>
            </div>
          </Carousel>
        </div>
      </Block>
    </div>
  </div>
</template>

<script setup lang="ts">
import Case from "../../assets/icons/case.svg";
import Settings from "../../assets/icons/settings.svg";
import Logo from "../../assets/logo.svg";

import { router } from "../../utils";
import { onMounted } from "vue";

import Block from "../../components/ui/wrappers/Block.vue";
import DateView from "../../components/ui/views/DateView.vue";
import Carousel from "../../components/ui/carousel/Carousel.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import Text from "../../components/ui/wrappers/Text.vue";

import MainInfo from "../../components/common/MainInfo.vue";
import { useInter } from "../../utils/i18n";
import ReservationCard from "../../components/items/ReservationCard.vue";
const q = useInter();
console.log(window.Telegram);
onMounted(() => {
  if (window.Telegram.WebApp.initDataUnsafe.user?.language_code !== "ru") {
    q.changeLanguage("en");
  }
  window.Telegram.WebApp.expand();
  if (window.Telegram.WebApp.colorScheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
});
window.Telegram.WebApp.onEvent("backButtonClicked", () => {
  router.go(-1);
});
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 0;
  width: 100%;
}
.btn {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--tg-theme-bg-color);
  path {
    fill: var(--tg-theme-text-color);
  }
}
.main {
  padding: 0 16px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  padding: 18px 0 20px;
  text-align: center;
  font-size: 28px;
  line-height: 31px;
  font-weight: 700;
  display: flex;
  width: 100%;
  flex-direction: column;
  span {
    background: linear-gradient(90deg, #9f51e4 25%, #1554fd 75%);
    -webkit-background-clip: text;
    color: transparent;
  }
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.find {
  width: 100%;
  margin-top: 8px;
  padding: 14px 0;
  border-radius: 12px;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
}
.top {
  padding: 24px 16px 4px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
  align-items: center;
}
.link {
  cursor: pointer;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: var(--tg-theme-link-color);
}
.bottom {
  padding: 4px 0 8px;
}
.card {
  cursor: pointer;
  flex: 0 0 auto;
  min-width: 0;
  padding: 8px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  &__img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
  }
  &__right {
    display: flex;
    flex-direction: column;
  }
  &__date {
    color: var(--tg-theme-hint-color);
    svg {
      width: 10px;
      height: 8px;
    }
    path {
      fill: var(--tg-theme-hint-color);
    }
  }
}
.popular {
  cursor: pointer;
  flex: 0 0 160px;
  min-width: 0;
  position: relative;
  height: 200px;
  margin-right: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  div {
    color: white;
    z-index: 10;
  }
  &:first-child {
    margin-left: 16px;
  }
  &__img {
    position: absolute;
    width: 160px;
    height: 200px;
    border-radius: 12px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
  }
}
</style>
