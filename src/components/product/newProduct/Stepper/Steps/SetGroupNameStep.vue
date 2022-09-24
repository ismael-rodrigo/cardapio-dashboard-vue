<template>
<div class="container">
    <h6 class="title" >Defina um grupo para o produto</h6>
    <q-btn-dropdown color="primary" :label="groupSelected?groupSelected:'Grupos disponíveis'">

        <div class="new-group-area">
            <q-input class="full-width"  outlined v-model="newGroup" label="Novo grupo" />
            <q-btn  color="secondary" icon="add"/>

        </div>

        <q-list>
            <q-item v-for="group in groupsAvailable" clickable v-close-popup @click="handleGroupSelected(group.group_name)" :key="group.group_name">
                <q-item-section>
                <q-item-label>{{group.group_name}}</q-item-label>
                </q-item-section>
            </q-item>


        </q-list>
     </q-btn-dropdown>

     


     
</div>
    <q-stepper-navigation class="buttons" >
            <q-btn  color="warning" label="Voltar" />
            <q-btn color="primary" label="avancar"/>
    </q-stepper-navigation>

</template>


<script setup lang="ts">
import { useProductType } from 'src/composables/useProduct';
import { ref ,defineEmits ,onBeforeMount } from 'vue';

const emit = defineEmits(['onUpdate-state-product'])

type Props={
    handlerProduct:useProductType
}
const props = defineProps<Props>()


let newGroup = ref('')

let groupSelected = ref(props.handlerProduct.product.value.group_name)

const groupsAvailable = [
    {group_name:'Pizza'},
    {group_name:'Refrigerantes'},
    {group_name:'Hamburguers'},
]

const handleGroupSelected = (group_name:string)=>{
    groupSelected.value = group_name
    emit('onUpdate-state-product',{
        action:'setGroupName',
        payload:{group_name:group_name}
    })

}



</script>

<style scoped>
.container{
    display:flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    width: 50%;
}


.title{
    text-align: center;
    margin: 10px;
    padding: 0px;
}

.new-group-area{
    gap: 5px;
    padding: 5px;
    width: 100%;
    display: flex;
}
.buttons{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

</style>