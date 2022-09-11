import { defineStore } from 'pinia';
import {api} from 'src/boot/api';
import { token } from 'app/token';
import { ShopCarType } from 'src/models/shopOrder';



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
      return api.get('api/shopcar',{headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then(({data}:{data:ShopCarType[]})=>{
      this.shopOrders = organizeOrders(data)
      return this.shopOrders
    })



    },

    setStatusOrder(nowStatus:'created'|'progress'|'conclude' , next=true ,id:string){
      const statusAvailable = ['created','progress','conclude','finalized']
      api.put(`/api/shopcar/${id}`,{status:next?statusAvailable[statusAvailable.indexOf(nowStatus)+1]:statusAvailable[statusAvailable.indexOf(nowStatus)-1]},
      {
        headers: {
        'Authorization': `Bearer ${token}` 
      }}).then((response)=>{
        this.shopOrders = organizeOrders(response.data)
      })
    }





  }
});
