import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),

  getters: {
    multCount(state) {
      return (mult:number)=> state.counter * mult;
    }
  },

  actions: {
    increment () {
      this.counter++;
    }
  },

});
