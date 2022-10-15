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


        <q-input 
        class="full-width"  
        filled 
        v-model="product_title" 
        label="Nome do Produto" 

        
        
        
        />
        <q-input 
        class="full-width" 
        filled 
        v-model="product_description" 
        label="Descrição do Produto" 
          />

      </div>

      <q-stepper-navigation style="display:flex; justify-content:space-between; margin-top: 20px;" >
              <q-btn  color="warning" label="Voltar" @click="emit('update-page' ,{ page:'back' } as UpdatePageEventType )" />
              <q-btn color="primary" label="avancar" @click="onSubmit()" />
      </q-stepper-navigation>

</template>

<script setup lang="ts">
import { useProductType } from 'src/composables/useProduct';
import { ref , defineEmits, VNodeRef } from 'vue';
import { UpdatePageEventType } from '../SteperContainer.vue';

type Props={
    handlerProduct:useProductType
}
const props = defineProps<Props>()



const product_title = ref('')
const product_description = ref('')
let image:any = null






const initialImgProduct = 'https://www.namepros.com/attachments/empty-png.89209/'

let imgProduct = ref(initialImgProduct)

const emit = defineEmits(['update-page'])



const onSubmit  = () =>{
  
  const validate = props.handlerProduct.setInfosProduct({
    icon:image,
    description:product_description.value,
    title:product_title.value
  })

  if(validate?.error){
      emit('update-page',{
      error:validate.error
      } as UpdatePageEventType )
  }
  else{
      emit('update-page',{
      page:'next'
      } as UpdatePageEventType )
  }

}

const deleteFile = ()=>{
  imgProduct.value = initialImgProduct
  image.value = null
  //eslint-disable-next-line
  //@ts-ignore
  document.getElementById('fileInput').value = ''
}


const updateFile = (evt:any) => {
  image = evt.target.files[0]
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