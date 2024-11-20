<script setup lang="ts">
import { ref } from 'vue'
import { OAuth, UpdatePassword, DiscourseTl3Requirements, UpdateAccount } from './components'
import Profile from './components/UserProfile.vue'

const isBindDiscourse = ref<boolean>(false)
</script>

<template>
  <div class="grid gap-3 lg:grid-cols-2 xl:grid-cols-2 3xl:grid-cols-3 xxl:grid-cols-4">
    <OAuth @update:isBindDiscourse="(val: boolean) => (isBindDiscourse = val)" />
    <UpdateAccount />
    <Profile class="lg:col-span-2 xl:col-span-1" />
    <UpdatePassword class="lg:col-span-2 xl:col-span-1" />
    <template v-if="isBindDiscourse">
      <DiscourseTl3Requirements
        class="col-span-1 lg:col-span-2 xl:col-span-2 3xl:col-span-3 xxl:col-span-4"
      />
    </template>
  </div>
</template>
