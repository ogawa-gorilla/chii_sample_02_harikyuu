import { weeklyClosedDays } from '@/app/constants/weeklyClosedDays'
import { useAppSelector } from '@/app/hooks'
import { Shift } from '@/app/types/shift'
import dayjs from 'dayjs'
import { Button } from 'react-bootstrap'
import ClosedDaysCard from './ClosedDaysCard'
import ShiftCard from './ShiftCard'

interface ShiftCellProps {
    shiftsAtDay: Shift[]
    today: string
    isHoliday?: boolean
    holidayReason?: string
}

export default function ShiftCell({ shiftsAtDay, today }: ShiftCellProps) {
    const temporalHoliday = useAppSelector((state) =>
        state.shift.temporalHolidays.find((holiday) => holiday.date === today)
    )

    let isHoliday = false
    let holidayReason = ''
    if (weeklyClosedDays.includes(dayjs(today).format('d'))) {
        isHoliday = true
        holidayReason = '定休日'
    } else if (temporalHoliday) {
        isHoliday = true
        holidayReason = temporalHoliday.name
    }

    if (isHoliday && shiftsAtDay.length === 0) {
        return <ClosedDaysCard reason={holidayReason} />
    }

    const renderAddButton = () => {
        return (
            <Button variant="outline-primary" size="sm">
                シフト追加
            </Button>
        )
    }

    const handleStartTimeChange = (startTime: string) => {
        console.log(startTime)
    }
    const handleEndTimeChange = (endTime: string) => {
        console.log(endTime)
    }

    const errors: string[] = []
    if (shiftsAtDay.length === 2) {
        if (shiftsAtDay[0].endTime > shiftsAtDay[1].startTime) {
            errors.push('時間に重複があります。直してください')
        }
    }

    const renderShiftCards = () => {
        switch (shiftsAtDay.length) {
            case 0:
                return <div>{renderAddButton()}</div>
            case 1:
                return (
                    <div>
                        <ShiftCard
                            shiftNumber={1}
                            startTime={shiftsAtDay[0].startTime}
                            endTime={shiftsAtDay[0].endTime}
                            onStartTimeChange={handleStartTimeChange}
                            onEndTimeChange={handleEndTimeChange}
                            errors={errors}
                        />
                        {renderAddButton()}
                    </div>
                )
            case 2:
                return (
                    <div>
                        <ShiftCard
                            shiftNumber={1}
                            startTime={shiftsAtDay[0].startTime}
                            endTime={shiftsAtDay[0].endTime}
                            onStartTimeChange={handleStartTimeChange}
                            onEndTimeChange={handleEndTimeChange}
                            errors={errors}
                        />
                        <ShiftCard
                            shiftNumber={2}
                            startTime={shiftsAtDay[1].startTime}
                            endTime={shiftsAtDay[1].endTime}
                            onStartTimeChange={handleStartTimeChange}
                            onEndTimeChange={handleEndTimeChange}
                            errors={errors}
                        />
                    </div>
                )
        }
    }

    return <div className="p-1">{renderShiftCards()}</div>
}
