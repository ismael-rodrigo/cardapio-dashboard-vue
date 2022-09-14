import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
export const useSettings = defineStore('userSettings', {
  state: () => ({
    darkMode: false
  }),

  getters: {
    isDark (state) {
      return state.darkMode
    }
  },

  actions: {
    setDarkMode (state:boolean) {
      this.darkMode = state
    },
    getSettingsInLocalStorage(){
      return LocalStorage.getItem('cardapio@dashboard:settings')
    }



  }
});
