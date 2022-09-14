import { LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth'
import { api } from './api'




export default boot(async ({ app ,store}) => {
    const auth = useAuthStore(store)
    await auth.getIsAuthenticated()    
})


