<template>
  <div id="ap">
    <login />

    <Header @sendMsg="getMsg" />
    <!-- <p v-if="books.length === 0" class="loader"></p> -->
    <p class="alert alert-warning" v-if="books.length > 0 && filtered.length === 0">No match Found</p>

    <Book @allBooks="getBooks" :filteredArray="filtered" />
  </div>
</template>

<script>
import Header from "../components/Header";
import Book from "../components/Books";
import addBook from "./AddBook";
import login from "./Login";
import { mapGetters } from "vuex";
export default {
  components: { Header, Book, addBook, login },
  computed: { ...mapGetters(["books"]) },
  data() {
    return {
      search: "",
      language: "",
      filtered: []
      // books: []
    };
  },
  watch: {
    books() {
      this.filt();
    }
  },
  methods: {
    getMsg(msg) {
      this.search = msg[0]; // received search data from header
      this.language = msg[1];
      this.filt();
    },
    getBooks(book) {
      //   // this.books = book; // receive the whole book object from "books"
      //   this.filt();
    },
    filt() {
      this.filtered = [];
      if (this.search.length == 0 && this.language.length == 0) {
        this.filtered = this.books;
      } else {
        for (let criteria in this.books) {
          if (this.books[criteria].language.includes(this.language)) {
            if (
              this.books[criteria].description
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              this.books[criteria].title
                .toLowerCase()
                .includes(this.search.toLowerCase())
            ) {
              this.filtered.push(this.books[criteria]);
            }
          }
        }
        return this.filtered;
      }
    }
  }
  // created() {
  //   this.filt();
  // }
};
</script>

<style>
</style>