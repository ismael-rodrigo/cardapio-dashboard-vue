<template>
    <div class="container-stepper">
      <q-stepper
        v-model="stepCount"
        ref="stepper"
        color="primary"
        animated

      >

        <q-step
          v-for="step,index in props.steps"
          :key="index"
          :name="index"
          :title="step.title"
          :icon="step.icon"
          :done="stepCount > index"
        >
        <component :is="step.component" :handlerProduct="props.handlerProduct" @update-page="handleUpdatePage" ></component>
        </q-step>

        <q-step
          :name="props.steps.length"
          title="Produto Finalizado"
          icon="done"
          :done="is_finished == true"
        >
          <component :is="PreviewStep"  :handlerProduct="props.handlerProduct" @update-page="handleUpdatePage" />
        </q-step>


      </q-stepper>


    </div>
  </template>

<script setup lang="ts">
import useNotify from 'src/composables/useNotify'
import { useProductType } from 'src/composables/useProduct'
import PreviewStep from './Steps/PreviewStep.vue'


import { ref } from 'vue'

export type SteppType = {
  component:any
  icon:string
  title:string
}

export type UpdatePageEventType = {
  page:'back'|'next'| null
  error:{
    message:string
    type:string
  }[] | null
}


type Props={
    steps:SteppType[],
    handlerProduct:useProductType
}


const props = defineProps<Props>()
const stepCount = ref(0)
const n = useNotify()

const is_finished = ref(false)


const handleUpdatePage = (payload:UpdatePageEventType)=>{
  if(payload.error && payload.error.length>0){
    payload.error.map(e => n.customNotify(e))

  }
  else{
    payload.page && updateStepper(payload.page)
  }
}


const updateStepper = async (page:'next'|'back')=>{
  switch(page){
    case 'next':

      if(stepCount.value == props.steps.length){
        is_finished.value = true
        props.handlerProduct.sendProduct(props.handlerProduct.getProduct())
        break;
      }
      stepCount.value++
      break;

    case 'back':
      stepCount.value--
      break;
  }
}


</script>


<style scoped>
.container-stepper{

  width: 60%;
  margin: 20px auto;
}

.buttons{
  display: flex;
  justify-content: space-between;
}

</style>
