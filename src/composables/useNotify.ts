
import { Notify,QNotifyCreateOptions } from "quasar"

const useNotify = ()=>{


    const successNotify = (msg:string , timeout=400 )=> {
        Notify.create({type:'positive' , message:msg ,timeout:timeout})
    }

    const warningtNotify = (msg:string, timeout=400 )=> {
        Notify.create({type:'warning' , message:msg ,timeout:timeout})
    }

    const dangerNotify = (msg:string ,timeout=400 )=> {
        Notify.create({type:'negative' , message:msg ,timeout:timeout})
    }

    const infoNotify = (msg:string ,timeout=400 )=> {
        Notify.create({type:'info' , message:msg ,timeout:timeout})
    }

    const customNotify = (opts : QNotifyCreateOptions | string)=>{
        Notify.create(opts)
    }


    return {
        successNotify,
        warningtNotify,
        dangerNotify,
        infoNotify,
        customNotify
    }
}

export default useNotify