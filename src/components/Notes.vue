<script setup lang="ts">
import { useTableStore } from '../stores/store';

const reportStore = useTableStore()

onMounted(async () => {
    await reportStore.FetchReports()
}) 

</script>

<template>
    <div>
        <div class="d-flex justify-space-between">
            <v-dialog  max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                    v-bind="activatorProps"
                    color="blue-lighten-5"
                    text="أضافه تبليغ"
                    variant="flat"
                    ></v-btn>
                </template>
                
                <template v-slot:default="{ isActive }">
                    <div  class="pa-4 rounded-xl" style="border: 1px black solid; background-color: black;" >
                        <div>
                            <v-text-field class="bg-variant" variant="outlined" label="العنوان" v-model="reportStore.report.title">
                                
                            </v-text-field>
                            
                            <v-text-field variant="outlined" label="الوصف" v-model="reportStore.report.description">
                                
                            </v-text-field>
                        </div>
                        <div>
                            <v-btn @click="reportStore.AddReport() , isActive.value = false">
                                اضافة
                            </v-btn>
                        </div>
                    </div>
                </template>
            </v-dialog>
            <p style="color: black;" class="text-h4 d-flex justify-center">التبليغات</p>
        </div>
        
        <div v-for="data in reportStore.ReportsData" class="d-flex justify-end rounded-xl pa-4 ga-4" style="background-color:whitesmoke ;color: black;">
            <div class="d-flex flex-column justify-space-between">
                <p class="text-right">{{ data.title }}</p>
                <p class="text-right">{{ data.description }}</p>
            </div>
            <div>
                {{ data.mainAttachment }}
            </div>
        </div>
    </div>
</template>