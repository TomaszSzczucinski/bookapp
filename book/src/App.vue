<template>

  <Header />

  <transition name="fade" mode="out-in">
    <Home v-if="page === 'home'" />
    <Search v-else-if="page === 'search'" />
  </transition>
</template>

<script setup>
import Home from "./pages/Home.vue";
import Search from "./pages/Search.vue";

import Header from "./components/Header/Header.vue"

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const page = computed(() => store.state.page);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>