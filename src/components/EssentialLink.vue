<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="route.push(link)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>

    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(
{
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    }
  })

const route = useRouter()



</script>
