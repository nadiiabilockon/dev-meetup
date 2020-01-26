<template>
  <v-dialog persistent max-width="350px" v-model="editDialog">
    <template v-slot:activator="{ on }">
      <v-btn small color="accent-2" v-on="on">Edit Date</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Meetup Date</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
              <template>
                <v-btn
                  class="blue--text darken-1"
                  text
                  @click.native=" editDialog = false"
                >Close</v-btn>
                <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
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
      editableDate: null
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();

      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
      this.editDialog = false;
    }
  },
  created() {
    this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10);
  }
};
</script>