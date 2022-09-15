<template>
    <div class="container">
        <h1 class="title">Novo Produto</h1>

    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-img
          class="col"
          src="https://www.namepros.com/attachments/empty-png.89209/"
        />

        <q-card-actions vertical class="justify-around q-px-md">
          <q-btn flat round color="green" icon="add" />
          <q-btn flat round color="red" icon="delete" />
         
        </q-card-actions>
      </q-card-section>
      </q-card>

      <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="full-width gap-1 form"
    >
      <q-input class="full-width"  filled v-model="product_title" label="Nome do Produto"  />
      <q-input class="full-width" type="textarea"  filled v-model="product_description" label="Descrição do Produto"   />

      <q-btn label="Submit" type="submit" color="primary"/>
    </q-form>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let product_title = ref('')
let product_description = ref('')



const onSubmit = (evt:SubmitEvent | Event)=>{
console.log(evt)
}
const onReset = () =>{
console.log('reset')
}


</script>



<style scoped>
.container{
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    max-width: 700px;
    gap: 10px;
}
.title{
    font-size: 40px;
    margin: 0px;
}

.my-card{
width: 100%;
}

.form{
    display: flex;
    flex-direction: column;
    gap: 10px;
}



</style>