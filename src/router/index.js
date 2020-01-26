import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import Meetups from "@/components/Meetups/Meetups";
import Meetup from "@/components/Meetups/Meetup";
import CreateMeetup from "@/components/Meetups/CreateMeetup";
import Profile from "@/components/User/Profile";
import Signin from "@/components/User/Signin";
import Signup from "@/components/User/Signup";
import NotFound from "@/components/Shared/NotFound";
import AuthGuard from "./auth-guard";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/meetups",
    name: "Meetups",
    component: Meetups
  },
  {
    path: "/meetups/new",
    name: "CreateMeetup",
    component: CreateMeetup,
    beforeEnter: AuthGuard
  },
  {
    path: "/meetups/:id",
    name: "Meetup",
    props: true,
    component: Meetup
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  },
  { path: "*", name: "NotFound", component: NotFound }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
