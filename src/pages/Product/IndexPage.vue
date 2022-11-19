<template>
<q-btn color="primary" style="margin: 20px;" @click="route.push('/product/new')">NEW PRODUCT</q-btn>


</template>

<script lang="ts" setup>
 import { useRouter } from 'vue-router';
import PreviewProductVue from 'src/components/product/previewProduct/PreviewProduct.vue';

 const route = useRouter()


</script>
