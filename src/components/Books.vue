<template>
  <div class="container books">
    <div class="books">
      <div class="gallery">
        <div
          class="gallery-panel flip_container"
          v-for="book in filteredArray"
          v-bind:key="book.id"
        >
          <div class="flip">
            <div class="flip_front">
              <div class="card">
                <div class>
                  <img id="img" v-bind:src="book.cover" class="card-img-top" />
                </div>
              </div>
            </div>
            <div class="flip_back">
              <div class="card">
                <div class="back">
                  <h3>{{book.title}}</h3>
                  <p>{{book.description}}</p>
                  <a data-fancybox="gallery" class="button" :href="book.detail">
                    View
                    <img :src="book.detail" />
                  </a>
                  <p class="alert price">{{book.price}}€</p>
                  <p class="btn btn-warning" @click="addToCart(book)">Add to Cart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import msgTest from "./Header";
import { mapGetters } from "vuex";
export default {
  name: "Books",
  props: ["filteredArray"], // coming from App
  data() {
    return {};
  },
  components: {
    msgTest
  },
  computed: {
    ...mapGetters(["person", "cart"])
  },
  methods: {
    addToCart(book) {
      if (this.cart.every(item => (item.id == book.id ? false : true))) {
        // check if the book is already in the cart or not IF not book will be added
        this.$store.commit("addToCart", book);
        console.log("added to card");
      } else alert("book already in Cart");
    }
    // getData() {
    //   //   fetch("https://api.myjson.com/bins/zyv02")
    //   fetch("api/books")
    //     .then(response => {
    //       // console.log(response);
    //       return response.json();
    //     })
    //     .then(newData => {
    //       console.log("this.books: ", this.books);
    //       console.log(newData);
    //       this.books = newData.books;
    //       this.sendBooks();
    //     })
    //     .catch(error => console.log(`Oops, Error`, error.message));
    // },
    // sendBooks() {
    //   this.$emit("allBooks", this.books);
    // }
  },
  created() {
    this.$store.dispatch("getBooks");
  }
};
</script>

<style>
.price {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  grid-gap: 5rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.gallery-panel img {
  width: 100%;
  height: 50%;
  object-fit: cover;
}

.flip_container {
  width: 100%;
  height: 500px;
  cursor: pointer;
}

.flip_container:hover .flip {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.flip {
  -webkit-transition: 0.75s;
  transition: 0.75s;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  position: relative;
  height: 100%;
}

.flip_front,
.flip_back {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.flip_front {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
}

.flip_back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  background: #fff;
  max-height: 100%;
}

.back {
  text-align: center;
}

.alert {
  text-align: center;
  width: 70%;
  margin: 10% auto;
}

.loader {
  margin: 10% auto;
  text-align: center;
  border: 16px solid #f3f3f3;
  /* Light grey */
  border-top: 16px solid #3498db;
  /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>