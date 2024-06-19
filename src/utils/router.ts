import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import Main from "../pages/Main.vue";
import DatesPage from "../pages/DatesPage.vue";
import SearchResultsPage from "../pages/SearchResultsPage.vue";
import GuestsPage from "../pages/GuestsPage.vue";
import GuestsChildrenPage from "../pages/GuestsChildrenPage.vue";
import SortPage from "../pages/filters/SortPage.vue";
import PricePage from "../pages/filters/PricePage.vue";
import PaymentPage from "../pages/filters/PaymentPage.vue";
import StarsPage from "../pages/filters/StarsPage.vue";
import OtherPage from "../pages/filters/OtherPage.vue";

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
