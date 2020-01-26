import Vue from "vue";
import App from "./App.vue";
import * as firebase from "firebase";
import vuetify from "./plugins/vuetify";

import router from "./router";
import { store } from "./store";
import DateFilter from "./filters/date";
import AlertComp from "./components/Shared/Alert";
import EditMeetup from "./components/Meetups/Edit/EditMeetupsDialog";
import EditMeetupDate from "./components/Meetups/Edit/EditMeetupDateDialog";
import EditMeetupTime from "./components/Meetups/Edit/EditMeetupTimeDialog";
import RegisterDialog from "./components/Meetups/Registration/RegisterDialog";

require("@/assets/styles/notFound.css");

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertComp);
Vue.component("app-edit-meetup-dialog", EditMeetup);
Vue.component("app-edit-meetup-date-dialog", EditMeetupDate);
Vue.component("app-edit-meetup-time-dialog", EditMeetupTime);
Vue.component("app-register-meetup-dialog", RegisterDialog);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCwp6L2yK0Byib3suJ8Qr4Y8cFDRlBsO0U",
      authDomain: "dev-meetup-729d7.firebaseapp.com",
      databaseURL: "https://dev-meetup-729d7.firebaseio.com",
      projectId: "dev-meetup-729d7",
      storageBucket: "gs://dev-meetup-729d7.appspot.com"
    });
        this.$store.dispatch("loadMeetups");

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("fetchUserData");
      }
    });
  }
}).$mount("#app");
