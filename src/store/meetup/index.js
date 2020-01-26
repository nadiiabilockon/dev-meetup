import * as firebase from "firebase";

export default {
  state: {
    loadedMeetups: [
      {
        imgSrs: "https://www.vse.fi/wp-content/uploads/2018/04/Tampere.jpg",
        id: "1234cd",
        title: "Afterwork at Teerenpeli",
        date: new Date("2020-01-31"),
        location: "Tampere",
        description:
          "Afterwork @ Teerenpeli. Let's gather all the soon-to-be best Friday friends in Tampere for a casual evening of drinks, chatting and momentary awkward silences."
      },
      {
        imgSrs:
          "https://drivito0.imgix.drizly.com/2e78ef1b3200da97/76f246e39e8e/ny-new-york-city.jpg?auto=format%2Ccompress&fm=jpeg&q=40&w=1800",
        id: "234cs",
        title: "Meetup in NY",
        date: new Date("2020-01-30"),
        location: "NY",
        description: "Will be  very cool!"
      }
    ]
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(
        meetup => meetup.id === payload.id
      );
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    }
  },
  actions: {
    loadMeetups({ commit }) {
      commit("setLoading", true);

      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              description: obj[key].description,
              imgSrs: obj[key].imgSrs,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            });
          }
          commit("setLoadedMeetups", meetups);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      };

      let imgSrs, key, ext;

      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then(data => {
          key = data.key;
          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          ext = filename.slice(filename.lastIndexOf("."));

          return firebase
            .storage()
            .ref("meetups/" + key + "." + ext)
            .put(payload.image);
        })
        .then(() => {
          return firebase
            .storage()
            .ref("meetups/" + key + "." + ext)
            .getDownloadURL();
        })
        .then(URL => {
          imgSrs = URL;
          firebase
            .database()
            .ref("meetups")
            .child(key)
            .update({ imgSrs: imgSrs });

          commit("createMeetup", {
            ...meetup,
            imgSrs: imgSrs,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateMeetupData({ commit }, payload) {
      commit("setLoading", true);

      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetup", payload);
        })
        .catch(error => {
          commit("setLoading", false);
          console.log(error);
        });
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return new Date(meetupA.date) > new Date(meetupB.date) ? -1 : 1;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    }
  }
};
