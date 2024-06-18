import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import Main from "../pages/Main.vue";
import DatesPage from "../pages/DatesPage.vue";
import SearchResultsPage from "../pages/SearchResultsPage.vue";
import GuestsPage from "../pages/GuestsPage.vue";
import GuestsChildrenPage from "../pages/GuestsChildrenPage.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/search", component: SearchPage },
  { path: "/dates", component: DatesPage },
  { path: "/guests", component: GuestsPage },
  { path: "/guests/children", component: GuestsChildrenPage },
  { path: "/search/results", component: SearchResultsPage },
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
