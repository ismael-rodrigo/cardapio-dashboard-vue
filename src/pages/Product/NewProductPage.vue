<template>
    <StepperNewProduct :steps="steps" :handlerProduct="product"   />
</template>


<script setup lang="ts">

import StepperNewProduct, { SteppType } from 'src/components/product/newProduct/Stepper/SteperContainer.vue';
import SetGroupNameStep from 'src/components/product/newProduct/Stepper/Steps/SetGroupNameStep.vue';
import SetInfosProductStepVue from 'src/components/product/newProduct/Stepper/Steps/SetInfosProductStep.vue';
import SetRequirementsStepVue from 'src/components/product/newProduct/Stepper/Steps/SetRequirementsStep.vue';


import useProduct from 'src/composables/useProduct';
import { watch } from 'vue';


const product = useProduct()


let steps = [
    {
        component:SetGroupNameStep,
        icon:'bookmark_added',
        title:'Defina o grupo',
    },

    {
        component:SetInfosProductStepVue,
        icon:'feed',
        title:'Informacoes do produto',
    },
    {
        component:SetRequirementsStepVue,
        icon:'receipt_long',
        title:'Requerimentos',
    }



] as SteppType[]

watch(product.getProduct(),() => {
    console.log(product.getProduct())
})


</script>



<style scoped>

</style>
