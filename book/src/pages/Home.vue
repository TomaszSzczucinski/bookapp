<template>
  <div class="px-4 max-w-2xl mx-auto mt-16">
    <div>
      <BookSorter v-if="books && books.length > 0" :books="books" />
    </div>
    <div class="space-y-6 mt-10" v-if="!isLoading && books.length > 0">      
      <Book @popBook="popBook(book.id)" v-for="book in books" :key="book.id" :book="book" />
    </div>
    <div class="h-40"></div>
  </div>
</template>

<script setup>
import Book from "./../components/Home/Book.vue";
import BookSorter from "./../components/Home/BookSorter.vue"

import { onMounted, ref } from "vue";
import axios from "axios";
import config from "../config/config";

const books = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  axios(config.getBooksUrl)
    .then((data) => {
      books.value = data.data;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

const popBook = (bookId) => {
  books.value = books.value.filter((book) => book.id !== bookId)
}
</script>