<template>
  <div class="header">
    <h1 v-if="person">Welcome {{person.firstname}} {{person.lastname}}</h1>

    <h1 v-if="!person && showLoginForm != true">Welcome Visitor</h1>
    <br />
    <div v-if="showLoginForm != true">
      <form id="demo" class="collapse">
        <input
          v-if="!logged"
          placeholder="email..."
          v-model="email"
          required="required"
          minlength="3"
        />
        <!-- <br /> -->
        <input
          v-if="!logged"
          placeholder="password..."
          v-model="pwd"
          @keyup.enter="login"
          type="password"
          required="required"
          minlength="2"
        />
      </form>
    </div>

    <button v-if="person" @click="logout" class="btn btn-danger logout">Log Out</button>
    <!-- <p class="alert alert-info">Incorrect username or password</p> -->
    <div class="signup collapse" v-if="showLoginForm == true" id="demo2">
      <div class="inputs">
        <form>
          <span>
            Firstname:
            <input
              placeholder="firstname..."
              v-model="user.firstName"
              required="required"
              minlength="3"
            />
          </span>
          <span>
            Lastname:
            <input
              placeholder="lastname..."
              v-model="user.lastName"
              required="required"
              minlength="3"
            />
          </span>

          <span>
            Username:
            <input
              placeholder="username..."
              v-model="user.userName"
              required="required"
              minlength="3"
            />
          </span>
          <br />
          <span>
            Email address:
            <input
              placeholder="email..."
              v-model="user.email"
              required="required"
              minlength="3"
            />
          </span>

          <span>
            Password:
            <input
              placeholder="password..."
              v-model="user.password"
              type="password"
              required="required"
              minlength="3"
            />
          </span>
          <select class="custom-select-sm" v-model="user.role">
            <!-- <option value>All languages</option> -->
            <option value="customer">Customer</option>
            <option value="author">Author</option>
            <!-- <option value="ca">Catalan</option> -->
          </select>
          <p
            v-if="userAlreadyExist"
            class="alert alert-info"
          >This username already exists, please try again</p>
          <br />
          <input type="submit" value="Create Account" @click="check" class="btn btn-warning" />
          <button
            class="btn btn-danger"
            data-toggle="collapse"
            data-target="#demo2"
            @click="hideForm"
          >Cancel</button>
        </form>
      </div>
    </div>
    <div v-if="showLoginForm != true">
      <button
        v-if="!person"
        @click="login"
        class="btn btn-success"
        data-toggle="collapse"
        data-target="#demo"
      >Login</button>
      <button
        v-if="!person"
        @click="showForm"
        class="btn btn-info"
        data-toggle="collapse"
        data-target="#demo2"
      >Sign up</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => {
    return {
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        role: "customer",
        password: ""
      },
      s: false
    };
  },
  watch: {
    person() {
      if (this.person) {
        this.s = true;
      }
    }
  },
  methods: {
    login(event) {
      if (this.email.length >= 3 && this.pwd.length >= 2) {
        this.$store.dispatch("login");
        event.preventDefault();
      }
    },
    logout() {
      this.$store.dispatch("logout");
    },
    showForm() {
      (this.user.firstName = ""),
        (this.user.lastName = ""),
        (this.user.userName = ""),
        (this.user.email = ""),
        (this.user.password = ""),
        this.$store.commit("setLoginForm", true);
    },
    hideForm() {
      this.$store.commit("setLoginForm", false);
    },
    check(event) {
      if (
        this.user.firstName.length >= 3 &&
        this.user.lastName.length >= 3 &&
        this.user.userName.length >= 3 &&
        this.user.email.length >= 3 &&
        this.user.password.length >= 3
      ) {
        event.preventDefault();
        this.signup();
      } else {
        console.log("denied");
      }
    },
    signup() {
      // console.log(this.user);
      this.$store.dispatch("signUp", this.user);
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.getters.email;
      },
      set(email) {
        this.$store.commit("syncEmail", email);
      }
    },
    pwd: {
      get() {
        return this.$store.getters.password;
      },
      set(pwd) {
        this.$store.commit("syncPwd", pwd);
      }
    },
    ...mapGetters(["logged", "person", "showLoginForm", "userAlreadyExist"])
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 30px;
  /* border: solid; */
}

input {
  margin: 10px;
}
button {
  margin: 5px;
  /* height: 15px; */
}
</style>