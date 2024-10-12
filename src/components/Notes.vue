<script setup >
import { useTableStore } from '../stores/store';

const reportStore = useTableStore()

onMounted(async () => {
    await reportStore.FetchReports()
}) 




const index = ref(0)

const increaseIndex = () => {
    index.value ++
    
    if(index.value == reportStore.ReportsData.length)
        index.value = 0
}

const decreaseIndex = () => {
    index.value ++
    
    if(index.value == reportStore.ReportsData.length)
        index.value = 0
}


</script>

<template>
    <div>

        <div class="elevation-13 py-4 d-flex rounded-lg " style="width: 800px; height: 100%;">
            <div class="my-auto" style="color: black;">
                <v-btn  size="x-large" rounded="lg" variant="none" @click="increaseIndex()">
                    <v-icon size="x-large" icon="mdi-arrow-left"></v-icon>
                </v-btn>
            </div>

          <div class="d-flex flex-column my-6" style="width: 100%;">
            <div class="d-flex mx-auto mb-2 rounded-lg" style=" width: 90%; background-color: blueviolet; height: 300px;"></div>

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
        </div>

    </div>
</template>