<template>
  <div class="container">
    <h1>Shopping Cart</h1>

    <div class="items">
      <div v-for="(book, index) in cart" :key="index">
        <div class="row">
          <div class="col-6">
            <img class="cover" :src="book.cover" />
            <p>{{book.title}}</p>
          </div>
          <div class="col-6">
            <p>Price: {{book.price}}€</p>
            <span class="btn btn-danger" @click="remove(index)">Remove</span>
          </div>
        </div>
        <hr />
      </div>
      <p v-if="this.cart.length>0">Total: {{total}}€</p>
      <p v-if="this.cart.length==0" class="alert alert-info">Your shopping cart is empty</p>
      <br />
      <div class="actions">
        <p class="btn btn-info" @click="goBack">Go Back</p>
        <p class="btn btn-success" @click="buy">Confirm</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cart"]),
    total() {
      let tot = 0;
      this.cart.forEach(book => {
        tot += book.price;
      });
      return tot;
    }
  },
  methods: {
    buy() {
      this.$store.dispatch("buy");
    },
    goBack() {
      this.$router.push("/");
    },
    remove(index) {
      this.$store.commit("removeItem", index);
    }
  }
};
</script>

<style scoped>
.cover {
  height: 130px;
}
.actions {
  display: flex;
  justify-content: space-around;
}
</style>