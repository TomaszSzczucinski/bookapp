import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import './index.css'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      page: 'home'
    }
  },
  mutations: {
    switchPage(state, page) {
      state.page = page
    }
  }
})

createApp(App).use(store).mount('#app')
