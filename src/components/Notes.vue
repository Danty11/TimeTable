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

        <!-- <div class="elevation-13 py-4 d-flex rounded-lg " style="min-width: 800px; height: 100%;">
            <div class="my-auto" style="color: black;">
                <v-btn  size="x-large" rounded="lg" variant="none" @click="increaseIndex()">
                    <v-icon size="x-large" icon="mdi-arrow-left"></v-icon>
                </v-btn>
            </div>

          <div class="d-flex flex-column my-6" style="width: 100%;">
              <div style=" width: 100%; max-height:fit-content ; margin: 0px auto;"> 
                <img v-if="reportStore.ReportsData[index]" :src="'https://k80sowk80c808s4cogk0woc0.158.220.126.158.sslip.io//' +reportStore.ReportsData[index].mainAttachment" class="d-flex mx-auto mb-2 rounded-lg" style="object-fit: fill;" />
              </div>
            <div dir="rtl" style="color: black; width: 90%;" class="d-flex flex-column mx-auto">
                <div v-if="reportStore.fetchComplete">
                    <p class="mb-1" style="font-weight: bold; font-size: larger;" >{{ reportStore.ReportsData[index].title }}</p>
                    <p style="width: 100%; height: fit-content; word-wrap: break-word">{{ reportStore.ReportsData[index].description }}</p>
                </div>
            </div>
            
          </div>

            <div class="my-auto" style="color: black;">
                <v-btn size="x-large" rounded="lg" variant="none" @click="decreaseIndex()">
                    <v-icon size="x-large" icon="mdi-arrow-right"></v-icon>
                </v-btn>
            </div>
        </div> -->

    </div>
</template>