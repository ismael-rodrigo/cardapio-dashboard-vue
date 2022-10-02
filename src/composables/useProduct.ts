import {  productInfos, productType } from "src/models/shopOrder"
import { ref } from "vue"

type Validation = {
    error:{
        message:string
        type:'warning'|'danger'
    } | null

}

export type useProductType = {
    getProduct: () => productType
    setInfosProduct: (infos:productInfos) => Validation | void
    setGroupName: (group_name:string) => Validation | void
    setRequirements: () => void
} 


const LABELS_PRODUCT = {
    title: 'Nome do Produto',
    description: 'Descrição',
    icon: 'Imagem'
}

const useProduct = ()=>{

    const productGroupName = ref('')

    const productInfos = ref({} as productInfos)



    const setGroupName =  (group_name:string)=>{

        if(group_name){
            productGroupName.value = group_name

        }
        else{
            return {    
                error:{
                    message:'Nome do Grupo não pode ser nulo',
                    type:'warning'
                }
            } as Validation
        
        }
    }



    const setInfosProduct = (infos:productInfos) =>{

        const errors = ref([])
        for (const [key, value] of Object.entries(infos)) {
            if(!value){
            //eslint-disable-next-line
            //@ts-ignore
            errors.value.push(`${LABELS_PRODUCT[key]}`);          
            }
        }
        if(errors.value.length>0){
            return {    
                error:{
                    message: errors.value.length==1?`Campo ${errors.value[0]} é obrigatório.`:'Todos os campos são obrigatórios.',
                    type:'warning'
                }
            } as Validation
        }else {
            productInfos.value = infos
        }
    
    }


    const setRequirements = () => {
        console.log('')
    }
        

    const getProduct = () => {
        return{
            group_name:productGroupName.value,
            product:{
                title:productInfos.value.title,
                description:productInfos.value.description,
                requirements:[],
                value:0
            }
            
        } as productType
    }





    return {
        getProduct,
        setGroupName,
        setInfosProduct,
        setRequirements
    } as useProductType


}


export default useProduct

