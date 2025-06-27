import { User } from '@/app/types/user'

export interface ReservationTableReservation {
    id: string
    date: string
    time: string
    client: string
    staff: User
    recordId?: string
    notes?: string
}
