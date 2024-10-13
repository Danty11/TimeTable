<script setup >
import { useTableStore } from '../stores/store';

const reportStore = useTableStore()

onMounted(async () => {
    await reportStore.FetchReports()
}) 




const index = ref(0)

const increaseIndex = () => {

    if(index.value == reportStore.ReportsData.length -1)
    index.value = 0

    else{
        index.value ++
    }
}

const decreaseIndex = () => {

    if(index.value == 0)
    index.value = reportStore.ReportsData.length -1

    else{
        index.value --
    }
}


</script>

<template>
    <div class="d-flex " style="width: 60%;  ">



        <div class="elevation-13 pa-4" style="min-width: 80%; height: 100%; " >
            
            <div class="d-flex justify-space-between">
                <v-btn elevation="4" rounded="lg" size="x-large" class="bg-white"> <v-icon :size="35" icon="mdi-pencil-box-outline"></v-icon></v-btn>
                <v-btn elevation="4" rounded="lg" size="x-large" class="bg-white"> <v-icon icon="mdi-plus-circle-outline"></v-icon> <span style="font-weight: bold;">تبليغ</span></v-btn>
            </div>

            <div v-for="note in reportStore.ReportsData" dir="rtl" style="color: black;" class="mt-4">
                <div class="d-flex elevation-13 pa-2 rounded-">
                    <div class="rounded-lg" style="min-width: 150px; height: 120px; background-color: aqua;"> </div>
                    
                    <div class="d-flex flex-column mr-2" style="max-height: 125px;">
                        <p style="font-size: larger; font-weight: bold;">{{ note.title }}</p>
                        <p style="overflow-y: hidden;">{{ note.description }}</p>
                    </div>
                </div>
            </div>
        </div>

     

    </div>
</template>