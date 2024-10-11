<script setup lang="ts">

  import { getEnumByValue,statesType } from '../types/EnumDto';
import { useTableStore } from '../stores/store';

  const tableStore = useTableStore()

  tableStore.FetchTable()


  const dialog = ref(false)
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
  };

</script>

<template>
  <div>
    <v-container fluid >
      <v-responsive class=" elevation-13" style="border-radius: 20px;">
        <div class="table-wrapper">
          <v-table class="bg-white responsive-table">
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
                <td class="class-item" style="border-right: 1.5px black solid; border-top: 1px black solid;width: 5%;font-size: 14px;font-weight: bold;">
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
                        <p class="text-center font-weight-bold mt-1" style="font-size: 11.4px; max-width: 80% ">{{ data.materialName }}</p>
                      </div>
                      <div class="d-flex justify-space-between font-weight-bold" >
                        <p style="max-width: 63%; overflow-x: hidden; font-size: 8px" class="text-no-wrap" >{{ data.doctorName }} </p>
                        <p style="font-size: 8px;">{{ data.studyHall }}</p>
                      </div>
                    </div>
                  </td>
                  <td v-else class="class-item " style="border-left: 1px black solid; border-top: 1px black solid;" ></td>
                </template>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-responsive>
    </v-container>
    <div>
      <v-dialog v-model="dialog" max-width="500px" class="rounded-xl">
        <v-card>
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
              <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    color="primary"
                  > 
                  <v-icon 
                  color="blue-grey"
                  icon="mdi-pencil-box-outline"
                  size="large"
                  ></v-icon> </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="Dialog">
                    <v-card-text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        text="Close Dialog"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-card-actions>
          </div>
          <v-card-text v-if="selectedData">
            <p class="text-right"><strong>اسم التدريسي :</strong> {{ selectedData.doctorName  }}</p>
            <p class="text-right"><strong>القاعة :</strong> {{ selectedData.studyHall }}</p>
            <p class="text-right"><strong>التقدم :</strong> {{ selectedData.progress }}</p>
            <p class="text-right"><strong>الكوز :</strong> {{ getEnumByValue(statesType, selectedData.state).arName }}</p>
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
    height: fit-content;
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
