<template>
  <v-container>
    <v-row class="mb-2" v-if="loading">
      <v-col class="text-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="!loading">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title>
            <h6 class="title primary--text">{{ meetup.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-dialog :meetup="meetup"></app-edit-meetup-dialog>
            </template>
          </v-card-title>
          <v-img height="400px" :src="meetup.imgSrs"></v-img>
          <v-card-text>
            <div
              class="info--text mb-2 font-italic font-weight-light"
            >{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
            </div>
          </v-card-text>
          <v-card-text class="text--primary">
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-meetup-dialog
              :meetupId="meetup.id"
              v-if="userIsAuthenticated && !userIsCreator"
            ></app-register-meetup-dialog>
            <div v-else-if="!userIsCreator">
              <span class="mr-2">Already a member?</span>
              <a class="info--text" :href="'/signin'">Sign in</a>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    userIsAuthenticated() {
      return this.$store.getters.user;
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    }
  }
};
</script>