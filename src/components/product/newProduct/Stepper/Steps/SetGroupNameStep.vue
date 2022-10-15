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
    <q-stepper-navigation style="display:flex; justify-content:space-between; margin-top: 20px;" >
            <div></div>
            <q-btn color="primary"  label="avancar" @click="handleOnSubmit('next')" />
    </q-stepper-navigation>

</template>


<script setup lang="ts">
import { useProductType } from 'src/composables/useProduct';
import { ref ,defineEmits ,onBeforeMount } from 'vue';
import { UpdatePageEventType } from '../SteperContainer.vue';


type Props={
    handlerProduct:useProductType
}
const props = defineProps<Props>()

let newGroup = ref('')
let groupSelected = ref(props.handlerProduct.getProduct().group_name)



const groupsAvailable = [
    {group_name:'Pizza'},
    {group_name:'Refrigerantes'},
    {group_name:'Hamburguers'},
]

const handleGroupSelected = (group_name:string)=>{
    groupSelected.value = group_name
}


const emit = defineEmits(['update-page'])

const handleOnSubmit = (page:'next'|'back')=>{
        const validate = props.handlerProduct.setGroupName(groupSelected.value)

        if(validate?.error){
            emit('update-page',{
            error:validate.error
            } as UpdatePageEventType )
        }
        else{
            emit('update-page',{
            page:page
            } as UpdatePageEventType )
        }
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


</style>