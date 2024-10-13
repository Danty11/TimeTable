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

        <v-dialog v-model="tableStore.newSubjectDialog" max-width="500px" class="rounded-xl">
        <v-card class="rounded-lg" style="background-color: white; color: black;">
          <div class="d-flex justify-space-between">
            
            <v-card-actions>
              <v-btn color="primary" @click="tableStore.newSubjectDialog = false">
                <v-icon
                  color="blue-grey"
                  icon="mdi-close"
                  size="large"
                ></v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-title>
              <span class="text-h5"> اضف مادة </span>
            </v-card-title>

   
          </div>
          <v-card-text dir="rtl" class="d-flex flex-column">

            <div class="d-flex ">
              <p class="mt-5 ml-2" style="font-weight: bold;">اسم المادة :</p>
              <v-text-field style="font-weight: bold;" v-model="tableStore.newSubject.materialName" dir="rtl" variant="underlined"></v-text-field>
            </div>

            <div class="d-flex ">
              <p class="mt-5 ml-2" style="font-weight: bold;">اسم التدريسي :</p>
              <v-text-field style="font-weight: bold;" v-model="tableStore.newSubject.doctorName" dir="rtl" variant="underlined"></v-text-field>
            </div>

            <div class="d-flex ">
              <p class="mt-5 ml-2" style="font-weight: bold;"> القاعة :</p>
              <v-text-field style="font-weight: bold;" v-model="tableStore.newSubject.studyHall" dir="rtl" variant="underlined"></v-text-field>
            </div>

            <v-btn @click="tableStore.addNewSubject()" class="mt-2" size="large" variant="outlined" style="color: black; font-size: larger; font-weight: bold;">اضافة</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>

    </div>
</template>