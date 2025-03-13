export interface Root {
    data: report[]
    pagesCount: number
    currentPage: number
    type: string
  }
  
  export interface report {
    id: string
    deleted: boolean
    creationDate: string
    modifiedDate: string
    title: string
    description: string
    attachment: string[]
    mainAttachment: string
  }

  export interface singleSubject {
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
  
  export interface AddReport {
    title: string
    description: string
    attachment: string[]
    mainAttachment: string
  }
  
  
  