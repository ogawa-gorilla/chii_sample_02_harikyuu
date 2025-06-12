import { weeklyClosedDays } from '@/app/constants/weeklyClosedDays'
import { useAppSelector } from '@/app/hooks'
import { ShiftDraft } from '@/app/types/shift'
import { validateShiftDraft } from '@/utils/validation/shiftValidation'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'
import { v4 } from 'uuid'
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
    const [temporalValues, setTemporalValues] = useState<ShiftDraft[]>([])

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

    const temporalHoliday = useAppSelector((state) =>
        state.shift.temporalHolidays.find((holiday) => holiday.date === today)
    )

    const [errors, setErrors] = useState<string[]>([])
    const [warnings, setWarnings] = useState<string[]>([])

    const { isHoliday, holidayReason } = useMemo(() => {
        if (weeklyClosedDays.includes(dayjs(today).format('d'))) {
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
    }, [today, temporalHoliday])

    useEffect(() => {
        const { errors, warnings } = validateShiftDraft(
            temporalValues,
            isHoliday,
            holidayReason
        )
        setErrors(errors)
        setWarnings(warnings)
    }, [temporalValues, isHoliday, holidayReason])

    if (isHoliday && shiftsAtDay.length === 0) {
        return <ClosedDaysCard reason={holidayReason} />
    }

    const renderAddButton = () => {
        return (
            <Button
                variant="outline-primary"
                size="sm"
                onClick={handleAddShift}
            >
                シフト追加
            </Button>
        )
    }

    const commitEditing = (updatedEntries: ShiftDraft[]) => {
        console.log('commitEditing', updatedEntries)
        // dispatch update
        onUpdate(updatedEntries)
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

        const { errors: validationErrors } = validateShiftDraft(
            newTemporalValues,
            isHoliday,
            holidayReason
        )

        if (validationErrors.length === 0) {
            commitEditing(newTemporalValues)
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

        const { errors: validationErrors } = validateShiftDraft(
            newTemporalValues,
            isHoliday,
            holidayReason
        )

        if (validationErrors.length === 0) {
            commitEditing(newTemporalValues)
        }
    }

    const handleAddShift = () => {
        const newTemporalValues = [
            ...temporalValues,
            {
                startTime: '09:00',
                endTime: '18:00',
                id: v4(),
            },
        ]
        setTemporalValues(newTemporalValues)
        const { errors: validationErrors } = validateShiftDraft(
            newTemporalValues,
            isHoliday,
            holidayReason
        )
        if (validationErrors.length === 0) {
            commitEditing(newTemporalValues)
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
