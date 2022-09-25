<template>


    <q-stepper-navigation style="display:flex; justify-content:space-between; margin-top: 20px;" >
            <q-btn  color="warning" label="Voltar" @click="handleSubmit('back')" />
            <q-btn color="primary" label="avancar" @click="handleSubmit('next')" />
    </q-stepper-navigation>

</template>

<script setup lang="ts">import { useProductType } from 'src/composables/useProduct';
import { UpdatePageEventType } from '../SteperContainer.vue';


const emit = defineEmits(['update-page'])

type Props={
    handlerProduct:useProductType
}
const props = defineProps<Props>()

    
const handleSubmit = (page:'next'|'back')=>{
  if(page == 'back'){
        emit( 'update-page' ,{ page:page } as UpdatePageEventType )
        console.log(props.handlerProduct.getProduct())
        return;
    } 

    else{
        console.log(props.handlerProduct.getProduct())
        emit('update-page',{
            error:{
                message:'Todos os campos são obrigatórios',
                type:'warning'
            }
        } as UpdatePageEventType )
    }
}
</script>


<style>

</style>