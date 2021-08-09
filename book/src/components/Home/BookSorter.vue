<template>
  <select class="w-full max-w-2xl p-2 rounded bg-gray-300 text-xl" @change="onChange" v-model="selected">
    <option value="t-az">Tytuł (A-Z)</option>
    <option value="t-za">Tytuł (Z-A)</option>
    <option value="a-az">Autor (A-Z)</option>
    <option value="a-za">Autor (Z-A)</option>
    <option value="r-hl">Ocena</option>
  </select>
</template>

<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  books: Array,
});

const { books } = toRefs(props);

const emit = defineEmit(["update:books"]);

const selected = ref("t-az");

const onChange = () => {
  switch (selected.value) {
    case "t-az":
      emit(
        "update:books",
        books.value.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
      );
      break;

    case "t-za":
      emit(
        "update:books",
        books.value.sort((a, b) => {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }
          return 0;
        })
      );
      break;

    case "a-az":
      emit(
        "update:books",
        books.value.sort((a, b) => {
          if (a.author < b.author) {
            return -1;
          }
          if (a.author > b.author) {
            return 1;
          }
          return 0;
        })
      );
      break;

    case "a-za":
      emit(
        "update:books",
        books.value.sort((a, b) => {
          if (a.author > b.author) {
            return -1;
          }
          if (a.author < b.author) {
            return 1;
          }
          return 0;
        })
      );
      break;

    case "r-hl":
      console.log(books.value)
      emit(
        "update:books",
        books.value.sort((a, b) => parseFloat(b.rating.replace(',', '.')) - parseFloat(a.rating.replace(',', '.')))
      );
      break;

    default:
      break;
  }
};
</script>