import { weeklyClosedDays } from '@/app/constants/weeklyClosedDays'
import { useAppSelector } from '@/app/hooks'
import { Shift } from '@/app/types/shift'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import ClosedDaysCard from './ClosedDaysCard'
import ShiftCard from './ShiftCard'

interface ShiftCellProps {
    shiftsAtDay: Shift[]
    today: string
    isHoliday?: boolean
    holidayReason?: string
    onUpdate: (
        temporalValues: {
            startTime: string
            endTime: string
            shiftId: string
        }[]
    ) => void
}

export default function ShiftCell({
    shiftsAtDay,
    today,
    onUpdate,
}: ShiftCellProps) {
    const [temporalValues, setTemporalValues] = useState<
        {
            startTime: string
            endTime: string
            shiftId: string
        }[]
    >([])

    useEffect(() => {
        setTemporalValues(
            shiftsAtDay
                .map((shift) => {
                    return {
                        startTime: shift.startTime,
                        endTime: shift.endTime,
                        shiftId: shift.id,
                    }
                })
                .sort((a, b) => a.shiftId.localeCompare(b.shiftId))
        )
    }, [shiftsAtDay])

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
        holidayReason = '臨時休業日'
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

    const errors: string[] = []
    if (shiftsAtDay.length === 2) {
        if (shiftsAtDay[0].endTime > shiftsAtDay[1].startTime) {
            errors.push('時間に重複があります。直してください')
        }
    }

    const warnings: string[] = []
    if (isHoliday) {
        warnings.push(holidayReason + 'です。')
    }

    const commitEditing = () => {
        // dispatch update
        onUpdate(temporalValues)
    }

    const handleStartTimeChange = (shiftNumber: number, startTime: string) => {
        setTemporalValues(
            temporalValues.map((value, index) => {
                if (index === shiftNumber) {
                    return {
                        ...value,
                        startTime: startTime,
                    }
                }
                return value
            })
        )
        if (errors.length > 0) {
            commitEditing()
        }
    }
    const handleEndTimeChange = (shiftNumber: number, endTime: string) => {
        setTemporalValues(
            temporalValues.map((value, index) => {
                if (index === shiftNumber) {
                    return {
                        ...value,
                        endTime: endTime,
                    }
                }
                return value
            })
        )
        if (errors.length > 0) {
            commitEditing()
        }
    }

    const renderShiftCards = () => {
        switch (temporalValues.length) {
            case 0:
                return <div>{renderAddButton()}</div>
            case 1:
                return (
                    <div key={temporalValues[0].shiftId}>
                        <ShiftCard
                            shiftNumber={0}
                            startTime={temporalValues[0].startTime}
                            endTime={temporalValues[0].endTime}
                            shiftId={temporalValues[0].shiftId}
                            onStartTimeChange={handleStartTimeChange}
                            onEndTimeChange={handleEndTimeChange}
                            errors={errors}
                            warnings={warnings}
                        />
                        {renderAddButton()}
                    </div>
                )
            case 2:
                return (
                    <div key={temporalValues[0].shiftId}>
                        <ShiftCard
                            shiftNumber={0}
                            startTime={temporalValues[0].startTime}
                            endTime={temporalValues[0].endTime}
                            shiftId={temporalValues[0].shiftId}
                            onStartTimeChange={handleStartTimeChange}
                            onEndTimeChange={handleEndTimeChange}
                            errors={errors}
                            warnings={warnings}
                        />
                        <ShiftCard
                            shiftNumber={1}
                            startTime={temporalValues[1].startTime}
                            endTime={temporalValues[1].endTime}
                            shiftId={temporalValues[1].shiftId}
                            onStartTimeChange={handleStartTimeChange}
                            onEndTimeChange={handleEndTimeChange}
                            errors={errors}
                            warnings={warnings}
                        />
                    </div>
                )
        }
    }

    return <div className="p-1">{renderShiftCards()}</div>
}
