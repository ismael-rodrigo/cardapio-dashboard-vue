<template>
    <q-btn @click="route.push('/product/new')">NEW PRODUCT</q-btn>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';


const route = useRouter()


</script>