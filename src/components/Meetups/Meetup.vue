<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title>
            <h6 class="title primary--text">{{ meetup.title }}</h6>
          </v-card-title>
          <v-img height="400px" :src="meetup.imgSrs"></v-img>
          <v-card-subtitle class="pb-0 info--text">{{ meetup.date | date }} - {{ meetup.location }}</v-card-subtitle>
          <v-card-text class="text--primary">
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" text>Register</v-btn>
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
    }
  }
};
</script>