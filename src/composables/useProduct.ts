import {  productType } from "src/models/shopOrder"
import { Ref, ref } from "vue"



export type useProductType = {
    product:Ref<productType>
    setGroupName:(group_name:string)=>void
} 


const useProduct = ()=>{

    const product = ref( {} as productType
)
    const setGroupName = (group_name:string)=>{
        product.value.group_name = group_name
    }


    const setInfoProduct = (infos:{
        name:string,
        description:string,
        icon:string }) =>{
            
            product.value.product.title = infos.name
            product.value.product.description = infos.description
    }
        






    return {
        product,
        setGroupName
    }


}


export default useProduct

