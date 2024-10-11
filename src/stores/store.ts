import { defineStore } from "pinia";
import axios from "../utils/axios";
import { Table } from "../types/type";
import { report } from "../types/reportsType";

export const useTableStore = defineStore('table-store',() => {
    const TableData = ref<Table[]>([])
    const ReportsData = ref<report[]>([])

    const report =ref({
        title: "",
        description: "",
        attachment: [] ,
        mainAttachment: ""
    })

    const EditMaterial = ref({
        dayOfWeekId: String,
        materialName: String,
        doctorName: String,
        studyHall: String,
        color: String,
        description: String,
        progress: String,
        state: String,
        numberToOrder: String,
        attachment: [] 
    })

    const FetchTable = async () => {
        try {
            const res = await axios.get('dayofweek_table')
            TableData.value = res.data
            console.log(res.data)
        } catch (error) {
            console.log('error fetching data',error)
        }
    }

    const FetchReports = async () => {
        try {
            const res = await axios.get('reports')
            ReportsData.value = res.data.data        
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

    const Editlesson = (data:any,isActive:any) => {
        try {
            axios.put(`studymaterial/${data.id}`,EditMaterial.value)
            isActive.value = false
            window.location.reload()
        } catch (error) {
            console.log(error,'error editing data')
        }
    }

    return{
        TableData,
        ReportsData,
        report,
        EditMaterial,
        Editlesson,
        AddReport,
        FetchReports,
        FetchTable,
        
    }
})