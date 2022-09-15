<template>
    <div class="q-pa-xl">
      <q-stepper
        v-model="stepCount"
        ref="stepper"
        color="primary"
        animated
        header-nav
      >
        <q-step
          v-for="step,index in props.steps"
          :key="index"
          :name="index"
          :title="step.title"
          :icon="step.icon"
          :done="stepCount > index"
        >
        <component :is="step.component"></component>
        </q-step>
  
        
        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn @click="nextStepper" color="primary" :label="stepCount === props.steps.length ? 'Finish' : 'Continue'" />
          </q-stepper-navigation>
        </template>
      </q-stepper>

      
      
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue'
  
type Stepp = {
    component:any
    icon:string
    title:string
}




type Props={
    steps:Stepp[]
}


const props = defineProps<Props>()

const stepCount = ref(0)

const nextStepper = ()=>{
  if(props.steps.length>=stepCount.value)stepCount.value++
}


  
</script>