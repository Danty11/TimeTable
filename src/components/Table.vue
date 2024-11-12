<script setup lang="ts">

import { getEnumByValue,statesType } from '../types/EnumDto';
import { useTableStore } from '../stores/store';
import { NewSubject } from '@/types/type';

  const tableStore = useTableStore()

  tableStore.FetchTable()

  const download = (link: any) => {
    window.open(`http://mwo88k4ckooocck004o0cgk8.158.220.126.158.sslip.io/${link}`)
  }
  const days = [
    {
      day:'الاحد',
      id:'da3c96a1-9bf4-4755-a283-3696b82a8b67'
    },
    {
      day:'الاثنين',
      id:'ffc9b5d6-7410-4101-941f-d4b13c0c4e2b'
    },
    {
      day:'الثلاثاء',
      id:'8a99f63c-6975-4dbf-a72c-d37bb1f42e27'
    },
    {
      day:'الاربعاء',
      id:'18056d73-329f-49f3-a7d1-885c15692641'
    },
    {
      day:'الخميس',
      id:'32178ff1-cd65-4eda-bd10-c848442eaa1b'
    },
  ]

  const openDialog = async (data: any) => {
    tableStore.singleSubject = data
    tableStore.dialog = true;
    tableStore.file = []
  };

</script>

<template>

  <div class=" d-flex justify-center py-4 mr-4 mt-12" style="width: 100%; height: fit-content">
   
          <v-table class="bg-white rounded-xl  elevation-13" style="border: 1px black solid; width: 90%;">
            <thead class="">
              <tr>
                <th style="border-right: 1.5px black solid; border-bottom: 1.5px black solid;"></th>
                <th style="border-bottom: 1.5px black solid;border-left: 1px black solid;">
                  <div class="d-flex flex-column align-center">
                    <span class="text-h6 font-weight-bold">1</span>
                    <span class="text-caption text-no-wrap">10:00-12:00</span>
                  </div>
                </th>
                <th style="border-left: 1px black solid; border-bottom: 1.5px black solid;">
                  <div class="d-flex flex-column align-center">
                    <span class="text-h6 font-weight-bold">2</span>
                    <span class="text-caption text-no-wrap">12:00-2:00</span>
                  </div>
                </th>
                <th style=" border-left: 1px black solid; border-bottom: 1.5px black solid;">
                  <div class="d-flex flex-column align-center">
                    <span class="text-h6 font-weight-bold">3</span>
                    <span class="text-caption text-no-wrap">2:00-4:00</span>
                  </div>
                </th>
                <th style="border-left: 1px black solid; border-bottom: 1.5px black solid;">
                  <div class="d-flex flex-column align-center">
                    <span class="text-h6 font-weight-bold">4</span>
                    <span class="text-caption text-no-wrap">4:00-6:00</span>
                  </div>
                </th>
                <th style="border-bottom: 1.5px black solid;border-left: 1px black solid;">
                
                 
                  <div class="d-flex flex-column align-center" >
                
                    <span  class="text-h6 font-weight-bold">5</span>
                    <span class="text-caption text-no-wrap">6:00-8:00</span>
                  
                  </div>
                  
                  
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="day in tableStore.TableData" >
                <td class="class-item" style="border-right: 1.5px black solid; border-top: 1px black solid;width: 5%;font-size: 18px;font-weight: bold;">
                  <span class="d-flex justify-center">
                    {{ day.dayName }}
                  </span>
                </td>
                <template v-for="( data, index) in day.studyMaterials" :key="index">
                  <td
                 
                    style="padding: 4px;border-left: 1px black solid; border-top: 1px black solid; min-width: 50%; min-height: 250px; max-height: 81px; max-width: 140px"
                    v-if="data.materialName"
                    class="class-item"
                    :style="{ backgroundColor: data.color }"
                    @click="openDialog(data)"
                  >
                 
                    <div  dir="rtl" class=" d-flex flex-column justify-space-between" style="height: 100%;">
                      <div></div>
                      <div class="position-absolute" v-if="data.state == 0"></div>
                      <div class="" v-else >
                        <v-chip class="position-absolute" size="x-small" variant="flat" :color="`${getEnumByValue(statesType,data.state).color}`">
                          {{ getEnumByValue(statesType,data.state).name }}
                        </v-chip>
                      </div>
                      <div class="d-flex justify-center">
                        <p class="text-center font-weight-bold mt-auto pr-2" style=" max-width: 80% ; min-height: 80px; font-size: 20px;">{{ data.materialName }}</p>
                      </div>
                      <div class="d-flex justify-space-between font-weight-bold" >
                        <p style="max-width: 63%; overflow-x: hidden;" class="text-no-wrap" >{{ data.doctorName }} </p>
                        <p style="">{{ data.studyHall }}</p>
                      </div>
                    </div>
                  </td>
                  <td v-else class="class-item" @click="tableStore.newSubjectDialog = true , tableStore.newSubject = {} as NewSubject ,tableStore.newSubject.dayOfWeekId = day.id , tableStore.newSubject.numberToOrder = data.numberToOrder" style="border-left: 1px black solid; border-top: 1px black solid;  height: 100px;" ></td>
                </template>
              </tr>
            </tbody>
          </v-table> 
       
    <div>

      <!-- edit subject  dialog -->
      <v-dialog v-model="tableStore.dialog" :max-width="tableStore.startEdit == true ? '550px' : '650px' " class="rounded-xl ">
        <v-card class="rounded-lg" style="background-color: white; color: black; overflow-y:scroll ; scrollbar-width: none;">

          <div v-if="tableStore.startEdit" class="d-flex justify-space-between">
            <v-card-actions>
              <v-btn color="primary" @click="tableStore.dialog = false , tableStore.file = []">
                <v-icon
                  color="blue-grey"
                  icon="mdi-close"
                  :size="28"
                ></v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-title>
              <span class="text-h5"> {{ tableStore.singleSubject.materialName }} </span>
            </v-card-title>
          

            <v-card-actions>
              <v-btn
                   @click="tableStore.startEdit= !tableStore.startEdit"
                    color="primary"> 
                  <v-icon 
                  
                  color="blue-grey"
                  :icon="tableStore.startEdit == true ?'mdi-pencil-box-outline' : 'mdi-close'"
                  :size="28"
                  ></v-icon> 
                </v-btn>
            
            </v-card-actions>
          </div>
       

          <div v-else class="d-flex justify-space-between px-2">
            <v-card-actions>
              <v-btn color="primary" @click="tableStore.startEdit = true">
                <v-icon
                  color="blue-grey"
                  icon="mdi-close"
                  :size="28"
                ></v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-title>
              <p style="font-size: 28px;"> تعديل </p>
            </v-card-title>
        
          </div>

          <div class="px-5">
          <v-divider></v-divider>
        </div>


          <v-card-text dir="rtl" class="d-flex flex-column px-4">

            <div v-if="tableStore.startEdit">
             

              <div class="d-flex  mb-7" style="font-size: 19px;">
                <div class="d-flex">
                  <p style="font-weight: bold; color: gray " class="ml-2">اسم التدريسي :</p>
                  <p style="font-weight: bold;" dir="rtl" variant="underlined">{{ tableStore.singleSubject.doctorName }}</p>
                </div>

                <div class="d-flex mr-8 ">
                  <p style="font-weight: bold;color: gray"> التقدم :</p>
                  <p style="font-weight: bold;" class="ml-2" dir="rtl" variant="underlined">{{ tableStore.singleSubject.progress }}</p>
                </div>
            </div>

            <div class="d-flex ga-8" style="font-size: 19px;" >
              <div class="d-flex ">
                <p  style="font-weight: bold; color: gray " class="ml-2"> القاعة :</p>
                <p  style="font-weight: bold;"  dir="rtl" variant="underlined"> {{ tableStore.singleSubject.studyHall }}</p>
              </div>

              <div class="d-flex mb-7 ">
                  <p  style="font-weight: bold; color: gray" class="ml-2"><strong>الحالة :</strong></p>
                  <p  style="font-weight: bold;" >{{ getEnumByValue(statesType,tableStore.singleSubject.state).arName }}</p>
                </div>
              </div>
              
              
                  <div class="d-flex" style="font-size: 19px">
                    <p  style="font-weight: bold; color: gray" class="ml-2"><strong>الملفات :</strong></p>
                    <div v-for="pdf in tableStore.singleSubject.attachment">
                      <div style="display: none">{{ pdf }}</div>
                      <v-icon v-if="!tableStore.startEdit " style="position: relative;" class="pb-5 pr-3" size="small" variant="text" icon="mdi-close-circle-outline"></v-icon>
                      <v-icon  @click="download(pdf)" size="large" icon="mdi-file-powerpoint"></v-icon>
                    </div>
                  </div>

              <div >
                <p class="mt-5 ml-2" style="font-weight: bold; color: gray; font-size: 19px;"> الملاحظات: </p>
                <p class="pa-2" style="font-weight: bold; border: 1px gray solid; border-radius: 10px;min-height: 80px" dir="rtl" variant="underlined"> {{ tableStore.singleSubject.description }}</p>
              </div>
          </div>

          <div class="d-flex ga-4" v-else>

            <div class=" d-flex flex-column mb-7 ga-6" style="font-size: 19px;">
              <div >
              <p class="mt-5 ml-2" style="font-weight: bold;">اسم المادة :</p>
              <v-text-field style="font-weight: bold; width: 300px; height: 50px;" v-model="tableStore.singleSubject.materialName" dir="rtl" variant="outlined" class="text-h5"></v-text-field>
            </div>

            <div>
              <p  style="font-weight: bold;">اسم التدريسي :</p>
              <v-text-field style="font-weight: bold; width: 300px; height: 50px;" v-model="tableStore.singleSubject.doctorName" dir="rtl" variant="outlined"></v-text-field>
            </div>

            <div>
                <p  style="font-weight: bold;" class="ml-2"> القاعة :</p>
                <v-text-field  style="font-weight: bold; width: 300px; height: 50px;" v-model="tableStore.singleSubject.studyHall" dir="rtl" variant="outlined"></v-text-field>
              </div>

              <div>
              <p style="font-weight: bold;"><strong>اليوم :</strong></p>
              <v-select style="font-weight: bold; width: 300px; height: 50px;" v-model="tableStore.singleSubject.dayOfWeekId" :items="days" item-value="id" item-title="day" variant="outlined"></v-select>
            </div>

              <div class=" d-flex">
              <p class=" ml-2" style="font-weight: bold; font-size: 19px;"> الملفات :</p>
              <div v-for="pdf,index in tableStore.singleSubject.attachment">
                 <p style="display: none;">{{ pdf }}</p>
                <v-icon @click="tableStore.deletePdf(index)" v-if="!tableStore.startEdit" style="position: relative;" class="pb-5 pr-3" size="small" variant="text" icon="mdi-close-circle-outline"></v-icon>
                <v-icon size="large" icon="mdi-file-powerpoint"></v-icon>   
             </div>

              <div >
                <div class="d-flex" >
                  <div v-for="pdf in tableStore.file">
                    <div style="display: none">{{ pdf }}</div>
                  <v-icon @click="tableStore.removePdfInEdit()" v-if="!tableStore.startEdit " style="position: relative;" class="pb-5 pr-3" size="small" variant="text" icon="mdi-close-circle-outline"></v-icon>
                  <v-icon size="large" icon="mdi-file-powerpoint"></v-icon>
                </div>
              
                <label class="mr-2" for="upload" style="cursor: pointer;">
              <v-icon size="large" icon="mdi-file-plus"></v-icon>
            </label>
          
                </div>
           
              
            </div>
             
              <v-file-input multiple type="file" accept=".pdf" id="upload" style="display: none;" @change="tableStore.handleFile"></v-file-input>
            </div>

            </div>

              <div class=" d-flex flex-column  ga-6">

                <div >
                  <p class="mt-5 ml-2" style="font-weight: bold; font-size: 19px"> التقدم :</p>
                  <v-text-field style="font-weight: bold; width: 300px; height: 50px;" v-model="tableStore.singleSubject.progress" dir="rtl" variant="outlined"></v-text-field>
                </div>

                <div >
                  <p  style="font-weight: bold; font-size: 19px"><strong>الحالة :</strong></p>
                  <v-select style="font-weight: bold; width: 300px; height: 50px;" v-model="tableStore.singleSubject.state" :items="statesType" item-title="arName" item-value="value" variant="outlined"></v-select>
                </div> 
 

                <div>
                  <p  style="font-weight: bold; font-size: 19px;"> الملاحظات: </p>
                  <v-text-field v-model="tableStore.singleSubject.description " style="font-weight: bold; width: 300px; height: 50px;" dir="rtl" variant="outlined"> </v-text-field>
                </div>

                <div>
                    <p style="font-weight: bold; font-size: 19px;"><strong>المحاضرة :</strong></p>
                    <v-select style="font-weight: bold; width: 300px; height: 50px;" v-model="tableStore.singleSubject.numberToOrder" :disabled="tableStore.startEdit" :items="[1,2,3,4,5]"  variant="outlined"></v-select>
                 </div>

                 <div class="d-flex flex-column">
                  <p style="font-weight: bold; font-size: 19px;">اختار اللون :</p>
                  <v-expansion-panels v-if="!tableStore.startEdit" elevation="0" style="background-color: white; border: 0.5px gray solid">
                <v-expansion-panel style="background-color: white; color: black;" >
                  <v-expansion-panel-title> <span style="font-size: larger;">  </span> </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-color-picker style=" width: 250px"  v-model="tableStore.singleSubject.color" :modes="['hex']" hide-inputs></v-color-picker>
                  </v-expansion-panel-text>

                </v-expansion-panel>
              </v-expansion-panels> 
            </div>
              </div>
            
          </div>
 
            
            <div v-if="!tableStore.startEdit" class="d-flex justify-space-between ga-4" >
              <v-btn :loading="tableStore.loading" @click="tableStore.Editlesson(tableStore.singleSubject)" class="mt-2" size="large" variant="outlined" style="color: black; font-size: larger; font-weight: bold;">حفظ</v-btn>
              <v-btn :loading="tableStore.loading" @click="tableStore.removeSubject(tableStore.singleSubject.id)" class="mt-2 bg-red-accent-4" size="large"  color="danger" style=" font-size: larger; font-weight: bold;">احذف المادة</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>


      <!-- adding subject dialog -->
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

             
              

                <v-expansion-panels elevation="0" style="background-color: white; border: 0.5px gray solid">
              <v-expansion-panel style="background-color: white; color: black;" >
                <v-expansion-panel-title> <span style="font-size: larger;">اختار اللون :</span> </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-color-picker  v-model="tableStore.newSubject.color" :modes="['hex']" hide-inputs></v-color-picker>
                </v-expansion-panel-text>

              </v-expansion-panel>
            </v-expansion-panels>

            <v-btn  @click="tableStore.addNewSubject()"  :loading="tableStore.loading" class="mt-2" size="large" variant="outlined" style="color: black; font-size: larger; font-weight: bold;">اضافة</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>

</template>


<style scoped>
.table-wrapper {
  width: 100%;
  display: block;
}

.class-item{
  width: 15%;
}
/* For mobile screens, scale down the table and content */
@media (max-width: 500px) {
  .table-wrapper {
    height: 100%;
    width: 145%;
    display: block;
 
}
  .responsive-table {
    
    
    transform: scale(0.69); /* Scale down the entire table */
    transform-origin: top left; /* Make sure it scales from the top left */
    width: 100%; /* Ensure the table container fits the screen width */
  }

  .class-item {
    width: 19%;
    font-size: 10px; /* Reduce font size */
    padding: 2px;    /* Reduce padding */
  }

  th, td {
    padding: 4px;    /* Make headers smaller */
    font-size: 10px;
  }

  v-table {
    font-size: 10px;
  }
}
</style>
