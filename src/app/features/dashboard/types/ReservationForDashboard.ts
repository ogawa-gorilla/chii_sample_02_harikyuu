import { TreatmentRecord } from '@/app/types/treatmentRecord'

export interface ReservationForDashboard {
    id: string
    client: string
    date: string
    record?: TreatmentRecord
}
