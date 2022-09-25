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
          :done="stepCount == props.steps.length"
        >
        <h1>Produto registrado com sucesso !</h1>
        </q-step>
        

      </q-stepper>

      
    </div>
  </template>
  
<script setup lang="ts">
import useNotify from 'src/composables/useNotify'
import { useProductType } from 'src/composables/useProduct'
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
  } | null
}


type Props={
    steps:SteppType[],
    handlerProduct:useProductType
}


const props = defineProps<Props>()
const stepCount = ref(0)
const n = useNotify()



const handleUpdatePage = (payload:UpdatePageEventType)=>{
  if(payload.error){
    n.customNotify(payload.error)
  }
  else{
    payload.page && nextStepper(payload.page)
  }
}


const nextStepper = (page:'next'|'back')=>{
  switch(page){
    case 'next': 
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