<template>
    <q-btn color="primary" style="margin: 20px;" @click="route.push('/product/new')">NEW PRODUCT</q-btn>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';


const route = useRouter()


</script>