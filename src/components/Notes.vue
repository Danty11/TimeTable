<script setup >
import { useToast } from 'vue-toastification';
import { useTableStore } from '../stores/store';

const reportStore = useTableStore()
const index = ref(0)

onMounted(async () => {
    await reportStore.FetchReports()
  
}) 

const formatLineBreak = (str) => {
  return str.replace(/\n/g, '<br>');
 
}

const required = (v) => {
        return !!v || 'Field is required'
      }

watch(() => reportStore.editReportDialog ,(newValue) => 
  {
    if(newValue == false)
      index.value = 0
  }
)

      function timeSince(date) {
        date = new Date(date)
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + " years ago";

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `منذ ${interval} شهر`;

  interval = Math.floor(seconds / 86400);
  if (interval == 1) return "منذ يوم واحد";

  interval = Math.floor(seconds / 86400);
  if (interval == 2) return "منذ يومان ";

  interval = Math.floor(seconds / 86400);
  if (interval > 2) return `منذ ${interval} ايام`;

  interval = Math.floor(seconds / 3600);
  if (interval == 1) return  `منذ ساعة واحدة`;

  interval = Math.floor(seconds / 3600);
  if (interval == 2) return `منذ ساعتان `;

  interval = Math.floor(seconds / 3600);
  if (interval > 2) return `منذ ${interval} ساعات`;

  interval = Math.floor(seconds / 60);
  if (interval == 1) return "منذ دقيقة واحدة";

  interval = Math.floor(seconds / 60);
  if (interval == 2) return "منذ دقيقتان ";

  interval = Math.floor(seconds / 60);
  if (interval > 2) return `منذ ${interval} دقائق`;

  return `منذ ${Math.floor(seconds)} ثواني `;
}

const changeIndex = (i) => {
  console.log(index.value)
  if(index.value == reportStore.editReportInfo.attachment.length )
      {index.value = 0
        console.log("-")
      }

    

  if(index.value == -1)
     {index.value = reportStore.editReportInfo.attachment.length -1
      console.log("+")
     }

}

</script>

<template>
    
    
        <div class="elevation-7 pa-4" style="min-width: 35%; max-width: 40%; overflow-y:scroll ; scrollbar-width: none; ">
            
            <div class="d-flex justify-space-between" dir="rtl" >
                <v-btn @click="reportStore.reportsDialog = true , reportStore.file = []"  rounded="lg" size="x-large" class="bg-white"> <p style="font-weight: bold; font-size: 20px;" class="ml-4">تبليغ</p> <v-icon icon="mdi-plus-circle-outline" :size="28"></v-icon></v-btn>
            </div>

            <div v-for="note in reportStore.ReportsData" dir="rtl" style="color: black;" class="mt-4">
                <div class="d-flex justify-space-between elevation-6 pa-2 rounded-">
                    <div  @click="reportStore.editReportInfo = note , reportStore.reportId = note.id ,reportStore.editReportDialog = true, console.log(reportStore.editReportInfo.attachment)" class="d-flex">
                        <img v-if="note.attachment.length > 0" :src="`https://mwo88k4ckooocck004o0cgk8.158.220.126.158.sslip.io//${note.attachment[0]}`" class="rounded-lg" style="max-width: 150px; max-height: 120px; min-height: 120px; background-color: aqua; object-fit: cover;"> 
                        <div v-else class="rounded-lg" style="min-width: 150px; height: 120px; background-color: #8A2BE2;"> </div>
                        
                        <div class="d-flex flex-column mr-4" style="max-height: 125px;">
                            <p style="font-size: larger; font-weight: bold;">{{ note.title }}</p>
                            <p v-html="formatLineBreak(note.description)" style="overflow-y: scroll; scrollbar-width: none;"></p>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-column justify-space-between">
                    <div class="d-flex justify-end">
                        <v-icon @click="reportStore.removeNoteDialog = true , reportStore.reportId = note.id " :size="25" class="hover-red"  icon="mdi-close-circle-outline"></v-icon>
                    </div>

                    <div>
                      <p style="color: gray; font-weight: bold ; white-space: nowrap; " dir="ltr">{{ timeSince(note.creationDate) }}</p>
                     </div>
                  </div>
                </div>
            </div>

    <!-- add report -->
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
                <v-text-field :rules="[required]" v-model="reportStore.report.title" dir="rtl" variant="outlined"></v-text-field>
            </div>

            <div style="height: 170px;">
                <p style="font-size: large;" class="mr-1">الوصف</p>
                <v-textarea no-resize shaped rows="3"  variant="outlined" :rules="[required]" v-model="reportStore.report.description" dir="rtl" style="height:100% "></v-textarea>
            </div>

            <div >
                <p style="font-size: large;" class="mr-1">الملحقات</p>
                <v-file-input variant="outlined" type="file" accept="image/*" id="upload" multiple  @change="reportStore.handleimg"></v-file-input>
                <!-- <v-file-input v-model="reportStore.file" @change="reportStore.handleFile" accept="image/*" prepend-icon="none" dir="rtl" variant="outlined" style="height:100% "></v-file-input> -->
            </div>
       
        </div>
        <v-btn size="large" @click="reportStore.addReport()" :loading="reportStore.loading">نشر</v-btn>
      </v-card>
    </v-dialog>


    <!-- edit report -->
    <v-dialog
      v-model="reportStore.editReportDialog"
      width="auto"
    >
      <v-card
      dir="rtl"
      class="elevation-13 pa-4 "
      style="color: black; background-color: white;"
      width="600">

   
    
      <v-card-title class="text-center d-flex justify-space-between" style="width: 100%;">
        <div class="mx-5"></div>
              <span class="text-h5 text-center">تعديل تبليغ</span>
           
             
                
            <v-btn style="background-color: white;" variant="none" @click="reportStore.editReportDialog = false , index = 0">
                <v-icon
                  color="black"
                  icon="mdi-close"
                  :size="30"
                ></v-icon>
              </v-btn>
            </v-card-title>

            <v-divider></v-divider>


        <div class="mt-4">
          <div class="d-flex" v-if="reportStore.editReportInfo.attachment.length > 0" >
            <v-btn v-if="reportStore.editReportInfo.attachment.length >= 1" variant="outlined" class="my-auto" icon="mdi-menu-right" @click="changeIndex(index--)"></v-btn>
            <div class="d-flex justify-center mx-4" style="width: 100%; height: 180px;">
              <img v-if="reportStore.editReportInfo.attachment.length > 0" :src="`https://mwo88k4ckooocck004o0cgk8.158.220.126.158.sslip.io//${reportStore.editReportInfo.attachment[index]}`" class="rounded-lg" style="max-width: 300px; max-height: 250px; min-height: 120px; background-color: aqua; object-fit: cover;"> 
               
              
            </div>
            <v-btn v-if="reportStore.editReportInfo.attachment.length >= 1" class="my-auto" variant="outlined" icon="mdi-menu-left" @click="changeIndex(index++)"></v-btn>
             
          </div>
            <div>
                <p style="font-size: 19px;" class="mr-1">العنوان</p>
                <v-text-field :rules="[required]" v-model="reportStore.editReportInfo.title" dir="rtl" variant="outlined"></v-text-field>
            </div>

            <div style="height: 170px;">
                <p style="font-size: 19px;" class="mr-1">الوصف</p>
                <v-textarea no-resize shaped rows="3" :rules="[required]" v-model="reportStore.editReportInfo.description" dir="rtl" variant="outlined" style="height:100%;"></v-textarea>
            </div>

        </div>
        <div class="d-flex" dir="ltr" >
            <v-btn size="large" rounded="xl"  style="width: 100px;" @click="reportStore.editReport()" :loading="reportStore.loading">نشر</v-btn>
        </div>
      </v-card>
    </v-dialog>


    <!-- remove Dialog -->
    <v-dialog
      v-model="reportStore.removeNoteDialog"
      width="auto"
    >
      <v-card
      dir="rtl"
      class="elevation-13 pa-4 "
      style="color: black; background-color: white;"
      width="600">

   
    
      <v-card-title class="text-center d-flex justify-space-between" style="width: 100%;">
        <div class="mx-5"></div>

           
             
                
            <v-btn style="background-color: white;" variant="none" @click="reportStore.removeNoteDialog = false">
                <v-icon
                  color="black"
                  icon="mdi-close"
                  :size="30"
                ></v-icon>
              </v-btn>
            </v-card-title>

            <div class="d-flex  justify-center flex-column align-center" style="width: 100%; " >
              <div class="mb-5">
              <v-icon
              style="border: 4px red solid; border-radius: 50px; background-color: pink; color: red"
              
              icon="mdi-exclamation"
              :size="80"
              ></v-icon>
            </div>
              <div class="d-flex flex-column text-center">
                <p style="font-size: 28px; font-weight: bold">هل انت متاكد؟</p>
                <p class="mb-4" style="color: gray; font-weight: bold;">سيتم حذف التبليغ</p>

                <v-btn @click="reportStore.deleteReport()" :loading="reportStore.loading" class="mb-2" variant="flat" rounded="lg" size="x-large" style="background-color: #FF7070;width: 300px;">
                   <span style="font-size: 22px;">تاكيد</span>
                </v-btn>

                <v-btn @click="reportStore.removeNoteDialog = false" rounded="lg" :loading="reportStore.loading" variant="flat" size="x-large" style="background-color: white ;width: 300px; color: black; border: 0.5px gray solid">
                   <span style="font-size: 22px;">الغاء</span>
                </v-btn>
              </div>
            </div>
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