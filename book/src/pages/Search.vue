<template>
  <div class="px-4 max-w-2xl mx-auto mt-16">
    <div class="text-center">
      <SearchInput v-model="query" />
    </div>

    <div class="mt-10 text-center">
      <SearchResults v-model:query="query" />
    </div>

    <div class="h-20"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SearchInput from "./../components/Search/SearchInput.vue";
import SearchResults from "./../components/Search/SearchResults.vue"

const query = ref("");
</script>