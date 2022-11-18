import { boot } from 'quasar/wrappers'
import axios , {AxiosRequestHeaders} from 'axios'
import { LocalStorage } from 'quasar'
import { tokenType } from 'src/stores/auth'

const api = axios.create({ baseURL: 'http://localhost:8000' })


api.defaults.headers.common['Authorization'] = `Bearer ${LocalStorage.getItem<tokenType>('cardapio@dashboard:token')?.access}`



export default boot(({ app ,store }) => {

  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api

})

export { api }
