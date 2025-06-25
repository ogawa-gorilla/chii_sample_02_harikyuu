import { User } from './user'

export interface Reservation {
    id: string
    staff: User
    client: string
    date: string
    time: string
    duration: 1 // 時間単位
    status: string
    notes: string
}

export interface ReservationFormData {
    staffId: string
    clientName: string
    notes: string
    date: string
    hour: string
}

// 作成画面に渡すプロパティ。一時的に使う値であって編集とかはしない
export interface ReservationCreateContext {
    date: string
    time: string
    staff: User
    availableStaffs: User[]
}

export const ReservationStatus = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
} as const

export type ReservationStatus =
    (typeof ReservationStatus)[keyof typeof ReservationStatus]
