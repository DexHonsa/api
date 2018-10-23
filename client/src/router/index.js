import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/login/login";
import ProfileRoutes from "./profile";
import SearchRoutes from './search';


//import { store } from "../store/store.js";

var baseRoutes = [
  {
    path: "/",
    components: {
      default: Login
    }
  }
];

const routes = baseRoutes
  .concat(ProfileRoutes)
  .concat(SearchRoutes);


Vue.use(Router);

var router = new Router({
  mode: 'hash',
  routes: routes
});

router.beforeEach((to, from, next) => {
  return next();
});

export default router;
