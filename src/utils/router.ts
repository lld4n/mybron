import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../pages/search-settings/SearchPage.vue";
import Main from "../pages/main/Main.vue";
import DatesPage from "../pages/search-settings/DatesPage.vue";
import SearchResultsPage from "../pages/search-results/SearchResultsPage.vue";
import GuestsPage from "../pages/search-settings/GuestsPage.vue";
import GuestsChildrenPage from "../pages/search-settings/GuestsChildrenPage.vue";
import SearchFilterSortPage from "../pages/search-results/SearchFilterSortPage.vue";
import FilterPricePage from "../pages/main/FilterPricePage.vue";
import SearchFilterPaymentPage from "../pages/search-results/SearchFilterPaymentPage.vue";
import SearchFilterStarsPage from "../pages/search-results/SearchFilterStarsPage.vue";
import SearchFilterOtherPage from "../pages/search-results/SearchFilterOtherPage.vue";
import SearchFilterInfoPage from "../pages/search-results/SearchFilterInfoPage.vue";
import HotelPage from "../pages/hotel/HotelPage.vue";
import HotelAboutPage from "../pages/hotel/HotelAboutPage.vue";
import HotelAmenitiesPage from "../pages/hotel/HotelAmenitiesPage.vue";
import HotelReviewsPage from "../pages/hotel/HotelReviewsPage.vue";
import HotelInfoPage from "../pages/hotel/HotelInfoPage.vue";
import ReservationMyPage from "../pages/reservations/ReservationMyPage.vue";
import ReservationPage from "../pages/reservations/ReservationPage.vue";
import SettingsPage from "../pages/settings/SettingsPage.vue";
import SettingsLanguagePage from "../pages/settings/SettingsLanguagePage.vue";
import SettingsCurrencyPage from "../pages/settings/SettingsCurrencyPage.vue";
import SearchMapPage from "../pages/search-results/SearchMapPage.vue";
import HotelRoomsPage from "../pages/rooms/HotelRoomsPage.vue";
import HotelCheckoutPage from "../pages/hotel/HotelCheckoutPage.vue";
import SettingsPhonePage from "../pages/settings/SettingsPhonePage.vue";
import SettingsEmailPage from "../pages/settings/SettingsEmailPage.vue";
import SettingsCountryPage from "../pages/settings/SettingsCountryPage.vue";
import SettingsCodePage from "../pages/settings/SettingsCodePage.vue";
import RoomsFilterSortPage from "../pages/rooms/RoomsFilterSortPage.vue";
import RoomsFilterAmenitiesPage from "../pages/rooms/RoomsFilterAmenitiesPage.vue";
import RoomsFilterBedsPage from "../pages/rooms/RoomsFilterBedsPage.vue";
import RoomsFilterMealsPage from "../pages/rooms/RoomsFilterMealsPage.vue";
import RoomsFilterPaymentPage from "../pages/rooms/RoomsFilterPaymentPage.vue";
const routes = [
  { path: "/", component: Main },

  // настройка поиска
  { path: "/dates", component: DatesPage },
  { path: "/guests", component: GuestsPage },
  { path: "/guests/children", component: GuestsChildrenPage },
  { path: "/search", component: SearchPage },

  // результаты поиска с фильтрами
  { path: "/search/results", component: SearchResultsPage },
  { path: "/search/map", component: SearchMapPage },
  { path: "/search/filter/sort", component: SearchFilterSortPage },
  { path: "/search/filter/price", component: FilterPricePage },
  { path: "/search/filter/other", component: SearchFilterOtherPage },
  { path: "/search/filter/payment", component: SearchFilterPaymentPage },
  { path: "/search/filter/stars", component: SearchFilterStarsPage },
  { path: "/search/filter/info", component: SearchFilterInfoPage },

  // страница отеля и его доп информация
  { path: "/hotel/:id", component: HotelPage },
  { path: "/hotel/about", component: HotelAboutPage },
  { path: "/hotel/amenities", component: HotelAmenitiesPage },
  { path: "/hotel/reviews", component: HotelReviewsPage },
  { path: "/hotel/info", component: HotelInfoPage },

  // бронирования, включая мои бронирования
  { path: "/reservation/my", component: ReservationMyPage },
  { path: "/reservation/:id", component: ReservationPage },

  // настройки и его доп страницы
  { path: "/settings", component: SettingsPage },
  { path: "/settings/language", component: SettingsLanguagePage },
  { path: "/settings/currency", component: SettingsCurrencyPage },
  { path: "/settings/phone", component: SettingsPhonePage },
  { path: "/settings/email", component: SettingsEmailPage },
  { path: "/settings/country", component: SettingsCountryPage },
  { path: "/settings/code/:from", component: SettingsCodePage },

  // страница с комнатами и его фильтрами
  { path: "/rooms/:id", component: HotelRoomsPage },
  { path: "/rooms/filter/sort", component: RoomsFilterSortPage },
  { path: "/rooms/filter/price", component: FilterPricePage },
  { path: "/rooms/filter/amenities", component: RoomsFilterAmenitiesPage },
  { path: "/rooms/filter/beds", component: RoomsFilterBedsPage },
  { path: "/rooms/filter/meals", component: RoomsFilterMealsPage },
  { path: "/rooms/filter/payment", component: RoomsFilterPaymentPage },

  { path: "/checkout", component: HotelCheckoutPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  window.Telegram.WebApp.BackButton.isVisible = !to.matched
    .map((e) => e.path)
    .includes("/");
});
