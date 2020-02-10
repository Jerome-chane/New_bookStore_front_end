<template>
  <div>
    <button class="btn btn-info" @click="showForm">Add Book</button>
    <div v-if="Form" class="bookForm">
      <form>
        <div class="items">
          <span>
            Title:
            <input
              placeholder="title..."
              v-model="book.title"
              required="required"
              minlength="3"
            />
          </span>

          <span>
            Language:
            <input
              placeholder="language..."
              v-model="book.language"
              required="required"
              minlength="2"
            />
          </span>
          <br />
          <span>
            Description:
            <input
              placeholder="description..."
              v-model="book.description"
              required="required"
              minlength="3"
            />
          </span>
          <span>
            Price:
            <input
              type="number"
              placeholder="Price..."
              v-model="book.price"
              required="required"
            />
          </span>

          <span>
            Cover:
            <input placeholder="cover(optional)" v-model="book.cover" />
          </span>
          <br />
          <span>
            Detail:
            <input placeholder="detail(optional)" v-model="book.detail" />
          </span>

          <!-- <p
            v-if="bookAlreadyExist"
            class="alert alert-info"
          >This book already exists, please try again</p>-->
          <br />
          <input type="submit" value="Confirm" @click="check" class="btn btn-warning" />
          <button class="btn btn-danger" @click="hideForm">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      book: {
        title: "",
        language: "",
        description: "",
        cover: "",
        detail: "",
        price: 0
      },
      Form: false
    };
  },
  methods: {
    addBook() {
      this.$store.dispatch("addBook", this.book);
    },
    showForm() {
      this.Form = true;
    },
    hideForm() {
      this.Form = false;
    },
    check(event) {
      if (
        this.book.title.length >= 3 &&
        this.book.language.length >= 2 &&
        this.book.description.length >= 3
      ) {
        event.preventDefault();
        this.addBook();
        this.hideForm();
      } else {
        console.log("unable to add book");
      }
    }
  }
};
</script>

<style scoped>
span {
  margin: 10px;
}
input {
  margin: 10px;
}
.items {
  display: block;
}
</style>