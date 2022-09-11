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


  


    
</div>

  
  


</template>

<script lang="ts" setup>
import CardOrder from "../components/dashboard/cardOrder.vue";
import { onMounted, ref} from "vue";
import { useOrderStore } from "src/stores/orders";

const order = useOrderStore()

onMounted(()=>{
  order.getShopOrders().catch(()=>alert('error'))
})


</script>

<style scoped>
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
    font-size: 30px;
    text-align: center;
    margin: 0px;
    padding: 0px;

  }

</style>