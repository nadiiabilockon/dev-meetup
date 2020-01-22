import Vue from "vue";
import App from "./App.vue";
import * as firebase from "firebase";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { store } from "./store";
import DateFilter from "./filters/date";
import AlertComp from "./components/Shared/Alert.vue"

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertComp);

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
      storageBucket: "dev-meetup-729d7.appspot.com"
    })
      // firebase.auth().onAuthStateChanged(firebaseUser => {
      //   if (firebaseUser) {
      //     store.dispatch("autoSignIn", firebaseUser);
      //   }
      // });
  }
}).$mount("#app");
