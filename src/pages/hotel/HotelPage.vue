<script setup lang="ts">
import CarouselCount from "../../components/ui/carousel/CarouselCount.vue";
import Share from "../../assets/icons/share.svg";
import AddLike from "../../assets/likes/add-like.svg";
import Liked from "../../assets/likes/liked.svg";
import RatingBlock from "../../components/hotel/RatingBlock.vue";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
import AboutBlock from "../../components/hotel/AboutBlock.vue";
import AdditionalBlock from "../../components/hotel/AdditionalBlock.vue";
import MainBlock from "../../components/hotel/MainBlock.vue";
import InfoBlock from "../../components/hotel/InfoBlock.vue";
import ReviewsBlock from "../../components/hotel/ReviewsBlock.vue";
import AmenityBlock from "../../components/hotel/AmenityBlock.vue";
import ConditionsBlock from "../../components/hotel/ConditionsBlock.vue";
import Refresh from "../../assets/refresh.svg";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import {
  api,
  HotelRatingsDto,
  HotelRatingsResponse,
  HotelReviewDto,
  HotelReviewsResponse,
  HotelWithOffersDto,
  useHotel,
  useLastSearch,
  useLikes,
  useReserve,
  useStore,
} from "../../utils";
import LoadingSimple from "../../components/ui/loading/LoadingSimple.vue";
import { fetchHotelInfo } from "./fetchHotelInfo.ts";
import { useInter } from "../../utils/i18n";
import Text from "../../components/ui/wrappers/Text.vue";

const data = ref<HotelWithOffersDto | null>(null);
const reviews = ref<HotelReviewDto[]>([]);
const ratings = ref<HotelRatingsDto | null>(null);
const loading = ref(true);
const fetched = ref(false);
const route = useRoute();
const store = useStore();
const hotel = useHotel();
const router = useRouter();
const q = useInter();
const lastSearch = useLastSearch();
const likes = useLikes();
const reserve = useReserve();
const final = ref(0);
const error = ref(false);

onMounted(async () => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.bg_color || "";
  window.Telegram.WebApp.MainButton.hide();
  if (!store.out) {
    await router.push("/");
    return;
  }
  const content = reserve.check(Number(route.params.id));
  if (content) {
    data.value = content.data;
    ratings.value = content.ratings;
    reviews.value = content.reviews;
    loading.value = false;
    fetched.value = true;
    return;
  }

  loading.value = true;
  fetched.value = false;
  api
    .get("hotel/reviews", {
      searchParams: {
        hotelId: String(route.params.id),
      },
    })
    .json<HotelReviewsResponse>()
    .then((res) => {
      reviews.value = res.reviews;
      hotel.setReviews(res.reviews);
    })
    .finally(() => {
      final.value++;
    });

  api
    .get("hotel/ratings", {
      searchParams: {
        hotelId: String(route.params.id),
      },
    })
    .json<HotelRatingsResponse>()
    .then((res) => {
      ratings.value = res.ratings;
    })
    .finally(() => {
      final.value++;
    });
  data.value = await fetchHotelInfo(route.params.id, store, hotel, q.i18n);
  if (data.value) {
    final.value++;

    lastSearch.addList({
      id: data.value.id,
      in: store.in.getTime(),
      out: store.out.getTime(),
      name: data.value.name,
      guests: store.adultsCount,
      image: data.value.descriptionDetails.photos.photos[0].url,
      type: "hotel",
    });
  } else {
    error.value = true;
  }
  loading.value = false;
  fetched.value = true;
});

watch(final, (v) => {
  if (v >= 3 && data.value)
    reserve.addMap(data.value.id, data.value, reviews.value, ratings.value);
});
</script>

<template>
  <div :class="$style.center" v-if="error">
    <!--    TODO: перевод-->
    <Text :s="17" :l="22" :w="600">Не удалось загрузить</Text>
    <Text :s="17" :l="22" :g="true"
      >Попробуйте обновить страницу, или проверьте соединение.</Text
    >
    <Text :s="17" :l="22" :c="$style.reply"><Refresh /> Обновить</Text>
  </div>
  <div :class="$style.center" v-if="loading">
    <LoadingSimple />
  </div>
  <!--  TODO: перевод и валюта-->
  <Wrapper
    v-if="!loading && !!data && !error"
    :label="
      'Выбрать номер от ' +
      Math.min(
        ...data.offers.offers.map(
          (e) => e.priceDetails.client.clientCurrency.gross.price,
        ),
      ) +
      ' ₽'
    "
    :click="() => router.push('/rooms/' + route.params.id)"
  >
    <div :class="$style.carousel">
      <CarouselCount>
        <img
          v-for="item of data.descriptionDetails.photos.photos"
          :src="item.url"
          :class="$style.image"
          alt="Image"
        />
      </CarouselCount>
      <a
        :class="$style.share"
        target="_blank"
        :href="
          'https://telegram.me/share/url?url=https://t.me/MoyabronBot/miniapp?startapp=' +
          route.params.id
        "
        ><Share
      /></a>
      <div
        :class="$style.like"
        @click.stop="
          likes.addList({
            id: data.id,
            image: data.descriptionDetails.photos.photos[0].url,
            name: data.name,
            city: data.cityName,
            added: new Date().getTime(),
          })
        "
      >
        <Liked v-if="likes.check(data.id)" />
        <AddLike v-if="!likes.check(data.id)" />
      </div>
    </div>
    <div :class="$style.content">
      <MainBlock
        :rating="ratings ? ratings.rating * 2 : undefined"
        :id="data.id"
        :address="data.address"
        :center="data.descriptionDetails.distanceToCenter"
        :latitude="data.descriptionDetails.latitude"
        :longitude="data.descriptionDetails.longitude"
        :name="data.name"
        :stars="data.category"
        :amenities="data.descriptionDetails.availableAmenities.availableAmenities"
        :count="ratings?.reviewsTotal || 0"
      />
      <InfoBlock
        :offers-count="data.offers.offers.length"
        :min-price="
          Math.min(
            ...data.offers.offers.map(
              (e) => e.priceDetails.client.clientCurrency.gross.price,
            ),
          )
        "
      />
      <RatingBlock
        v-if="!!ratings"
        :ratings="
          ratings.subratings.map((e) => {
            return {
              name: e.name,
              percent: e.rating * 2 * 10,
            };
          })
        "
        :count="ratings.reviewsTotal"
        :rating="ratings.rating * 2"
      />
      <ReviewsBlock :reviews="reviews" v-if="reviews.length > 0" />
      <AboutBlock :text="data.descriptionDetails.description" />
      <AmenityBlock
        :am="data.descriptionDetails.availableAmenities.availableAmenities"
      />
      <ConditionsBlock
        v-if="data.checkInTime && data.checkOutTime"
        :in-time="data.checkInTime"
        :fee="data.taxes?.taxes.find((e) => e.type === 'RESORT_FEE') || null"
        :deposit="data.taxes?.taxes.find((e) => e.type === 'DEPOSIT') || null"
        :out-time="data.checkOutTime"
      />
      <AdditionalBlock
        v-if="data.additionalInfo || data.informationForGuest"
        :data="
          [
            data.additionalInfo
              ? [...data.additionalInfo?.infos.map((e) => e.value)]
              : [],
            data.informationForGuest
              ? [...data.informationForGuest?.notifications.map((e) => e.value)]
              : [],
          ].flat()
        "
      />
    </div>
  </Wrapper>
</template>

<style module lang="scss">
.carousel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.share {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #00000066;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  path {
    fill: white;
  }
}
.like {
  position: absolute;
  top: 12px;
  right: 56px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #00000066;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  path {
    fill: white;
  }
}
.image {
  flex: 0 0 100%;
  min-width: 0;
  height: 400px;
  object-fit: cover;
}
.content {
  background-color: var(--tg-theme-secondary-bg-color);
  z-index: 10;
  margin-top: 380px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
}
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  text-align: center;
  align-items: center;
}
.reply {
  cursor: pointer;
  color: var(--tg-theme-link-color);
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
