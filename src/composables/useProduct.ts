import {  productInfos, productType } from "src/models/shopOrder"
import { ref } from "vue"

type Error = {
    message:string
    type:'warning'|'danger'
}

type Validation = {
    error:Error[]

}

export type useProductType = {
    getProduct: () => productType
    setInfosProduct: (infos:productInfos) => Validation | void
    setGroupName: (group_name:string) => Validation | void
    setRequirements: () => void
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
                error:[
                    {
                    message:'Nome do Grupo não pode ser nulo',
                    type:'warning'
                    }
                ]
            } as Validation
        
        }
    }



    const setInfosProduct = (infos:productInfos) =>{

        const LABELS_PRODUCT = {
            title: 'Nome do Produto',
            description: 'Descrição',
            icon: 'Imagem'
        }

        const errors = ref([])

        for (const [key, value] of Object.entries(infos)) {
            if(!value){
            //eslint-disable-next-line
            //@ts-ignore
            errors.value.push({message:`${LABELS_PRODUCT[key]} não pode ser nulo !` , type:'warning'})   
            }
        }
        if(errors.value.length>0){
            return { error:errors.value }

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

