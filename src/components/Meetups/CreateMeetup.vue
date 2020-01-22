<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h4 class="headline">Create a new Meetup</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form @submit.prevent="onCreateMeetup">
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                :rules="[() => !!title || 'This field is required']"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                :rules="[() => !!location || 'This field is required']"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <img :src="imgSrs" height="200" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-text-field
                name="imgSrs"
                label="Imgage Url"
                id="img-url"
                v-model="imgSrs"
                :rules="[() => !!imgSrs || 'This field is required']"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                :rules="[() => !!description || 'This field is required']"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-date-picker v-model="date" header-color="primary"></v-date-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-time-picker v-model="time" format="24hr" header-color="primary"></v-time-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-btn color="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imgSrs: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: new Date()
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imgSrs !== "" &&
        this.description !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }

      return date;
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imgSrs: this.imgSrs,
        description: this.description,
        date: this.submittableDateTime
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    }
  }
};
</script>