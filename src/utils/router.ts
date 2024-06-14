import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import Main from "../pages/Main.vue";
import DatesPage from "../pages/DatesPage.vue";
import ResultPage from "../pages/ResultPage.vue";
import GuestsPage from "../pages/GuestsPage.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/search", component: SearchPage },
  { path: "/dates", component: DatesPage },
  { path: "/guests", component: GuestsPage },
  { path: "/results", component: ResultPage },
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
