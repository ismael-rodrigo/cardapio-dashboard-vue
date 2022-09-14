import { LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth'
import { api } from './api'




export default boot(async ({ app ,redirect ,urlPath ,store ,router}) => {
    const auth = useAuthStore(store)
    const isAuth = await auth.getIsAuthenticated()
    
    if(!isAuth && !urlPath.startsWith('/login'))redirect('/login')
    
    
        
    
})


