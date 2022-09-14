<template>
  <div class="q-pa-md">
    <q-btn-dropdown 
      label="Configurações">

      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-toggle v-model="darkMode" @click="$q.dark.set(!darkMode.valueOf())" label="Light mode" />
          
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">{{auth.currentUser}}</div>

          <q-btn
            color="red-6"
            label="Logout"
            
            size="sm"
            @click="handleLogout"
            v-close-popup
          />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import {useQuasar} from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const auth = useAuthStore()
const route = useRouter()


let darkMode = ref(!$q.dark.isActive)


function handleLogout(){
  auth.logout()
  route.push('/login')
}

</script>
