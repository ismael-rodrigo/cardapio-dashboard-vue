<template>
    <StepperNewProduct :steps="step"/>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import StepperNewProduct from 'src/components/product/newProduct/Stepper/SteperContainer.vue';

import SetGroupNameStep from 'src/components/product/newProduct/Stepper/Steps/SetGroupNameStep.vue';
import SetInfosProductStepVue from 'src/components/product/newProduct/Stepper/Steps/SetInfosProductStep.vue';



const step = [
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


]



</script>



<style scoped>

</style>