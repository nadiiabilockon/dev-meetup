<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" md="8" offset-sm="1" offset-md="2">
        <v-card class="mx-auto">
          <v-card-title>
            <h6 class="title primary--text">Member of {{registeredMeetups.length}} Meetups</h6>
          </v-card-title>
          <v-list three-line>
            <template v-for="(meetup, index)  in registeredMeetups">
              <v-list-item :key="index" @click="onLoadMeetup(meetup.id)">
                <v-list-item-avatar>
                  <v-img :src="meetup.imgSrs"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="meetup.title"></v-list-item-title>
                  <v-list-item-subtitle>{{meetup.date | date}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    registeredMeetups() {
      return this.$store.getters.loadedMeetups.filter(el =>
        this.user.registeredMeetups.includes(el.id)
      );
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    }
  }
};
</script>