<template>
    <div class="container">
    <input id="fileInput" type="file" style="display:none" @change="updateFile" />
    <q-card class="my-card" >
      
      <q-card-section>
     
          <q-img
          onclick="document.getElementById('fileInput').click()"
          class="col"
          style="cursor:pointer;"
          :src="imgProduct"
          />

     
        
        <q-card-actions>
          <q-btn flat round color="green" icon="add" type="file" id="fileInputButton" onclick="document.getElementById('fileInput').click()" />
          <q-btn v-show="imgProduct != initialImgProduct" flat round color="red" icon="delete" @click="deleteFile" />
      
        </q-card-actions>
      </q-card-section>
      </q-card>

      <q-form
      @submit="onSubmit"

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

const initialImgProduct = 'https://www.namepros.com/attachments/empty-png.89209/'
let imgProduct = ref(initialImgProduct)



const onSubmit = (evt:SubmitEvent | Event)=>{
console.log(evt)
}
const deleteFile = ()=>{
  imgProduct.value = initialImgProduct
  //eslint-disable-next-line
  //@ts-ignore
  document.getElementById('fileInput').value = ''
}

function updateFile(evt:any) {
    imgProduct.value = URL.createObjectURL(evt.target.files[0])
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