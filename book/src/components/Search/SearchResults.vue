<template>
  <div>
    <div
      class="space-y-6 w-full"
      v-if="!data.isLoading && data.books"
    >
      <SearchSingleResult
        v-for="book in data.books"
        :key="book.id"
        :book="book"
      />
    </div>
    <div v-else-if="data.isLoading">Ładowanie</div>
    <div v-else-if="data.books && data.books.length == 0">Nic nie znalazłem 😞</div>
  </div>
</template>

<script setup>
import SearchSingleResult from "./SearchSingleResult.vue";

import { watch, toRefs, ref } from "vue";
import axios from "axios";

import config from "./../../config/config";

const props = defineProps({
  query: String,
});

const { query } = toRefs(props);

const data = ref({});

let updateTimeout = 0;

const updateData = async () => {
  axios(`${config.searchUrl}${query.value}`).then((json) => {
    data.value = {
      isLoading: false,
      books: json.data?.books,
    };
  });
};

watch(query, (_1, _2) => {
  data.value = { isLoading: true };
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(updateData, 2000);
});
</script>