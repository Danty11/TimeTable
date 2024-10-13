import { defineStore } from "pinia";
import axios from "../utils/axios";
import { NewSubject, Table } from "../types/type";
import { report, singleSubject } from "../types/reportsType";

export const useTableStore = defineStore('table-store',() => {
    const TableData = ref<Table[]>([])
    const ReportsData = ref<report[]>([])
    const newSubject = ref<NewSubject>({} as NewSubject)
    const fetchComplete = ref(false)
   
   
    const report =ref({
        title: "",
        description: "",
        attachment: [] ,
        mainAttachment: ""
    })

    const singleSubject = ref<singleSubject>({} as singleSubject)
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
            console.log(TableData.value)
          
        } catch (error) {
            console.log('error fetching data',error)
        }
    }

    const fetchSingleSubject = async(id:number ) => {
        try{
            const res = await axios.get(`studymaterial/${id}` )
            singleSubject.value = res.data
            console.log(singleSubject.value)
        }
        catch (error) {
            console.log('error fetching data',error)
        }
    }
    const addNewSubject = async () => {
         await axios.post("studymaterial" , newSubject.value)
         await FetchTable()
    }

    const removeSubject = async(id: any) => {
        await axios.delete(`studymaterial/${id}`)
        await FetchTable()
    }

    const FetchReports = async () => {
        try {
            const res = await axios.get('reports')
            ReportsData.value = res.data.data     
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

    const Editlesson = async (data:any) => {
        try {
           await axios.put(`studymaterial/${data.id}`,data)
           await FetchTable()
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
        singleSubject,
        newSubject,
        Editlesson,
        fetchSingleSubject,
        AddReport,
        FetchReports,
        FetchTable,
        addNewSubject,
        removeSubject,
    }
})