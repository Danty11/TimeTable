import { defineStore } from "pinia";
import axios from "../utils/axios";
import { NewSubject, Table } from "../types/type";
import { AddReport, report, singleSubject } from "../types/reportsType";
import { useToast } from "vue-toastification";

const toast = useToast()

export const useTableStore = defineStore('table-store',() => {
    const file = ref<File[]>([])
    const TableData = ref<Table[]>([])
    const ReportsData = ref<report[]>([])
    const newSubject = ref<NewSubject>({} as NewSubject)
    const fetchComplete = ref(false)
    const dialog = ref(false)
    const newSubjectDialog = ref(false)
    const startEdit = ref(true)
    const image = new FormData()
    const pdf = new FormData()
    const singleSubject = ref<singleSubject>({} as singleSubject)
    const reportsDialog = ref(false)
    const report =ref<AddReport>({} as AddReport)
    const editTable = ref(false)
    const fileAdded = ref(false)
    const loading = ref(false)
    const deleteLoading = ref(false)
 

    
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

    

    const addNewSubject = async () => {
        try{
        loading.value = true
        if(file.value.length != 0)
            await newSubjectsendPdf()

        const res = await axios.post("studymaterial" , newSubject.value)
        
        await FetchTable()
         if(res.status == 200)
            toast.success("تمت الاضافة بنجاح")
         newSubjectDialog.value = false
         loading.value = false
}
catch(error)
{
    
    newSubjectDialog.value = false
    loading.value = false
    toast.success("حدث خطاء")
}

    }

    const Editlesson = async (data:any) => {
        try {
           loading.value = true
            if(file.value.length != 0)
                await sendPdf()

            const res = await axios.put(`studymaterial/${data.id}`,data)
           await FetchTable()
           

           if(res.status == 200)
            toast.success("تم التعديل بنجاح")
           startEdit.value = true
           dialog.value = false
           loading.value = false
        } catch (error) {
            startEdit.value = true
           dialog.value = false
           loading.value = false
           toast.warning("حدث خطاء ما")
        }
    }

    const removeSubject = async(id: any) => {
        try{
        loading.value = true
       const res = await axios.delete(`studymaterial/${id}`)
        await FetchTable()
        if(res.status == 200)
            toast.success("تمت الحذف بنجاح")

        startEdit.value = true
           dialog.value = false
           loading.value = false
}
catch(error){
    startEdit.value = true
       dialog.value = false
       loading.value = false
       toast.warning("حدث خطاء ما")
}

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

    
    const deleteReport = async (id:any) => {
        try{
        deleteLoading.value = true
       const res = await axios.delete(`reports/${id}`)
        await FetchReports()
        if(res.status == 200)
            toast.success("تم الحذف بنجاح")
        deleteLoading.value = false
}
catch(error)
{
    deleteLoading.value = false
    toast.warning('حدث خطاء ما')
}
        

    }

    const handleFile = async (event: any) => {

       
        console.log(event.target.files)
        file.value = event.target.files 
        fileAdded.value = true
        
        
}
    const deletePdf = (index: number) =>
    {
        singleSubject.value.attachment.splice(index ,1)
    }

    const removePdfInEdit = () =>
        {
            file.value = []
            fileAdded.value = false
        }

const handleimg = async (event: any) => {

       
    file.value = event.target.files
    console.log(file.value)
   
   
}

    const sendReportImage = async() => {

        image.append("files", file.value[0])
        console.log(image.get("files"))
        const res = await axios.post( "file/multi" , image)
        report.value.mainAttachment = res.data[0].url
        file.value = []
        image.delete("files")
    }
    const sendPdf = async() => {
    
                pdf.append("files", file.value[0])   
                
            
        const res = await axios.post( "file/multi" , pdf)
       
            singleSubject.value.attachment[0] = res.data[0].url
    
            file.value = []
            pdf.delete("files")
    }

    const newSubjectsendPdf = async() => {
      
    
                pdf.append("files", file.value[0])   
            
        const res = await axios.post( "file/multi" , pdf)
            
        newSubject.value.attachment = []
            newSubject.value.attachment[0] = res.data[0].url
    
            file.value = []
    }

    const addReport = async() => {
try{


        loading.value = true
        if(file.value.length != 0)
            { 
                await sendReportImage()
            }
        
      const res =  await axios.post("reports" , report.value)

       await FetchReports()
       if(res.status == 200)
       {
        toast.success("تمت العملية بنجاح")
       }
     
     
       reportsDialog.value = false
        loading.value = false
        report.value = {} as AddReport
    }
    catch(error)
    {
        toast.warning("حدث خطاء ما")
        reportsDialog.value = false
        loading.value = false
        report.value = {} as AddReport
    }
    }



    return{
        TableData,
        file,
        loading,
        ReportsData,
        report,
        EditMaterial,
        fetchComplete,
        singleSubject,
        newSubject,
        dialog,
        startEdit,
        newSubjectDialog,
        reportsDialog,
        editTable,
        deleteLoading,
        fileAdded,
        Editlesson,
        FetchReports,
        FetchTable,
        addNewSubject,
        removeSubject,
        deleteReport,
        handleFile,
        addReport,
        handleimg,
        deletePdf,
        removePdfInEdit,
    }
})