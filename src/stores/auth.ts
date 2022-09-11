import { defineStore } from 'pinia';
import { api } from 'src/boot/api';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    currentUser :'' ,
    isAuthenticated :false
  }),

  actions: {
    loginUser(credentials:{username:string,password:string}) {
      return api.post('/auth/token' ,credentials).then((response)=>{
        this.currentUser = credentials.username
        this.accessToken = response.data.access
        this.refreshToken = response.data.refresh
        this.isAuthenticated = true

        return this.currentUser
      })
    }
  }
});
