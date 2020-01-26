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
              <v-file-input label="Imgage Url" prepend-icon="mdi-camera" @change="onFilePicked"></v-file-input>
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
            <v-col class="text-center text-md-right">
              <v-date-picker v-model="date" header-color="primary" style="height:100%"></v-date-picker>
            </v-col>
            <v-col class="text-center text-md-left">
              <v-time-picker v-model="time" format="24hr" header-color="primary" style="height:100%"></v-time-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3"  class="text-center">
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
      time: new Date(),
      image: null
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
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onFilePicked(file) {
      let fileName = file.name;
      if (fileName.lastIndexOf(".") <= 0) {
        return alert("Please add valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imgSrs = fileReader.result;
      });
      fileReader.readAsDataURL(file);
      this.image = file;
    }
  }
};
</script>