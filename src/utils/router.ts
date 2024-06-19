import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import Main from "../pages/Main.vue";
import DatesPage from "../pages/DatesPage.vue";
import SearchResultsPage from "../pages/SearchResultsPage.vue";
import GuestsPage from "../pages/GuestsPage.vue";
import GuestsChildrenPage from "../pages/GuestsChildrenPage.vue";
import SortPage from "../pages/filters/SortPage.vue";
import PricePage from "../pages/filters/PricePage.vue";
import FoodPage from "../pages/filters/FoodPage.vue";
import TypePage from "../pages/filters/TypePage.vue";
import PaymentPage from "../pages/filters/PaymentPage.vue";
import StarsPage from "../pages/filters/StarsPage.vue";
import GoodsPage from "../pages/filters/GoodsPage.vue";
import BedPage from "../pages/filters/BedPage.vue";
import DistancePage from "../pages/filters/DistancePage.vue";
import RatingPage from "../pages/filters/RatingPage.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/search", component: SearchPage },
  { path: "/dates", component: DatesPage },
  { path: "/guests", component: GuestsPage },
  { path: "/guests/children", component: GuestsChildrenPage },
  { path: "/search/results", component: SearchResultsPage },
  { path: "/search/filter/sort", component: SortPage },
  { path: "/search/filter/price", component: PricePage },
  { path: "/search/filter/food", component: FoodPage },
  { path: "/search/filter/type", component: TypePage },
  { path: "/search/filter/payment", component: PaymentPage },
  { path: "/search/filter/stars", component: StarsPage },
  { path: "/search/filter/goods", component: GoodsPage },
  { path: "/search/filter/bed", component: BedPage },
  { path: "/search/filter/distance", component: DistancePage },
  { path: "/search/filter/rating", component: RatingPage },
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
