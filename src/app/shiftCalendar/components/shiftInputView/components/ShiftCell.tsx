import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useHolidayCheck } from '@/app/hooks/useHolidayCheck'
import {
    selectShiftDraftsForDay,
    updateShiftDraft,
} from '@/app/store/shiftSlice'
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

    const { isHoliday, holidayReason } = useHolidayCheck(date)

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
                            shiftsInGroup={shiftDraftsAtDay}
                            shiftDraft={shiftDraftsAtDay[0]}
                        />
                        {<AddButton onClick={() => handleAddShift(date)} />}
                    </div>
                )
            case 2:
                return (
                    <div key={shiftDraftsAtDay[0].id}>
                        <ShiftCard
                            shiftNumber={0}
                            shiftsInGroup={shiftDraftsAtDay}
                            shiftDraft={shiftDraftsAtDay[0]}
                        />
                        <ShiftCard
                            shiftNumber={1}
                            shiftsInGroup={shiftDraftsAtDay}
                            shiftDraft={shiftDraftsAtDay[1]}
                        />
                    </div>
                )
        }
    }

    return <div className="p-1">{renderShiftCards()}</div>
}
