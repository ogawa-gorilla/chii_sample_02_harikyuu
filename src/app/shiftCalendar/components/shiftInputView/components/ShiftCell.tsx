import { weeklyClosedDays } from '@/app/constants/weeklyClosedDays'
import { useAppSelector } from '@/app/hooks'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import ClosedDaysCard from './ClosedDaysCard'
import ShiftCard from './ShiftCard'

interface ShiftCellProps {
    shiftsAtDay: {
        date: string
        startTime: string
        endTime: string
        id: string
    }[]
    today: string
    isHoliday?: boolean
    holidayReason?: string
    onUpdate: (
        temporalValues: {
            startTime: string
            endTime: string
            id: string
        }[]
    ) => void
    onDelete: (shiftId: string) => void
}

export default function ShiftCell({
    shiftsAtDay,
    today,
    onUpdate,
    onDelete,
}: ShiftCellProps) {
    const [temporalValues, setTemporalValues] = useState<
        {
            startTime: string
            endTime: string
            id: string
        }[]
    >([])

    useEffect(() => {
        setTemporalValues(
            shiftsAtDay.map((shift) => {
                return {
                    startTime: shift.startTime,
                    endTime: shift.endTime,
                    id: shift.id,
                }
            })
        )
    }, [shiftsAtDay])

    useEffect(() => {
        const errors: string[] = []
        const warnings: string[] = []

        if (temporalValues.length === 2) {
            if (temporalValues[0].endTime > temporalValues[1].startTime) {
                errors.push('時間に重複があります。直してください')
            }
        }

        if (isHoliday) {
            warnings.push(holidayReason + 'です。')
        }
        temporalValues.forEach((value) => {
            if (value.startTime > value.endTime) {
                errors.push('開始時間が終了時間より後です。直してください')
            }

            if (value.startTime < '09:00' || value.startTime > '18:00') {
                warnings.push('開始時間が時間外です')
            }

            if (value.endTime < '09:00' || value.endTime > '18:00') {
                warnings.push('終了時間が時間外です')
            }
        })
        setErrors(errors)
        setWarnings(warnings)
    }, [temporalValues])

    const temporalHoliday = useAppSelector((state) =>
        state.shift.temporalHolidays.find((holiday) => holiday.date === today)
    )

    const [errors, setErrors] = useState<string[]>([])
    const [warnings, setWarnings] = useState<string[]>([])

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

    const commitEditing = (updatedEntry: {
        startTime: string
        endTime: string
        id: string
    }) => {
        // dispatch update
        onUpdate([updatedEntry])
    }

    const handleStartTimeChange = (shiftNumber: number, startTime: string) => {
        console.log('handleStartTimeChange', shiftNumber, startTime)
        const newTemporalValues = temporalValues.map((value, index) => {
            if (index === shiftNumber) {
                return {
                    ...value,
                    startTime: startTime,
                }
            }
            return value
        })
        setTemporalValues(newTemporalValues)
        if (errors.length === 0) {
            commitEditing(newTemporalValues[shiftNumber])
        }
    }
    const handleEndTimeChange = (shiftNumber: number, endTime: string) => {
        const newTemporalValues = temporalValues.map((value, index) => {
            if (index === shiftNumber) {
                return {
                    ...value,
                    endTime: endTime,
                }
            }
            return value
        })
        setTemporalValues(newTemporalValues)
        if (errors.length === 0) {
            commitEditing(newTemporalValues[shiftNumber])
        }
    }

    const handleDelete = (shiftNumber: number) => {
        onDelete(temporalValues[shiftNumber].id)
    }
    const renderShiftCards = () => {
        switch (temporalValues.length) {
            case 0:
                return <div>{renderAddButton()}</div>
            case 1:
                return (
                    <div key={temporalValues[0].id}>
                        <ShiftCard
                            shiftNumber={0}
                            startTime={temporalValues[0].startTime}
                            endTime={temporalValues[0].endTime}
                            shiftId={temporalValues[0].id}
                            onStartTimeChange={handleStartTimeChange}
                            onEndTimeChange={handleEndTimeChange}
                            onDelete={handleDelete}
                            errors={errors}
                            warnings={warnings}
                        />
                        {renderAddButton()}
                    </div>
                )
            case 2:
                return (
                    <div key={temporalValues[0].id}>
                        <ShiftCard
                            shiftNumber={0}
                            startTime={temporalValues[0].startTime}
                            endTime={temporalValues[0].endTime}
                            shiftId={temporalValues[0].id}
                            onStartTimeChange={handleStartTimeChange}
                            onEndTimeChange={handleEndTimeChange}
                            onDelete={handleDelete}
                            errors={errors}
                            warnings={warnings}
                        />
                        <ShiftCard
                            shiftNumber={1}
                            startTime={temporalValues[1].startTime}
                            endTime={temporalValues[1].endTime}
                            shiftId={temporalValues[1].id}
                            onStartTimeChange={handleStartTimeChange}
                            onEndTimeChange={handleEndTimeChange}
                            onDelete={handleDelete}
                            errors={errors}
                            warnings={warnings}
                        />
                    </div>
                )
        }
    }

    return <div className="p-1">{renderShiftCards()}</div>
}
