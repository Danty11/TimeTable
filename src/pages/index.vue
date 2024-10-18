<script setup>
import Table from '@/components/Table.vue';
import Notes from '@/components/Notes.vue';



const height = ref(window.innerHeight) 
</script>

<template>
  <div class="d-flex" :style="`width: 100%; height: ${height}px;`">
   
    <Notes class="mr-12"/>
    <Table />
  
  </div>
</template>