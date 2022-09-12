<template>
    <q-dialog  v-model:openModal="isOpen" >
      <q-card>
        <q-card-section>
          <div class="text-h6">Pedido numero 24</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh; min-width: 50vh;" class="scroll">
          <p v-for="product in props.infoShopCar.products" :key="product._id"   >{{product.qtd}} - {{product.name}}</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Sair" color="primary" v-close-popup />
          
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
  import { ShopCarType } from 'src/models/shopOrder';
import {ref ,defineProps } from 'vue';
  let isOpen = ref(false)


  type Props={
    infoShopCar:ShopCarType
  }
  const props = defineProps<Props>()




</script>