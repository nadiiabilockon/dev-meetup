<template>
  <v-dialog persistent max-width="350px" v-model="editDialog">
    <template v-slot:activator="{ on }">
      <v-btn class="ma-2" small color="accent-2" v-on="on">Edit Time</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Meetup Date</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
              <template>
                <v-btn class="blue--text darken-1" text @click.native="editDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableTime: null
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);

      if (typeof this.editableTime === "string") {
        const hours = this.editableTime.match(/^(\d+)/)[1];
        const minutes = this.editableTime.match(/:(\d+)/)[1];
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
      } else {
        newDate.setHours(this.editableTime.getHours());
        newDate.setMinutes(this.editableTime.getMinutes());
      }

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
      this.editDialog = false;
    }
  },
  created() {
    this.editableTime = new Date(this.meetup.date);
  }
};
</script>