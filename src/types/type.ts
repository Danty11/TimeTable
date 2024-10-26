export interface Root {
    data: Table[][]
    pagesCount: number
    currentPage: number
    type: string
  }
  
  export interface Table {
    id: string
    deleted: boolean
    creationDate: string
    modifiedDate: string
    dayName: string
    studyMaterials: StudyMaterial[]
    numberToOrder: number
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
    dayOfWeekId: string
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

  export interface EditReportInfo {
    title: string
    description: string
    mainAttachment: string
    attachment: string[]
  }