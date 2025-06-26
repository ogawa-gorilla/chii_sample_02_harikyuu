import { TreatmentRecord } from '@/app/types/treatmentRecord'

export interface DashboardReservation {
    id: string
    client: string
    date: string
    time: string
    record?: TreatmentRecord
}
