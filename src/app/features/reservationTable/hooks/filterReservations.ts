import { ReservationTableReservation } from '../types/ReservationTableReservation'

export const filterReservations = (
    reservations: ReservationTableReservation[],
    searchText: string
) => {
    return reservations.filter((r) => {
        return (
            searchText === '' ||
            r.client.includes(searchText) ||
            r.staff.name.includes(searchText) ||
            r.date.includes(searchText)
        )
    })
}
