<template>
  <v-container>
    <v-row v-for="meetup in meetups" :key="meetup.id">
      <v-col cols="12" sm="10" md="8" offset-sm="1" offset-md="2">
        <v-card class="mx-auto">
          <v-container fluid>
            <v-row>
              <v-col cols="5" sm="4" md="3">
                <v-img height="130px" :src="meetup.imgSrs"></v-img>
              </v-col>
              <v-col cols="7" sm="8" md="9">
                <v-card-text >
                  <h5 class="headline mb-0 primary--text">{{meetup.title}}</h5>
                  <div class="font-italic">{{ meetup.date | date }}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn text :to="'/dev-meetup/meetups/' + meetup.id">
                    <v-icon left ligth>arrow_forward</v-icon>View meetup
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    }
  }
};
</script>