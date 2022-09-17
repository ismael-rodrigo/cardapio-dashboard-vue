<template>
    <div class="container">
    <input id="fileInput" type="file" style="display:none" @change="fileChange" />
    <q-card class="my-card" >
      
      <q-card-section >
        <q-img
          class="col"
          :src="imgProduct"
        />

        <q-card-actions   >
          <q-btn flat round color="green" icon="add" type="file" id="fileInputButton" onclick="document.getElementById('fileInput').click()" />
          <q-btn flat round color="red" icon="delete" @click="removeImage" />
      
        </q-card-actions>
      </q-card-section>
      </q-card>

      <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="full-width form"
    >
      <q-input class="full-width"  filled v-model="product_title" label="Nome do Produto"  />
      <q-input class="full-width" filled v-model="product_description" label="Descrição do Produto"   />

    </q-form>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let product_title = ref('')
let product_description = ref('')

let imgProduct = ref('https://www.namepros.com/attachments/empty-png.89209/')


const onSubmit = (evt:SubmitEvent | Event)=>{
console.log(evt)
}
const onReset = () =>{
console.log('reset')
}

const fileChange = (e:any)=>{
  console.log(e.target.files)
if(e.target.files){
  imgProduct.value = 'https://static.clubedaanamariabraga.com.br/wp-content/uploads/2016/07/pizza-de-4-queijos.jpg?x41527'
}
}
const removeImage = ()=>{
  imgProduct.value = 'https://www.namepros.com/attachments/empty-png.89209/'
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