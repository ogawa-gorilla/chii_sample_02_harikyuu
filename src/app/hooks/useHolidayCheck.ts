import { useAppSelector } from '@/app/hooks'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { weeklyClosedDays } from '../constants/weeklyClosedDays'

export function useHolidayCheck(date: string) {
    const holidays = useAppSelector((state) =>
        state.shift.temporalHolidays.find((holiday) => holiday.date === date)
    )

    const { isHoliday, holidayReason } = useMemo(() => {
        if (weeklyClosedDays.includes(dayjs(date).format('d'))) {
            return {
                isHoliday: true,
                holidayReason: '定休日',
            }
        } else if (holidays) {
            return {
                isHoliday: true,
                holidayReason: '臨時休業日',
            }
        }
        return {
            isHoliday: false,
            holidayReason: '',
        }
    }, [date, holidays])

    return { isHoliday, holidayReason }
}
