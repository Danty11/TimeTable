<script setup lang="ts">
import Table from '@/components/Table.vue';
import Notes from '@/components/Notes.vue';




onMounted(async() => {
  if(!localStorage.getItem('accessToken'))
  window.location.assign("/login")
  document.title = "Time Table"

})







</script>

<template>
  <div class="d-flex"  :style="`width: 100%; height: 1000px;` ">
   
    <Notes  class="mr-12"/>
    
      <Table />
   
  
  </div>
</template>