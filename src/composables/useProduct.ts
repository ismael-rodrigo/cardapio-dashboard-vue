import { api } from "src/boot/api"
import {  productInfos, productType ,RequirementProduct} from "src/models/shopOrder"
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
    setRequirements: (requirement:RequirementProduct) => Validation | void
    remOption:(title_requirement:string)=>RequirementProduct
    remRequirements:(index:number | void)=> void
    sendProduct: (product:productType) =>  Promise<Validation | void>
}



const useProduct = ()=>{

    const productGroupName = ref('')
    const productInfos = ref({} as productInfos)
    const requirements = ref([] as RequirementProduct[])


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
        console.log(infos.icon)
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


    const setRequirements = (requirement:RequirementProduct) => {
        requirements.value.push(requirement)
    }


    const remRequirements = (index:number | void)=>{
      if(index != undefined){
        requirements.value.splice(index , 1)
        console.log(requirements.value)
        return;
      }
      requirements.value = []
    }

    const remOption = (title_requirement:string)=>{
      requirements.value = requirements.value.filter(requirement => requirement.name != title_requirement)
      return requirements.value[requirements.value.length - 1]
    }

    const getProduct = () => {
        return{
            group_name:productGroupName.value,
            product:{
                title:productInfos.value.title,
                description:productInfos.value.description,
                requirements:requirements.value,
                value:0
            }

        } as productType
    }

    const sendProduct = async (product:productType) => {
        const result_only_product_infos = await api.post("/api/product/" , product)

        if(result_only_product_infos.status != 200){
            return {error:[{ message: "Não foi possivel cadastrar produto ,tente novamente." ,type:"danger"} as Error]} as Validation
        }

        const formData = new FormData();
        formData.append("icon",productInfos.value.icon);
        const save_image = await api.post(`/api/product/${result_only_product_infos.data["group_name"]}/${result_only_product_infos.data["_id"]}/icon`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })

        if(save_image.status != 200){
            return {error:[{ message: "Não foi possivel adicionar imagem, tente adicioná-la manuamente." ,type:"warning"} as Error]} as Validation
        }
    }





    return {
        getProduct,
        setGroupName,
        setInfosProduct,
        setRequirements,
        remOption,
        remRequirements,
        sendProduct
    } as useProductType


}


export default useProduct

