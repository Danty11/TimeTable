<script setup >
import { useToast } from 'vue-toastification';
import { useTableStore } from '../stores/store';

const reportStore = useTableStore()

onMounted(async () => {
    await reportStore.FetchReports()
  
}) 
</script>

<template>
    
    
        <div class="elevation-13 pa-4" style="min-width: 35%; overflow-y:scroll ; scrollbar-width: none; ">
            
            <div class="d-flex justify-space-between" dir="rtl" >
                <v-btn @click="reportStore.reportsDialog = true , reportStore.file = []" elevation="4" rounded="lg" size="x-large" class="bg-white"> <v-icon icon="mdi-plus-circle-outline"></v-icon> <span style="font-weight: bold;">تبليغ</span></v-btn>
            </div>

            <div v-for="note in reportStore.ReportsData" dir="rtl" style="color: black;" class="mt-4">
                <div class="d-flex justify-space-between elevation-13 pa-2 rounded-">
                    <div class="d-flex">
                        <img v-if="note.mainAttachment" :src="`https://k80sowk80c808s4cogk0woc0.158.220.126.158.sslip.io//${note.mainAttachment}`" class="rounded-lg" style="max-width: 150px; max-height: 120px; min-height: 120px; background-color: aqua; object-fit: cover;"> 
                        <div v-else class="rounded-lg" style="min-width: 150px; height: 120px; background-color: #8A2BE2;"> </div>
                        
                        <div class="d-flex flex-column mr-4" style="max-height: 125px;">
                            <p style="font-size: larger; font-weight: bold;">{{ note.title }}</p>
                            <p style="overflow-y: hidden;">{{ note.description }}</p>
                        </div>
                    </div>
                    <div>
                        <v-icon v-if="!reportStore.deleteLoading" @click="reportStore.deleteReport(note.id)" :size="25" class="hover-red"  icon="mdi-close-circle-outline"></v-icon>
                        <v-btn variant="text" v-else rounded="circle" size="small" :loading="true"></v-btn>
                    </div>
                </div>
            </div>
            <v-dialog
      v-model="reportStore.reportsDialog"
      width="auto"
    >
      <v-card
      dir="rtl"
      class="elevation-13 pa-4 "
      style="color: black; background-color: white;"
      width="600">

   
    
      <v-card-title class="text-center d-flex justify-space-between" style="width: 100%;">
        <div class="mx-5"></div>
              <span class="text-h5 text-center">اضافة تبليغ</span>
           
             
                
            <v-btn style="background-color: white;" variant="none" @click="reportStore.reportsDialog = false">
                <v-icon
                  color="black"
                  icon="mdi-close"
                  :size="30"
                ></v-icon>
              </v-btn>
            </v-card-title>

            <v-divider></v-divider>


        <div>
            <div>
                <p style="font-size: large;" class="mr-1">العنوان</p>
                <v-text-field v-model="reportStore.report.title" dir="rtl" variant="outlined"></v-text-field>
            </div>

            <div style="height: 170px;">
                <p style="font-size: large;" class="mr-1">الوصف</p>
                <v-text-field v-model="reportStore.report.description" dir="rtl" variant="outlined" style="height:100% "></v-text-field>
            </div>

            <div >
                <p style="font-size: large;" class="mr-1">الملحقات</p>
                <v-file-input variant="outlined" type="file" accept="image/*" id="upload"  @change="reportStore.handleimg"></v-file-input>
                <!-- <v-file-input v-model="reportStore.file" @change="reportStore.handleFile" accept="image/*" prepend-icon="none" dir="rtl" variant="outlined" style="height:100% "></v-file-input> -->
            </div>
       
        </div>
        <v-btn size="large" @click="reportStore.addReport()" :loading="reportStore.loading">نشر</v-btn>
      </v-card>
    </v-dialog>
        </div>



    
  
</template>


<style scoped>
.hover-red {

  transition: color 0.3s ease;
}
.hover-red:hover {
  color: red; /* Change the color on hover */
}
</style>