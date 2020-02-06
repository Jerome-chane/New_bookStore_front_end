import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    person: null,
    showLoginForm: false,
    logged: false,
    userAlreadyExist: false,
    books: [],

    email: "",
    pwd: ""
  },
  getters: {
    books: state => state.books,
    author: state => state.author,
    logged: state => state.logged,
    person: state => state.person,
    showLoginForm: state => state.showLoginForm,
    userAlreadyExist: state => state.userAlreadyExist,
    email: state => state.email,
    password: state => state.pwd
  },
  mutations: {
    setBooks: (state, payload) => (state.books = payload),
    syncEmail: (state, payload) => (state.email = payload),
    syncPwd: (state, payload) => (state.pwd = payload),
    setLoginForm: (state, payload) => (state.showLoginForm = payload),
    setUserAlreadyExist: (state, payload) => (state.userAlreadyExist = payload),
    setAuthorized: (state, payload) => (state.authorized = payload),
    syncLogged: (state, payload) => {
      state.logged = payload;
      if (payload == false) {
        state.person = null;
      }
    },
    setPerson: (state, payload) => {
      state.person = payload;
    }
  },
  actions: {
    signUp({ commit, dispatch }, payload) {
      let ourData = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        email: payload.email,
        password: payload.password
      };

      fetch(`api/signup`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(ourData)
      })
        .then(newData => {
          return newData.json();
        })
        .then(data => {
          if (data.hasOwnProperty("error")) {
            console.log(" error: ", data);
            commit("setUserAlreadyExist", true);
          } else {
            commit("setUserAlreadyExist", false);
            commit("syncEmail", ourData.email);
            commit("syncPwd", ourData.password);
            commit("setLoginForm", false);
            dispatch("login");
            console.log(data);
            commit("setAuthor", ourData); // TEMPORARY HERE. Set the Author in the Store when Author has signed up
          }
        })
        .catch(error => {
          console.log("Request failure: ", error);
        });
    },
    login({ getters, commit, dispatch }) {
      let ourData = { email: getters.email, pwd: getters.password };
      fetch(`/api/login`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: getBody(ourData)
      })
        .then(data => {
          if (data.status == 200) {
            commit("syncLogged", true);
          }
          console.log("Log status", getters.logged);
        })
        .then(newData => {
          // MUST RETURN THE SIGNED IN AUTHOR SO I CAN SET IT
          console.log(newData);
          dispatch("getBooks");
        })
        .catch(error => {
          console.log("Request failure ", error);
        });
      function getBody(json) {
        var body = [];
        for (var key in json) {
          var encKey = encodeURIComponent(key);
          var encVal = encodeURIComponent(json[key]);
          body.push(encKey + "=" + encVal);
        }
        return body.join("&");
      }
    },
    logout({ commit }) {
      fetch(`api/logout`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        credentials: "include"
      })
        // fetch(`/api/logout`, { method: "POST", credentials: "include" }) // use for local
        .then(data => {
          if (data.status == 200) {
            commit("syncLogged", false);
          }
        })
        .then(() => {
          console.log("log Out successful");
        })
        .catch(error => console.log("Error ", error));
    },
    addBook({ dispatch }, payload) {
      let ourBook = {
        title: payload.title,
        language: payload.language,
        description: payload.description,
        cover: payload.cover,
        detail: payload.detail
      };
      console.log(JSON.stringify(ourBook));

      fetch(`/api/addBook`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(ourBook)
      })
        .then(newData => {
          // console.log(newData);
          return newData.json();
        })
        .then(data => {
          // console.log(data);
          if (data.success) {
            dispatch("getBooks");
          }
        })
        .catch(error => {
          console.log("Request failure: ", error);
        });
    },
    getBooks({ commit }) {
      fetch(`api/books`, {
        credentials: "include"
      })
        .then(data => {
          // console.log(data);

          return data.json();
        })
        .then(newData => {
          console.log(newData);
          commit("setBooks", newData.books);
          if (newData.logged != null) {
            commit("setPerson", newData.logged);
          }
        })
        .catch(error => console.log(error));
    }
  },
  modules: {}
});
