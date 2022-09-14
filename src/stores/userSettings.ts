import { defineStore ,Pinia } from 'pinia';
import { LocalStorage } from 'quasar';
import { useQuasar } from 'quasar';

export type userSettingsType = {
  darkMode:boolean
}




export const useSettings = () =>{
  const $q = useQuasar()

  if(LocalStorage.getItem('cardapio@dashboard:settings') != $q.dark.isActive) $q.dark.toggle()
  
  return defineStore('userSettings', {

  state: () => ({
    darkMode:LocalStorage.getItem('cardapio@dashboard:settings')
  } as userSettingsType),

  getters: {
    isDark (state) {
      return state.darkMode
    }


  },

  actions: {
    setDarkMode (newState:boolean) {
      $q.dark.set(newState)
      this.darkMode = newState
      LocalStorage.set('cardapio@dashboard:settings',newState)
    },


  }
})()
}