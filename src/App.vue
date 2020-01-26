<template>
  <v-app>
    <v-navigation-drawer temporary app v-model="sideNav">
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" @click="onLogout">
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark class="purple darken-4">
      <v-app-bar-nav-icon @click="sideNav = !sideNav" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-md-block">
        <v-btn text v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn text v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    sideNav: false
  }),
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "View Meetups",
            link: "/meetups"
          },
          { icon: "room", title: "Organaze Meetups", link: "/meetups/new" },
          { icon: "person", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return this.$store.getters.user;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>
