import { defineStore } from "pinia";
import axios from "../utils/axios";
import { NewSubject, Table } from "../types/type";
import { report, singleSubject } from "../types/reportsType";

export const useTableStore = defineStore('table-store',() => {
    const TableData = ref<Table[]>([])
    const ReportsData = ref<report[]>([])
    const newSubject = ref<NewSubject>({} as NewSubject)
    const fetchComplete = ref(false)
    const dialog = ref(false)
    const newSubjectDialog = ref(false)
    const startEdit = ref(true)
    const singleSubject = ref<singleSubject>({} as singleSubject)
   
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
        const res = await axios.post("studymaterial" , newSubject.value)
         await FetchTable()
         if(res.status == 200)
            alert("تمت العملية بنجاح")
         newSubjectDialog.value = false

    }
    const Editlesson = async (data:any) => {
        try {
            const res = await axios.put(`studymaterial/${data.id}`,data)
           await FetchTable()
           if(res.status == 200)
            alert("تمت العملية بنجاح")
           startEdit.value = true
           dialog.value = false
        } catch (error) {
            console.log(error,'error editing data')
        }
    }

    const removeSubject = async(id: any) => {
       const res = await axios.delete(`studymaterial/${id}`)
        await FetchTable()
        if(res.status == 200)
            alert("تمت العملية بنجاح")

        startEdit.value = true
           dialog.value = false

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
    
    const deleteReport = async (id:any) => {
       const res = await axios.delete(`reports/${id}`)
        await FetchReports()
        if(res.status == 200)
            alert("تمت العملية بنجاح")
    }



    return{
        TableData,
        ReportsData,
        report,
        EditMaterial,
        fetchComplete,
        singleSubject,
        newSubject,
        dialog,
        startEdit,
        newSubjectDialog,
        Editlesson,
        fetchSingleSubject,
        AddReport,
        FetchReports,
        FetchTable,
        addNewSubject,
        removeSubject,
        deleteReport,
    }
})