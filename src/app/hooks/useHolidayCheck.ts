import { useAppSelector } from '@/app/hooks'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { weeklyClosedDays } from '../constants/weeklyClosedDays'
import { TimeIdentifier } from '../types/timeIdentifier'

export function useHolidayCheck(date: string | TimeIdentifier) {
    // TODO: 後方互換は消す
    if (typeof date === 'string') {
        date = {
            value: date,
            displayValue: date,
            type: 'date',
        }
    }
    const holidays = useAppSelector((state) =>
        state.shift.temporalHolidays.find(
            (holiday) => holiday.date === date.value
        )
    )

    const dayIdentifier =
        date.type === 'date' ? dayjs(date.value).format('d') : date.value

    const { isHoliday, holidayReason } = useMemo(() => {
        if (weeklyClosedDays.includes(dayIdentifier)) {
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
