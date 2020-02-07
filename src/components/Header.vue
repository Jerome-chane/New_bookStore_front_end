<template>
  <div class="container head">
    <div id="header" class="justify-content-around">
      <div class="row">
        <div id="logo" class="col-6">
          <img class="logo" alt="book logo" src="../assets/book.png" />
        </div>
        <div class="col-6" id="search-bar">
          <div class="search-bar">
            <input
              id="input"
              type="text"
              v-model="message"
              v-on:keyup="emitToApp"
              placeholder="Search for title or description..."
            />
            <select class="custom-select-sm" v-model="selectedLanguage" v-on:change="emitToApp">
              <option value>All languages</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="ca">Catalan</option>
            </select>
          </div>
        </div>
      </div>
      <addBook v-if="person!=null" />
    </div>
  </div>
</template>

<script>
import addBook from "./AddBook";
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      message: "",
      selectedLanguage: ""
    };
  },
  props: ["filter"],
  components: { addBook },
  methods: {
    emitToApp() {
      this.$emit("sendMsg", [this.message, this.selectedLanguage]);
    }
  },
  computed: { ...mapGetters(["person"]) },
  created() {}
};
</script>


<style scoped>
.logo {
  height: 90px;
  width: 280px;
  margin-top: 1%;
}
.search-bar {
  display: flex;
  border-radius: 13px;
  height: 55%;
  width: 100%;
  margin-top: 2%;
  justify-content: space-between;
}

.search-bar input {
  width: 100%;
}

.search-bar button {
  width: 20%;
}
.custom-select-sm {
  height: 100%;
}

.button {
  border-radius: 10%;
  background: #2196f3;
  color: white;
  cursor: pointer;
}

.button:hover {
  background: #0b7dda;
}
</style>
