<template>
  <div class="container head">
    <div class="logos">
      <img class="logo" alt="book logo" src="../assets/book.png" />
      <img class="cart" @click="goToCart" src="../assets/cart.png" />
    </div>
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
    <addBook v-if="person != null && person.role == 'author'" />
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
    goToCart() {
      this.$router.push("cart");
    },
    emitToApp() {
      this.$emit("sendMsg", [this.message, this.selectedLanguage]);
    }
  },
  computed: { ...mapGetters(["person"]) },
  created() {}
};
</script>


<style scoped>
.logos {
  display: flex;
  justify-content: space-between;
}
.cart {
  height: 83px;
  width: 83px;
  border-radius: 7px;
  margin-top: 1%;
}
.logo {
  height: 90px;
  width: 280px;
  margin-top: 1%;
}
.search-bar {
  display: flex;
  border-radius: 13px;
  height: 55%;
  /* width: 100%; */
  margin-top: 2%;
  justify-content: center;
}

.search-bar input {
  /* width: 100%; */
  height: 25px;
  margin-right: 6px;
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
