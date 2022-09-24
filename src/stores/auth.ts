import { defineStore } from 'pinia';
import { api } from 'src/boot/api';
import { LocalStorage } from 'quasar'


export type tokenType={
  access:string 
  refresh:string
}

export type authTypes = {
  token:tokenType | null
  currentUser:string | null
  isAuthenticated:boolean
}



export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:null,
    currentUser :null ,
    isAuthenticated :false
  } as authTypes ),
  



  actions: {
    loginUser(credentials:{username:string,password:string}) {
      return api.post('/auth/token' ,credentials).then((response)=>{
        this.currentUser = credentials.username
        this.token = response.data
        this.isAuthenticated = true
        console.log(response.data)
        LocalStorage.set('cardapio@dashboard:token',response.data)
        LocalStorage.set('cardapio@dashboard:username',credentials.username)


        return this.currentUser
      })
    },

    async getIsAuthenticated(){
      try{
        const response = await api.get('/auth/verify' ,{
          headers: {
            'Authorization': `Bearer ${this?.token?.access ?this.token.access:LocalStorage.getItem<tokenType>('cardapio@dashboard:token')?.access}` 
          }})
          
          if(response.status==200){
            this.token = LocalStorage.getItem<tokenType>('cardapio@dashboard:token')
            this.currentUser = `${LocalStorage.getItem('cardapio@dashboard:username')}`
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

    async refreshToken(){
      console.log('refresh')
    },

    logout(){
      LocalStorage.remove('cardapio@dashboard:token')
      LocalStorage.remove('cardapio@dashboard:username')
      this.isAuthenticated = false 
  

      
    }
  }
});
