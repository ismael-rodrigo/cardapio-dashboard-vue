<template>
    <div class="card-container" v-bind:class="{'card-container-dark-active': $q.dark.isActive === true}">
        <p  class="title">Pedido numero 24</p>

        <div class="infos-container">

            <p class="info">
            Endereço :
            </p>
            <p class="sub-info">
                {{props.order.addressUser.rua}}, n {{props.order.addressUser.numero}} - {{props.order.addressUser.bairro}}
            </p>

        </div>

        <br>
  
        <div class="infos-container">
            <p class="info">
            Pagamento :
            </p>
            <p class="sub-info">
                {{props.order.paymentMethod.type}} {{props.order.paymentMethod.flag_card&& ' - '+props.order.paymentMethod.flag_card}}
            </p>
        </div>



        <br>
        <div class="buttons-container"> 
            <q-btn v-show="!hasStatus('created')"  color="red"  icon="arrow_back_ios_new"   label="Voltar"  @click="updateStatus(props.order.status ,false)"  />
            <q-btn icon-right="info" label="Detalhe"  />
            <q-btn color="green"  icon-right="arrow_forward_ios" :label="props.order.status !='conclude'?'Avançar':'Finalizar' "  @click="updateStatus(props.order.status)" />
        </div>
    </div>
</template>


<script lang="ts" setup >
import { useQuasar } from 'quasar';
import { ShopCarType } from 'src/models/shopOrder';
import { useOrderStore } from 'src/stores/orders';
import { defineProps  } from 'vue';


const order = useOrderStore()



interface Props {
    order:ShopCarType
} 

const props = defineProps<Props>()
const $q = useQuasar()

function hasStatus(status:string){
    return props.order.status == status
}

function updateStatus(status:any,next=true){
    order.setStatusOrder(status ,next ,props.order.id)
}






</script>


<style>
.card-container{
    width: 100%;
    transition: 0.2s;
    background-color:#8080807a;
    border-radius: 7px;
    margin-top: 20px;
    padding: 10px;
}
.card-container .title{
    font-size: 30px;
    text-align: center;
    font-weight: 300;
}






.infos-container .info{
    margin: 0px;
    font-size: 17px;
    font-weight: 350;
    vertical-align: middle;
}

.infos-container .sub-info{
    margin: 0px;
    margin-left: 10px;
    font-size: 15px;
    font-weight: 300;
    vertical-align: middle;
}

.card-container-dark-active{
    background-color:#474747;
}

.buttons-container{
    display: flex;
    justify-content: space-between;
}






</style>