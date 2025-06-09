import { Reservation } from "@/app/types/reservation";

export function filterReservedAt(reservations: Reservation[], date: string, hour: number) {
  return reservations.filter((reservation) => isReservedAt(reservation, date, hour));
}

export function isReservedAt(reservation: Reservation, date: string, hour: number) {
  return reservation.date === date && reservation.time === hour.toString().padStart(2, '0') + ":00"
}
