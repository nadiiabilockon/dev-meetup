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
    path: "/dev-meetup/",
    name: "Home",
    component: Home
  },
  {
    path: "/dev-meetup/meetups",
    name: "Meetups",
    component: Meetups
  },
  {
    path: "/dev-meetup/meetups/new",
    name: "CreateMeetup",
    component: CreateMeetup,
    beforeEnter: AuthGuard
  },
  {
    path: "/dev-meetup/meetups/:id",
    name: "Meetup",
    props: true,
    component: Meetup
  },
  {
    path: "/dev-meetup/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: "/dev-meetup/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/dev-meetup/signin",
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
