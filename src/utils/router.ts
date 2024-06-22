import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import Main from "../pages/main/Main.vue";
import DatesPage from "../pages/DatesPage.vue";
import SearchResultsPage from "../pages/SearchResultsPage.vue";
import GuestsPage from "../pages/GuestsPage.vue";
import GuestsChildrenPage from "../pages/GuestsChildrenPage.vue";
import SortPage from "../pages/filters/SortPage.vue";
import PricePage from "../pages/filters/PricePage.vue";
import PaymentPage from "../pages/filters/PaymentPage.vue";
import StarsPage from "../pages/filters/StarsPage.vue";
import OtherPage from "../pages/filters/OtherPage.vue";
import InfoPage from "../pages/filters/InfoPage.vue";
import HotelPage from "../pages/HotelPage.vue";
import HotelAboutPage from "../pages/hotel/HotelAboutPage.vue";
import HotelAmenitiesPage from "../pages/hotel/HotelAmenitiesPage.vue";
import HotelReviewsPage from "../pages/hotel/HotelReviewsPage.vue";
import HotelInfoPage from "../pages/hotel/HotelInfoPage.vue";
import ReservationMyPage from "../pages/reservations/ReservationMyPage.vue";
import ReservationPage from "../pages/reservations/ReservationPage.vue";
import SettingsPage from "../pages/settings/SettingsPage.vue";
import SettingsLanguagePage from "../pages/settings/SettingsLanguagePage.vue";
import SettingsCurrencyPage from "../pages/settings/SettingsCurrencyPage.vue";

const routes = [
  { path: "/", component: Main },

  { path: "/dates", component: DatesPage },
  { path: "/guests", component: GuestsPage },
  { path: "/guests/children", component: GuestsChildrenPage },

  { path: "/search", component: SearchPage },
  { path: "/search/results", component: SearchResultsPage },

  { path: "/search/filter/sort", component: SortPage },
  { path: "/search/filter/price", component: PricePage },
  { path: "/search/filter/other", component: OtherPage },
  { path: "/search/filter/payment", component: PaymentPage },
  { path: "/search/filter/stars", component: StarsPage },
  { path: "/search/filter/info", component: InfoPage },

  { path: "/hotel/:id", component: HotelPage },
  { path: "/hotel/:id/about", component: HotelAboutPage },
  { path: "/hotel/:id/amenities", component: HotelAmenitiesPage },
  { path: "/hotel/:id/reviews", component: HotelReviewsPage },
  { path: "/hotel/:id/info", component: HotelInfoPage },

  { path: "/reservation/my", component: ReservationMyPage },
  { path: "/reservation/:id", component: ReservationPage },

  { path: "/settings", component: SettingsPage },
  { path: "/settings/language", component: SettingsLanguagePage },
  { path: "/settings/currency", component: SettingsCurrencyPage },

  { path: "/room/:id", component: HotelPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  window.Telegram.WebApp.BackButton.isVisible = !to.matched
    .map((e) => e.path)
    .includes("/");
});
