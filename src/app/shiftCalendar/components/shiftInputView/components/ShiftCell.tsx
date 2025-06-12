import { weeklyClosedDays } from '@/app/constants/weeklyClosedDays'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
    markDraftError,
    selectShiftDraftsForDay,
    unmarkDraftError,
    updateShiftDraft,
} from '@/app/store/shiftSlice'
import { validateShiftDraftGroup } from '@/utils/validation/shiftValidation'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { v4 } from 'uuid'
import AddButton from './AddButton'
import ClosedDaysCard from './ClosedDaysCard'
import ShiftCard from './ShiftCard'

interface ShiftCellProps {
    date: string
}

export default function ShiftCell({ date }: ShiftCellProps) {
    const dispatch = useAppDispatch()

    // storeから直接草稿データを取得
    const shiftDraftsAtDay = useAppSelector((state) =>
        selectShiftDraftsForDay(state, date)
    )

    const temporalHoliday = useAppSelector((state) =>
        state.shift.temporalHolidays.find((holiday) => holiday.date === date)
    )

    const { isHoliday, holidayReason } = useMemo(() => {
        if (weeklyClosedDays.includes(dayjs(date).format('d'))) {
            return {
                isHoliday: true,
                holidayReason: '定休日',
            }
        } else if (temporalHoliday) {
            return {
                isHoliday: true,
                holidayReason: '臨時休業日',
            }
        }
        return {
            isHoliday: false,
            holidayReason: '',
        }
    }, [date, temporalHoliday])

    if (isHoliday && shiftDraftsAtDay.length === 0) {
        return <ClosedDaysCard reason={holidayReason} />
    }

    const handleAddShift = (date: string) => {
        dispatch(
            updateShiftDraft({
                startTime: '09:00',
                endTime: '18:00',
                id: v4(),
                date: date,
            })
        )
    }

    const { errors, warnings } = validateShiftDraftGroup(
        shiftDraftsAtDay,
        isHoliday,
        holidayReason
    )
    if (errors.length > 0) {
        shiftDraftsAtDay.forEach((shift) => {
            dispatch(markDraftError(shift.id))
        })
    } else {
        shiftDraftsAtDay.forEach((shift) => {
            dispatch(unmarkDraftError(shift.id))
        })
    }

    const renderShiftCards = () => {
        switch (shiftDraftsAtDay.length) {
            case 0:
                return (
                    <div>
                        <AddButton onClick={() => handleAddShift(date)} />
                    </div>
                )
            case 1:
                return (
                    <div key={shiftDraftsAtDay[0].id}>
                        <ShiftCard
                            shiftNumber={0}
                            initialShift={shiftDraftsAtDay[0]}
                            errors={errors}
                            warnings={warnings}
                        />
                        {<AddButton onClick={() => handleAddShift(date)} />}
                    </div>
                )
            case 2:
                return (
                    <div key={shiftDraftsAtDay[0].id}>
                        <ShiftCard
                            shiftNumber={0}
                            initialShift={shiftDraftsAtDay[0]}
                            errors={errors}
                            warnings={warnings}
                        />
                        <ShiftCard
                            shiftNumber={1}
                            initialShift={shiftDraftsAtDay[1]}
                            errors={errors}
                            warnings={warnings}
                        />
                    </div>
                )
        }
    }

    return <div className="p-1">{renderShiftCards()}</div>
}
