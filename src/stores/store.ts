import { defineStore } from "pinia";
import axios from "../utils/axios";
import { Table } from "../types/type";
import { report } from "../types/reportsType";

export const useTableStore = defineStore('table-store',() => {
    const TableData = ref<Table[]>([])
    const ReportsData = ref<report[]>([])
    const fetchComplete = ref(false)

    const report =ref({
        title: "",
        description: "",
        attachment: [] ,
        mainAttachment: ""
    })

    const EditMaterial = ref({
        dayOfWeekId: "",
        materialName: "",
        doctorName: "",
        studyHall: "",
        color: "",
        description: "",
        progress: "",
        state: "",
        numberToOrder: "",
        attachment: [] 
    })

    const FetchTable = async () => {
        try {
            const res = await axios.get('dayofweek_table')
            TableData.value = res.data
          
        } catch (error) {
            console.log('error fetching data',error)
        }
    }

    const FetchReports = async () => {
        try {
            const res = await axios.get('reports')
            ReportsData.value = res.data.data    
            console.log(ReportsData.value)   
            fetchComplete.value = true
        } catch (error) {
            console.log('error fetching data',error)
        }
    }

    const AddReport = () =>{
        try {
            axios.post('reports',report)
            
        } catch (error) {
            console.log('error sending data',error)
        }
    }

    const Editlesson = (data:any) => {
        try {
            axios.put(`studymaterial/${data.id}`,data)

        } catch (error) {
            console.log(error,'error editing data')
        }
    }

    return{
        TableData,
        ReportsData,
        report,
        EditMaterial,
        fetchComplete,
        Editlesson,
        AddReport,
        FetchReports,
        FetchTable,
        
    }
})