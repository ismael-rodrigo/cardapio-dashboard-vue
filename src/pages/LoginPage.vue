<template>
    <div id="container">
        <form class="form" @submit.prevent="handleSubmit">
            <p>Login</p>
            <q-input filled  v-model="username"  label="E-mail" />
            <q-input filled  type="password" v-model="password"  label="Password" />
            <q-btn   type="submit" class="q-mt-lg full-width "  >Sing in</q-btn>
            <br>


        </form>
        
    </div>
</template>


<script setup>
import { Notify} from 'quasar';
import useNotify from 'src/composables/useNotify';
import { ref  } from 'vue';
import { useRouter } from 'vue-router';
import {useAuthStore} from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const {customNotify} = useNotify()


let username = ref('')
let password = ref('')

function handleSubmit(){
    auth.loginUser({username:username.value , password:password.value})
    .then((username)=>{
        customNotify({message:`Bem vindo ,${username}` ,color:'positive' , icon:'how_to_reg'})
        router.push('/dashboard')
    })
    .catch(()=>{
        Notify.create({message:'Usuario ou senha invalida !' ,color:'negative'})
    })
}

</script>



<style scoped lang="scss">
#container {
    display: flex ;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: $dark;
}
.form{
    padding: 30px;
    border-radius: 5px;
    border: thin solid rgb(117, 117, 117);
    background-color: rgb(255, 255, 255);
    width: 40%;
    min-width: fit-content;
    max-width: 400px;
}
.form p{
    font-size: 30px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgb(75, 75, 75);
}
.form a{
    text-decoration: none;
    margin-top: 10px;
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(46, 136, 136);
}






</style>