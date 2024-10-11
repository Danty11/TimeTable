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
  