export type AddressUserType = {
    cep:string,
    bairro:string,
    rua:string,
    complemento:string,
    numero:number,
    referencia:string,
    value:number,
}



export type ShopCarType = {
    id:string,
    status:'created'|'progress'|'conclude'
    products:ProductOfShopCarType[],
    addressUser:AddressUserType,
    paymentMethod:{
        type:string,
        remaining?:number,
        flag_card?:string,
    }
}


export type ProductOfShopCarType = {
    _id:string,
    group_name:string,
    name:string,
    icon:string,
    qtd:number,
    requirements:{
        name:string,
        min_size:number,
        sub_requirements:{
            id:string,
            name:string,
            description:string,
            valor:number,
        }[]
    }[]

}

export type SubRequirement = {
    name:string
    description:string
    value:number
}


export type productType = {
    group_name:string
    product:{
        title:string
        description:string
        value:number
        requirements:RequirementProduct[]

    }
}

export type RequirementProduct = {
    name:string
    length_sub_requiments:{
        min:number
        max:number
    }
    sub_requirements:SubRequirement[]
}



export type productInfos = {
    title:string
    description:string
    icon:any
}