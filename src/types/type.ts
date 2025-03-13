export interface Root {
    data: Table[][]
    pagesCount: number
    currentPage: number
    type: string
  }
  
  export interface Table {
    dayName: string
  times: Time[]
  numberToOrder: number
  id: string
  deleted: boolean
  creationDate: string
  }
  
  export interface Time {
    time: string
    studyMaterial: StudyMaterial
    numberToOrder: number
    id: string
    deleted: boolean
    creationDate: string
  }
  
  export interface StudyMaterial {
    id: string
    deleted: boolean
    creationDate: string
    modifiedDate: string
    dayOfWeekId: string
    dayOfWeek: string
    materialName: string
    doctorName: string
    studyHall: string
    color: string
    description: string
    progress: string
    state: number
    numberToOrder: number
    attachment: string[]
  }

  export interface NewSubject {
   
      timeId: string
      materialName: string
      doctorName: string
      studyHall: string
      color: string
      description: string
      progress: string
      state: number
      attachment: string[]
    
  }

  export interface EditReportInfo {
    title: string
    description: string
    mainAttachment: string
    attachment: string[]
  }
  
 