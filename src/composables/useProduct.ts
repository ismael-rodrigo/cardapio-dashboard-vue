import {  productInfos, productType } from "src/models/shopOrder"
import { ref } from "vue"



export type useProductType = {
    getProduct: () => productType
    setInfosProduct: (infos:productInfos) => void
    setGroupName: (group_name:string) => void
} 


const useProduct = ()=>{

    const productGroupName = ref('')

    const productInfos = ref({} as productInfos)



    const setGroupName = (group_name:string)=>{
        productGroupName.value = group_name
    }



    const setInfosProduct = (infos:productInfos) =>{
            productInfos.value = infos
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
        setInfosProduct
    } as useProductType


}


export default useProduct

