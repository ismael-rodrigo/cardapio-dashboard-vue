<template>
  
<div class="container">

    <div class="order-container">
      <h1>
        Pedido realizado
      </h1>
      <q-separator inset/>
      <card-order v-for="iten in order.shopOrders.created" :key="iten.id"  :order="iten" />
    </div>
    <q-separator vertical inset />


    <div class="order-container">
      <h1>
        Em andamento
      </h1>
      <q-separator inset/>
      <card-order v-for="iten in order.shopOrders.progress" :key="iten.id"  :order="iten" />
    </div>
    <q-separator vertical inset />

    <div class="order-container">
      <h1>
        Saiu para entrega
      </h1>
      <q-separator inset/>
      <card-order v-for="iten in order.shopOrders.conclude" :key="iten.id"  :order="iten" />
    </div>
    <q-btn @click="handlerStateModal">ssss</q-btn>
    <modal-detail-order :isOpenModal="openModal" />
  

</div>

  
  


</template>

<script lang="ts" setup>
import CardOrder from "../components/dashboard/cardOrder.vue";
import { onMounted, ref} from "vue";
import { useOrderStore } from "src/stores/orders";
import ModalDetailOrder from "src/components/dashboard/ModalDetailOrder.vue";

const order = useOrderStore()

onMounted(()=>{
  order.getShopOrders().catch(()=>alert('error'))
})


let openModal = ref(true)


function handlerStateModal(){
  openModal.value = !openModal.value
}




</script>

<style scoped lang="scss">

  .container{
    display:flex;
    justify-content: space-evenly;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    
  }

  .order-container{
    width: 100%;
  }
  .order-container h1{
    font-weight: 350;
    font-size: 2.3rem;
    text-align: center;
    margin: 0px;
    padding: 0px;

  }

</style>