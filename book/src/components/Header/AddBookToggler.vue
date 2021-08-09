<template>
  <button class="px-8 py-3 mx-auto bg-white font-bold text-lg shadow-lg rounded-full" @click="() => (page === 'home' ? goSearch() : goHome())">
    <template v-if="page === 'home'">Dodaj książkę&nbsp;&nbsp;&nbsp;📙</template>
    <template v-else> Powrót&nbsp;&nbsp;&nbsp;🏠</template>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const page = computed(() => store.state.page);

const goHome = () => store.commit("switchPage", "home");
const goSearch = () => store.commit("switchPage", "search");
</script>