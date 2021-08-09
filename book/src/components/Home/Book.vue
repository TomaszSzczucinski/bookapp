<template>
  <div class="grid grid-cols-12 gap-4 items-center">
    <div class="col-span-4">
      <img class="rounded-lg shadow" :src="book.cover" :alt="book.title" />
    </div>
    <div class="col-span-6 text-left">
      <h2 class="text-3xl">
        {{ book.title }}
      </h2>
      <h3 class="italic text-xl text-gray-800">
        {{ book.author }}
      </h3>
      <p class="font-bold text-gray-800 mt-2">⭐ {{ book.rating }}</p>
    </div>
    <div class="col-span-2">
      <button
        @click="popBook"
        class="rounded-full w-12 h-12 text-white font-bold text-sm bg-red-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-trash mx-auto"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { toRefs } from "vue";
import config from "../../config/config";

const props = defineProps({
  book: Object,
});

const { book } = toRefs(props);

const emit = defineEmit(["popBook"]);

const popBook = () => {
  axios
    .delete(config.popBookUrl, {
      data: book.value,
    })
    .then(() => {
      emit('popBook');
    });
}
</script>