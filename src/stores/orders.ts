import { defineStore } from 'pinia';
import {api} from 'src/boot/api';
import { ShopCarType } from 'src/models/shopOrder';
import { useAuthStore } from './auth';
import useNotify from 'src/composables/useNotify';



type ordersShopType ={
  created:ShopCarType[]
  progress:ShopCarType[]
  conclude:ShopCarType[]
}




const organizeOrders = (orders:ShopCarType[])=>{
  return{
    created:  orders.filter((shopcar)=> shopcar.status=='created' ),
    progress: orders.filter((shopcar)=> shopcar.status=='progress'),
    conclude: orders.filter((shopcar)=> shopcar.status=='conclude'),
  }
}


const auth = useAuthStore()
const {successNotify} = useNotify()


export const useOrderStore = defineStore('order', {
  state: () => ({
    shopOrders:{} as ordersShopType
  }),

  getters: {

    getAllShopOrders (state){
      return state.shopOrders
    },


  },

  actions: {
    getShopOrders() {
      return api.get('api/shopcar')
        .then( ({data}:{data:ShopCarType[]}) => {
          this.shopOrders = organizeOrders(data)
          return this.shopOrders
    })
    },

    setStatusOrder(nowStatus:'created'|'progress'|'conclude' , next=true ,id:string){
      const statusAvailable = ['created','progress','conclude','finalized']

      const newStatus = next?statusAvailable[statusAvailable.indexOf(nowStatus)+1]:statusAvailable[statusAvailable.indexOf(nowStatus)-1]
      api.put(`/api/shopcar/${id}`,{status:newStatus})
        .then((response)=>{
          successNotify('Pedido atualizado!')
          this.shopOrders = organizeOrders(response.data)
      })
    }





  }
});
