<template>
  <v-container>
    <v-row class="mb-2">
      <v-col sm="6" class="text-center text-sm-right">
        <v-btn large router class="info" to="/meetups">Explore Meetups</v-btn>
      </v-col>
      <v-col sm="6" class="text-center text-sm-left">
        <v-btn large router class="info" to="/meetups/new">Organize Meetup</v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-2" v-if="loading">
      <v-col class="text-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row class="mt-2" v-if="!loading">
      <v-col>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imgSrs"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)"
          >
            <v-row class="fill-height" align="center" justify="center">
              <div class="title">{{ meetup.title }}</div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row class="mb-2">
      <v-col class="text-center primary--text display-1 font-weight-ligh" style="text-shadow: 2px 4px 3px rgba(0,0,0,0.3)">
        <p>Join our awesome meetups!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    }
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background: rgba(0, 0, 0, 0.3);
  font-size: 2rem;
  color: white;
  padding: 20px;
  border-radius: 5px 5px 0 0;
}
</style>
