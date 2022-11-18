<template>
    <div class="requirements-container">
        <p class="text-h6">Defina as opções do produto</p>
        <div class="option-container ">
            <p class="text-subtitle2 ">Opção {{opc_number}} :</p>
            <div class="option">
                <div class="requirement">
                    
                    <div class="title-container">
                        <p>Título da opção :</p>
                       
                        <q-input outlined  style="width:100%;" label="Título"  placeholder="Ex: Sabor da pizza" v-model="title_requirement" />
                
                    </div>
                    

                    <div class="input-container">
                        <p>Limite de  opções :</p>
                        <div class="inputs">
                            <q-input v-model="min"  type="number" outlined label="Min" placeholder="2 Sabores" />
                            <q-input v-model="max" type="number" outlined label="Max" placeholder="4 Sabores" />
                        </div>
                    </div>

                </div>
                
                <br>
                <q-separator spaced  />
                
                
                <div class="sub-container">
                    <p>Sub Opções</p>
                    
                    <div class="sub-opcoes">
                        <div class="row ">
                            <div class="col ">  
                                <q-input outlined  label="Titulo"  placeholder="Ex: 1/2 Calabresa" v-model="title_subRequirement" />
                            </div>

                            <div class="col-md-3 offset-md-1">
                                <q-input outlined  label="Valor" type="number"  placeholder="Ex: 12 reais" v-model="value_subRequirement" />
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <q-input class="col"  outlined  label="Descrição"  placeholder="Ex: Ingredientes : calabresa , mussarela ..." v-model="description_subRequirement" />
                        </div>
                        <br>
                        <div class="row">
                            <q-btn style="width: 75%; margin: auto;" color="positive" rounded @click="addNewSubRequirement" >Adicionar</q-btn>       
                        </div>
                         
                    </div>
                    <br>
                    <div v-for="sub in subRequirements" :key="sub.name" >
                        <div class="sub-opcao-saved row q-pa-md items-center" v-bind:class="$q.dark.isActive ? 'bg--dark' : 'bg--light' "  >

                            <div class="col">
                                <p class="text-h6 row" >{{sub.name}}</p>
                                <p class="text-subtitle2 row" >{{sub.description}}</p>
                            </div>

                            <p class="col-md-1"  >R$ {{sub.value}}</p>
                           
                        </div>
                        <br>
                    </div>

                    
                </div>


            </div>
        </div>
        

    </div>

    <q-stepper-navigation style="display:flex; justify-content:space-between; margin-top: 20px;" >
            <q-btn  color="warning" v-if="opc_number==1" label="Voltar" @click="handleSubmit('back')" />
            <q-btn  color="warning" v-if="opc_number>1" label="Excluir opção" @click="remOption()" />
            <q-btn color="primary" label="avancar" @click="()=>openAlert = true" />
    </q-stepper-navigation>


    <q-dialog v-model="openAlert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>
  
          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Continuar com cadastro" color="primary" v-close-popup @click="handleSubmit('next')" />
            <q-btn flat label="Adicionar outra opção" color="primary" v-close-popup  @click="addNewOption" />
          </q-card-actions>
        </q-card>
      </q-dialog>


</template>

<script setup lang="ts">
import { useProductType  } from 'src/composables/useProduct';
import {SubRequirement} from 'src/models/shopOrder'
import { ref } from 'vue';
import { UpdatePageEventType } from '../SteperContainer.vue';
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/useNotify';

const emit = defineEmits(['update-page'])
const $q = useQuasar()
const n = useNotify()


type Props={
    handlerProduct:useProductType
}

const props = defineProps<Props>()
const openAlert = ref(false)
const opc_number = ref(1)


const min = ref(0)
const max = ref(0)    
const title_requirement = ref('')

const title_subRequirement = ref('')
const value_subRequirement = ref(0)
const description_subRequirement = ref('')

const subRequirements = ref([] as SubRequirement[])


    
const addNewSubRequirement = () => {
    subRequirements.value.push({
        name:title_subRequirement.value,
        value:value_subRequirement.value,
        description:description_subRequirement.value
    })
    title_subRequirement.value =''
    value_subRequirement.value = 0
    description_subRequirement.value = ''
}






const handleSubmit = (page:'next'|'back')=>{
    if(page == 'back'){
        emit( 'update-page' ,{ page:page } as UpdatePageEventType )
        return;
    }
    const validadtion = props.handlerProduct.setRequirements({
        name:title_requirement.value,
        length_sub_requiments:{min:min.value, max:max.value},
        sub_requirements:subRequirements.value
    })

    openAlert.value = true;
    

}

const addNewOption = ()=>{
    const validadtion = props.handlerProduct.setRequirements({
        name:title_requirement.value,
        length_sub_requiments:{min:min.value, max:max.value},
        sub_requirements:subRequirements.value
    })

    max.value = 0;
    min.value = 0;
    title_requirement.value = ''
    title_subRequirement.value =''
    value_subRequirement.value = 0
    description_subRequirement.value = ''
    subRequirements.value = []

    opc_number.value++
}


const remOption = ()=>{
    const before_requirement = props.handlerProduct.remOption(title_requirement.value)
    console.log(before_requirement)
    opc_number.value--

    max.value = before_requirement.length_sub_requiments.max
    min.value = before_requirement.length_sub_requiments.min
    title_requirement.value = before_requirement.name
    subRequirements.value = before_requirement.sub_requirements

    title_subRequirement.value =''
    value_subRequirement.value = 0
    description_subRequirement.value = ''
}








</script>


<style scoped>

.option{
    border:1px solid rgba(255, 255, 255, 0.247);
    padding: 10px 20px;
    border-radius: 5px;

}
.requirement{
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 50px;
}

.title-container{
    width: 100%;
}

.inputs{
    display: flex;
    gap: 7px;

}



.sub-container{
    padding: 10px;
}

.sub-opcoes{
    border: 1px solid rgb(119, 119, 119);
    padding: 10px;
    border-radius: 5px;

}

.sub-opcao-saved{

    border-radius: 5px;
}


</style>