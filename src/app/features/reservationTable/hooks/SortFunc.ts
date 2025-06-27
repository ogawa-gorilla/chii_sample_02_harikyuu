import dayjs from 'dayjs'
import { ReservationTableReservation } from '../types/ReservationTableReservation'

export const SortKey = {
    DATE_ASC: 'date_asc',
    DATE_DESC: 'date_desc',
    CLIENT_ASC: 'client_asc',
    CLIENT_DESC: 'client_desc',
    STAFF_ASC: 'staff_asc',
    STAFF_DESC: 'staff_desc',
} as const
export type SortKey = (typeof SortKey)[keyof typeof SortKey]

export const sortFunc =
    (sortKey: SortKey) =>
    (a: ReservationTableReservation, b: ReservationTableReservation) => {
        if (sortKey === SortKey.DATE_ASC) {
            return dayjs(a.date).diff(dayjs(b.date))
        } else if (sortKey === SortKey.DATE_DESC) {
            return dayjs(b.date).diff(dayjs(a.date))
        } else if (sortKey === SortKey.CLIENT_ASC) {
            return a.client.localeCompare(b.client)
        } else if (sortKey === SortKey.CLIENT_DESC) {
            return b.client.localeCompare(a.client)
        } else if (sortKey === SortKey.STAFF_ASC) {
            return a.staff.name.localeCompare(b.staff.name)
        } else if (sortKey === SortKey.STAFF_DESC) {
            return b.staff.name.localeCompare(a.staff.name)
        } else {
            return 0
        }
    }
