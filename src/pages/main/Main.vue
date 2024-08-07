<template>
  <Wrapper>
    <div :class="$style.wrapper">
      <header :class="$style.header">
        <button :class="$style.btn" @click="$router.push('/settings')">
          <Settings />
        </button>
        <div :class="$style.right">
          <button :class="$style.btn" @click="$router.push('/likes')">
            <Like />
          </button>
          <button :class="$style.btn" @click="$router.push('/reservation/my')">
            <Case />
          </button>
        </div>
      </header>

      <main :class="$style.main">
        <Logo />
        <div :class="$style.title">
          <div>{{ q.i18n.main.fzchhj }}</div>
          <span :class="$style.animate">{{ q.i18n.main.ojanrn }}</span>
        </div>
        <div :class="$style.list">
          <MainInfo :search="true" />
          <button :class="$style.find" @click="handleFind">
            {{ q.i18n.main.gumfav }}
          </button>
        </div>
      </main>
      <div :class="$style.content">
        <Block v-if="list.length > 0">
          <div :class="$style.top">
            <Title>{{ q.i18n.main.bqbral }}</Title>
            <div :class="$style.link" @click="$router.push('/reservation/my')">
              {{ q.i18n.main.grrgsf }}
            </div>
          </div>
          <ReservationCard
            :id="list[0].id"
            :in-date="new Date(list[0].checkInDate)"
            :out-date="new Date(list[0].checkOutDate)"
            :city="list[0].hotel.city.name"
            :name="list[0].hotel.name"
            :status="
              list[0].status === 'Подтвержден'
                ? 'success'
                : ['Аннулировано, без штрафа', 'Аннулировано, штраф'].includes(
                      list[0].status,
                    )
                  ? 'fail'
                  : 'loading'
            "
          />
        </Block>
        <Block v-if="lastSearch.list.length > 0">
          <div :class="$style.top">
            <Title>{{ q.i18n.main.bzrkjs }}</Title>
          </div>
          <div :class="$style.bottom">
            <Carousel>
              <div
                v-for="item of lastSearch.list"
                :class="$style.card"
                @click="() => handleLastSearchClick(item.type, item.id, item.name)"
              >
                <img v-if="!!item.image" :src="item.image" :class="$style.card__img" />
                <template v-if="!item.image">
                  <div :class="$style.icon">
                    <City v-if="item.type === 'city'" />
                    <Apartment v-if="item.type === 'hotel'" />
                  </div>
                </template>
                <div :class="$style.card__right">
                  <Text :w="600" :s="14" :l="18">{{ item.name }}</Text>
                  <Text :s="12" :l="16" :c="$style.card__date"
                    ><DateView
                      :left="dates(new Date(item.in), q.i18n)"
                      :right="dates(new Date(item.out), q.i18n)"
                    />, {{ item.guests }} {{ q.i18n.main.lnlijg }}</Text
                  >
                </div>
              </div>
            </Carousel>
          </div>
        </Block>
        <Block>
          <div :class="$style.top">
            <Title>{{ q.i18n.main.xmcsqq }}</Title>
          </div>
          <div :class="$style.bottom">
            <Carousel>
              <template v-for="item of popularList">
                <div
                  :class="$style.popular"
                  @click="() => handlePopularClick(item.id, item.name)"
                >
                  <img :src="item.src" :class="$style.popular__img" />
                  <Text :w="600" :s="14" :l="18">{{ item.name }}</Text>
                </div>
              </template>
            </Carousel>
          </div>
        </Block>
      </div>
    </div>
  </Wrapper>
</template>

<script setup lang="ts">
import Case from "../../assets/icons/case.svg";
import Settings from "../../assets/icons/settings.svg";
import Logo from "../../assets/logo.svg";
import Like from "../../assets/likes/like.svg";
import City from "../../assets/city.svg";
import Apartment from "../../assets/icons/apartment.svg";
import Moscow from "../../assets/popular/moscow.jpg";
import Saint from "../../assets/popular/saintpetersburg.jpg";
import Kazan from "../../assets/popular/kazan.jpg";
import Sochi from "../../assets/popular/sochi.jpg";

import { dates, fetchOrders, GetOrderDto, useLastSearch, useStore } from "../../utils";
import { onMounted, ref, watch } from "vue";

import Block from "../../components/ui/wrappers/Block.vue";
import DateView from "../../components/ui/views/DateView.vue";
import Carousel from "../../components/ui/carousel/Carousel.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import Text from "../../components/ui/wrappers/Text.vue";

import MainInfo from "../../components/common/MainInfo.vue";
import ReservationCard from "../../components/items/ReservationCard.vue";
import { useRouter } from "vue-router";
import { useInter } from "../../utils/i18n";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
//TODO: перевод
const popularList = [
  {
    id: 6,
    name: "Москва",
    src: Moscow,
  },
  {
    id: 37,
    name: "Санкт-Петербург",
    src: Saint,
  },
  {
    id: 48,
    name: "Сочи",
    src: Sochi,
  },
  {
    id: 3,
    name: "Казань",
    src: Kazan,
  },
];

const list = ref<GetOrderDto[]>([]);
const q = useInter();
const router = useRouter();
const lastSearch = useLastSearch();
console.log(window.Telegram);
onMounted(async () => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.secondary_bg_color || "";
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
  window.Telegram.WebApp.expand();
  if (window.Telegram.WebApp.colorScheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  if (store.auth) list.value = await fetchOrders(store.auth);
  if (store.checked) return;
  if (window.Telegram.WebApp.initDataUnsafe.start_param) {
    router.push("/hotel/" + window.Telegram.WebApp.initDataUnsafe.start_param);
  }
  store.check();
});
window.Telegram.WebApp.onEvent("backButtonClicked", () => {
  router.go(-1);
});
const store = useStore();
const handleFind = () => {
  if (!store.search) {
    router.push("/search");
  } else if (!store.out) {
    router.push("/dates");
  } else {
    if (store.search.type === "city") {
      router.push("/search/results");
    } else {
      router.push("/hotel/" + store.search.id);
    }
  }
};

watch(
  () => store.auth,
  async (auth) => {
    if (!auth) return;
    list.value = await fetchOrders(store.auth);
  },
);

const handleLastSearchClick = (type: "city" | "hotel", id: number, name: string) => {
  if (type === "hotel") {
    router.push("/hotel/" + id);
  } else {
    store.setSearch({
      type: "city",
      id,
      name,
    });
    if (!store.out) router.push("/dates");
    else router.push("/search/results");
  }
};

const handlePopularClick = (id: number, name: string) => {
  store.setSearch({
    type: "city",
    id,
    name,
  });
  if (!store.out) router.push("/dates");
  else router.push("/search/results");
};
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
.right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.btn {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--tertiary-fill-background);
  path {
    fill: var(--tg-theme-text-color);
  }
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
  //span {
  //  background: linear-gradient(90deg, #9f51e4 25%, #1554fd 75%);
  //  -webkit-background-clip: text;
  //  color: transparent;
  //}
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
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
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
  margin-bottom: 8px;
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
.animate {
  background: linear-gradient(
    to right,
    #a950e1 0%,
    #0e53fe 25%,
    #19e59d 50%,
    #0e53fe 75%,
    #a950e1 100%
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 5s linear infinite;
}
@keyframes shine {
  100% {
    background-position: -200% center;
  }
}

.icon {
  path {
    fill: var(--tg-theme-section-header-text-color);
  }
  background-color: var(--tg-theme-header-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
}
</style>
