import { defineStore } from "pinia";
import axios from "../utils/axios";
import { EditReportInfo, NewSubject, Table } from "../types/type";
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
    const editReportInfo = ref<EditReportInfo>({} as EditReportInfo)
    const editReportDialog = ref(false)
    const singleSubjectId = ref()
    const removeNoteDialog = ref(false)

    const reportId = ref(0)
 

    
    // const EditMaterial = ref({
    //     dayOfWeekId: "",
    //     materialName: "",
    //     doctorName: "",
    //     studyHall: "",
    //     color: "",
    //     description: "",
    //     progress: "",
    //     state: "",
    //     numberToOrder: "",
    //     attachment: [] 
    // })

    const FetchTable = async () => {
        try {
            const res = await axios.get('dayofweek_table/with-times')
            TableData.value = res.data
           await console.log(TableData.value)
          
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
        newSubject.value = {} as NewSubject
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

            const res = await axios.put(`studymaterial/${singleSubjectId.value}`,data)
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
            console.log(id)
        loading.value = true
       const res = await axios.delete(`studymaterial/${singleSubjectId.value}`)
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
            console.log(ReportsData.value)
        } catch (error) {
            console.log('error fetching data',error)
        }
    }

    
    const deleteReport = async () => {
        try{
        loading.value = true
       const res = await axios.delete(`reports/${reportId.value}`)
        await FetchReports()
        if(res.status == 200)
            toast.success("تم الحذف بنجاح")
        loading.value = false
        removeNoteDialog.value = false
}
catch(error)
{
    loading.value = false
    removeNoteDialog.value = false
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
        Array.from(file.value).forEach(file => image.append("files", file))
        // image.append("files[]", file.value)
        
        console.log(image.get("files"))
        const res = await axios.post( "file/multi" , image)
        console.log(res.data)
        report.value.attachment = []
      
       for(var i = 0 ; i < res.data.length ; i++)
       {
        report.value.attachment[i] = res.data[i].url
       }
        

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

        if(!report.value.description || !report.value.title)
        {
            toast.warning("العنوان و الوصف ميصير فارغ")
            loading.value = false
            return
        }
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
        console.log(error)
        reportsDialog.value = false
        loading.value = false
        report.value = {} as AddReport
    }
    }

    const editReport = async() => {
        try{
            loading.value = true
            const res =  await axios.put("reports/" + reportId.value , editReportInfo.value )
            await FetchReports()

            if(res.status == 200)
            {
             toast.success("تمت العملية بنجاح")
             editReportDialog.value = false
             loading.value = false
            }
        }
        catch(error){
            toast.warning("حدث خطاء ما")
            editReportDialog.value = false
            loading.value = false
           
        }
    } 



    return{
        TableData,
        file,
        loading,
        ReportsData,
        report,
        // EditMaterial,
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
        editReportInfo,
        editReportDialog,
        reportId,
        removeNoteDialog,
        singleSubjectId,
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
        editReport,
    }
})