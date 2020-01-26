<template>
  <v-dialog persistent v-model="registerDialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" v-bind:color="userIsRegistered ? 'success' : 'primary'" >  {{ userIsRegistered ? 'Unregister' : 'Register' }}</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline" v-if="userIsRegistered">Unregister from meetup?</span>
        <span class="headline" v-else>Register for meetup?</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-card-text>You can always change your decision later on.</v-card-text>
        </v-row>
        <v-row>
          <v-card-actions>
            <v-btn text class="red--text darken-1" @click="registerDialog = false">Cancel</v-btn>
            <v-btn text class="green--text darken-1" @click="onAgree">Confirm</v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return  meetupId === this.meetupId;
        }) >= 0
      );
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unregisterUserFromMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
    }
  }
};
</script>