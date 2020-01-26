<template>
  <v-dialog persistent max-width="350px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn fab small color="accent-2" v-on="on">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit meetup</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                name="title"
                v-model="editedTitle"
                label="Title"
                id="title"
                :rules="[() => !!editedTitle || 'This field is required']"
                required
              ></v-text-field>
              <v-textarea
                name="description"
                v-model="editedDescription"
                label="Description"
                id="description"
                :rules="[() => !!editedDescription || 'This field is required']"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onSaveChanges">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    };
  },
  methods: {
    onSaveChanges() {
      if (!this.editedTitle.trim() || !this.editedDescription.trim()) {
        return;
      }
      this.dialog = false;
      this.$store.dispatch('updateMeetupData',{
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription

      })
    }
  }
};
</script>