<template>
    <StepperNewProduct :steps="steps"/>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import StepperNewProduct from 'src/components/product/newProduct/Stepper/SteperContainer.vue';

import SetGroupNameStep from 'src/components/product/newProduct/Stepper/Steps/SetGroupNameStep.vue';
import SetInfosProductStepVue from 'src/components/product/newProduct/Stepper/Steps/SetInfosProductStep.vue';
import SetRequirementsStepVue from 'src/components/product/newProduct/Stepper/Steps/SetRequirementsStep.vue';


const steps = [
    {
        component:SetGroupNameStep,
        icon:'string',
        title:'Defina o grupo',
    },

    {
        component:SetInfosProductStepVue,
        icon:'string',
        title:'Informacoes do produto',
    },
    {
        component:SetRequirementsStepVue,
        icon:'string',
        title:'Requerimentos',
    },

]




</script>



<style scoped>

</style>