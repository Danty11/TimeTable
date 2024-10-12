<script setup lang="ts">

  import { getEnumByValue,statesType } from '../types/EnumDto';
import { useTableStore } from '../stores/store';

  const tableStore = useTableStore()

  tableStore.FetchTable()


  const dialog = ref(false)
  const startEdit = ref(true)

  const selectedData = ref({
    materialName:'',
    doctorName:'',
    studyHall:'',
    progress:'',
    state:''
  })


  const openDialog = (data: any) => {
    selectedData.value = data;
    dialog.value = true;
    console.log(selectedData.value.id)
  };

</script>

<template>
  <div class="ml-16 " style="width: 50%;">
          <v-table class="bg-white rounded-xl responsive-table elevation-13" style="border: 1px black solid">
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
                  <div class="d-flex flex-column align-center">
                    <span class="text-h6 font-weight-bold">5</span>
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
                  dir="rtl"
                    style="padding: 4px;border-left: 1px black solid; border-top: 1px black solid; min-width: 50%;"
                    v-if="data.materialName"
                    class="class-item"
                    :style="{ backgroundColor: data.color }"
                    @click="openDialog(data)"
                  >
                    <div class=" d-flex flex-column justify-space-between" style="height: 100%;">
                      <div v-if="data.state == 0"></div>
                      <div v-else class="position-absolute">
                        <v-chip size="x-small" :color="`${getEnumByValue(statesType,data.state).color}`" variant="tonal">
                          {{ getEnumByValue(statesType,data.state).arName }}
                        </v-chip>
                      </div>
                      <div class="d-flex justify-center">
                        <p class="text-center font-weight-bold mt-1" style=" max-width: 80% ; font-size: 22px;">{{ data.materialName }}</p>
                      </div>
                      <div class="d-flex justify-space-between font-weight-bold" >
                        <p style="max-width: 63%; overflow-x: hidden;" class="text-no-wrap" >{{ data.doctorName }} </p>
                        <p style="">{{ data.studyHall }}</p>
                      </div>
                    </div>
                  </td>
                  <td v-else class="class-item " style="border-left: 1px black solid; border-top: 1px black solid;" ></td>
                </template>
              </tr>
            </tbody>
          </v-table>
    <div>
      <v-dialog v-model="dialog" max-width="500px" class="rounded-xl">
        <v-card class="rounded-lg" style="background-color: white; color: black;">
          <div class="d-flex justify-space-between">
            
            <v-card-actions>
              <v-btn color="primary" @click="dialog = false">
                <v-icon
                  color="blue-grey"
                  icon="mdi-close"
                  size="large"
                ></v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-title>
              <span class="text-h5"> {{ selectedData.materialName }} </span>
            </v-card-title>

            <v-card-actions>
              <v-btn
                   @click="startEdit=!startEdit"
                    color="primary"> 
                  <v-icon 
                  
                  color="blue-grey"
                  :icon="startEdit == true ?'mdi-pencil-box-outline' : 'mdi-close'"
                  size="large"
                  ></v-icon> 
                </v-btn>
            
            </v-card-actions>
          </div>
          <v-card-text dir="rtl" class="d-flex flex-column" v-if="selectedData">

            <div class="d-flex ">
              <p class="mt-5 ml-2" style="font-weight: bold;">اسم التدريسي :</p>
              <v-text-field :disabled="startEdit" style="font-weight: bold;" v-model="selectedData.doctorName" dir="rtl" variant="underlined"></v-text-field>
            </div>

            <div class="d-flex ">
              <p class="mt-5 ml-2" style="font-weight: bold;"> القاعة :</p>
              <v-text-field :disabled="startEdit" style="font-weight: bold;" v-model="selectedData.studyHall" dir="rtl" variant="underlined"></v-text-field>
            </div>

            
            <div class="d-flex ">
              <p class="mt-5 ml-2" style="font-weight: bold;"> التقدم :</p>
              <v-text-field :disabled="startEdit" style="font-weight: bold;" v-model="selectedData.progress" dir="rtl" variant="underlined"></v-text-field>
            </div>

            <p class="text-right"><strong>الكوز :</strong> {{ getEnumByValue(statesType, selectedData.state).arName }}</p>

            <v-btn v-if="!startEdit" @click="tableStore.Editlesson(selectedData)" class="mt-2" size="large" variant="none" style="color: black; font-size: larger; font-weight: bold;">حفظ</v-btn>
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
