import { Reservation } from './reservation'

export interface TreatmentRecord {
    id: string
    client: string
    staffId: string
    date: string
    content: string
    attached_images: string[]
    for_reservation: Reservation
}

export interface TreatmentRecordSearchConditions {
    staffId: string
    searchText: string
}
