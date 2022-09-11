import { defineStore } from 'pinia';
import {api} from 'src/boot/api';
import { token } from 'app/token';
import { ShopCarType } from 'src/models/shopOrder';
import { Notify } from 'quasar';
import { useAuthStore } from './auth';



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
      console.log(auth.accessToken)
      return api.get('api/shopcar',{headers: {
        'Authorization': `Bearer ${auth.accessToken}` 
      }
    }).then(({data}:{data:ShopCarType[]})=>{
      this.shopOrders = organizeOrders(data)
      return this.shopOrders
    })
    },

    setStatusOrder(nowStatus:'created'|'progress'|'conclude' , next=true ,id:string){
      const statusAvailable = ['created','progress','conclude','finalized']
      const newStatus = next?statusAvailable[statusAvailable.indexOf(nowStatus)+1]:statusAvailable[statusAvailable.indexOf(nowStatus)-1]
      api.put(`/api/shopcar/${id}`,{status:newStatus},
      {
        headers: {
        'Authorization': `Bearer ${auth.accessToken}` 
      }}).then((response)=>{
        Notify.create({message:'Pedido atualizado!' ,timeout:300 ,color:'positive' ,icon:'done'})
        this.shopOrders = organizeOrders(response.data)
      })
    }





  }
});
