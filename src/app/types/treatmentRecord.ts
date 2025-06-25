export interface TreatmentRecord {
    id: string
    client: string
    staffId: string
    date: string
    content: string
    attached_images: string[]
}

export interface TreatmentRecordSearchConditions {
    staffId: string
    searchText: string
}
