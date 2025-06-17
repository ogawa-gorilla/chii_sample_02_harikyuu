import { Shift } from '../types/shift'

export function filterShiftsAtHour(
    shifts: Shift[],
    date: string,
    hour: number
) {
    return shifts.filter((shift) => isAvailableAt(shift, date, hour))
}

export function isAvailableAt(shift: Shift, date: string, hour: number) {
    return (
        shift.date === date &&
        shift.startTime <= hour.toString().padStart(2, '0') + ':00' &&
        shift.endTime >= hour.toString().padStart(2, '0') + ':00'
    )
}
