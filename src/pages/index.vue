<script setup>
import Table from '@/components/Table.vue';
import Notes from '@/components/Notes.vue';

onMounted(() => {
  if(!localStorage.getItem('accessToken'))
  window.location.assign("/login")
})


  const height = ref(window.innerHeight) 


</script>

<template>
  <div class="d-flex"  :style="`width: 100%; height: 1000px;` ">
   
    <Notes  class="mr-12"/>
    
      <Table />
   
  
  </div>
</template>