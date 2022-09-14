import { defineStore } from 'pinia';
import { api } from 'src/boot/api';
import { LocalStorage } from 'quasar'




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

        LocalStorage.set('cardapio@dashboard:access',response.data.access)
        LocalStorage.set('cardapio@dashboard:refresh',response.data.refresh)

        return this.currentUser
      })
    },

    async getIsAuthenticated(){
      try{
        const response = await api.get('/auth/verify' ,{
          headers: {
            'Authorization': `Bearer ${this.accessToken?this.accessToken:LocalStorage.getItem('cardapio@dashboard:access')}` 
          }})
          
          if(response.status==200){
            this.accessToken = `${LocalStorage.getItem('cardapio@dashboard:access')}`
            this.isAuthenticated = true 
            return true
          
          }
          else{
            this.isAuthenticated = false 
            return false
          }
      }
      catch(err){
        return false
      }

      
      
      
    },

    logout(){
      LocalStorage.remove('cardapio@dashboard:access')
      LocalStorage.remove('cardapio@dashboard:refresh')
      this.isAuthenticated = false 
      // eslint-disable-next-line
      //@ts-ignore
      this.router.push({path:'login'})
      
    }
  }
});
