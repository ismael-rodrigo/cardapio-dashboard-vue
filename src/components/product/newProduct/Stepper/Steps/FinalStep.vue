<template>
  <PreviewProductVue/>
  <q-stepper-navigation style="display:flex; justify-content:space-between; margin-top: 20px;" >
    <q-btn  color="warning" label="Voltar" @click="back()" />
    <q-btn color="primary" label="avancar" @click="onSubmit()" />
  </q-stepper-navigation>
</template>



<script setup lang="ts">
import PreviewProductVue from 'src/components/product/previewProduct/PreviewProduct.vue';
import { useProductType } from 'src/composables/useProduct';
import { UpdatePageEventType } from '../SteperContainer.vue';

type Props={
    handlerProduct:useProductType
}
const props = defineProps<Props>()


const emit = defineEmits(['update-page'])

const onSubmit = ()=>{
  emit( 'update-page' ,{ page:"next" } as UpdatePageEventType )
}

const back = ()=>{

  emit('update-page' ,{ page:'back' } as UpdatePageEventType )
}

</script>
