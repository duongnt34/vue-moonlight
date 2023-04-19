import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ExploreView from "../views/ExploreView.vue";
import SearchView from "../views/SearchView.vue";
import FilmView from "../views/FilmView.vue";
import WatchView from "../views/WatchView.vue";
import BookmarkedView from "../views/BookmarkedView.vue";
import HistoryView from "../views/HistoryView.vue";
import ProfileView from "../views/ProfileView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/explore",
    name: "ExploreView",
    component: ExploreView,
  },
  {
    path: "/search",
    name: "SearchView",
    component: SearchView,
  },
  {
    path: "/bookmarked",
    name: "BookmarkedView",
    component: BookmarkedView,
  },
  {
    path: "/history",
    name: "HistoryView",
    component: HistoryView,
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
  },
  {
    path: "/:filmType/:id",
    name: "FilmView",
    component: FilmView,
  },
  {
    path: "/watch/:id",
    name: "WatchView",
    component: WatchView,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404View.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFoundView",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "router-active-class",
});

export default router;
