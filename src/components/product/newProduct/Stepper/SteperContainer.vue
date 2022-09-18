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
        <component :is="step.component" @onUpdate-state-product="handlerUpdateStateProduct" :handlerProduct="props.handlerProduct" ></component>
        </q-step>
  
        <q-step
          :name="props.steps.length"
          title="Produto Finalizado"
          icon="done"
          :done="stepCount == props.steps.length"
        >
        <h1>Produto registrado com sucesso !</h1>
        </q-step>
        
        <template v-slot:navigation>
          <q-stepper-navigation class="buttons" >
            <q-btn v-show="stepCount!=0" @click="backStepper" color="warning" label="Voltar" />
            <div v-show="stepCount>=0"></div>
            <q-btn @click="nextStepper" color="primary" :label="stepCount === props.steps.length ? 'Finish' : 'Continue'" />
          </q-stepper-navigation>
        </template>
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




type Props={
    steps:SteppType[],
    handlerProduct:useProductType
}


const props = defineProps<Props>()
const stepCount = ref(0)
const n = useNotify()


const nextStepper = ()=>{
  switch(stepCount.value){
    case 0: 
      props.handlerProduct.product.value.group_name
        ?stepCount.value++
        :n.warningtNotify('Nome do Grupo não pode ser nulo !')
      break;

    case 1:
  }




}
const backStepper = ()=>{
  if(stepCount.value>0)stepCount.value--
}

const handlerUpdateStateProduct = (evt:{action:string , payload:string})=>{
  switch(evt.action){
    case 'setGroupName': props.handlerProduct[evt.action](evt.payload) ; break;
    
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