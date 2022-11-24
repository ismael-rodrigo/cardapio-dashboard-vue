<template>
  <div v-if="!is_finished" >
    <PreviewProductVue/>
    <q-stepper-navigation style="display:flex; justify-content:space-between; margin-top: 20px;" >
      <q-btn  color="warning" label="Voltar" @click="back()" />
      <q-btn color="primary" label="avancar" @click="openModal()" />
    </q-stepper-navigation>
  </div>

  <div v-else>
    <h3>Produto cadastrado com sucesso !</h3>
    <q-stepper-navigation style="display:flex; justify-content:center; margin-top: 20px;" >
      <q-btn color="primary" label="Produtos" @click="route.push('/product')" />
    </q-stepper-navigation>
  </div>


  <q-dialog v-model="openAlert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Deseja Finalizar Cadastro ?</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Para Finalizar cadastro clique em "Finalizar cadastro".Dentro de alguns minutos o produto será adicionado no site !
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Finalizar cadastro" color="primary" v-close-popup @click="onSubmit()" />
      </q-card-actions>
    </q-card>
  </q-dialog>


</template>



<script setup lang="ts">
import PreviewProductVue from 'src/components/product/previewProduct/PreviewProduct.vue';
import { useProductType } from 'src/composables/useProduct';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UpdatePageEventType } from '../SteperContainer.vue';

const route = useRouter()
type Props={
    handlerProduct:useProductType
}
const props = defineProps<Props>()


const emit = defineEmits(['update-page'])
const openAlert = ref(false)

const openModal = ()=> {
  openAlert.value = true

}

const is_finished = ref(false)



const onSubmit = ()=>{
  emit( 'update-page' ,{ page:"next" } as UpdatePageEventType )
  is_finished.value = true
}

const back = ()=>{

  emit('update-page' ,{ page:'back' } as UpdatePageEventType )
}

</script>
