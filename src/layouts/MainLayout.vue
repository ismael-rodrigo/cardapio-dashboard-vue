<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Dashboard
        </q-toolbar-title>


    <account-settings/>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Cardapio Facil 
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import AccountSettings from 'components/AccountSettings.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
let darkMode = ref(true)





const linksList = [
  {
    title: 'Dashboard',
    icon: 'school',
    link: 'dashboard'
  },
  {
    title: 'Painel de Pedidos',
    icon: 'record_voice_over',
    link: 'product'
  },
];


    const leftDrawerOpen = ref(false)

    function  toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
  
  

</script>
