import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useCalendar } from '@/app/hooks/useCalendar'
import { editShift, selectShiftsByStaffId } from '@/app/store/shiftSlice'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import ShiftCell from './components/ShiftCell'

interface ShiftInputViewProps {
    startDate: string
    today: string
    staffId: string
}

export default function ShiftInputView({
    today,
    startDate,
    staffId,
}: ShiftInputViewProps) {
    dayjs.locale('ja')

    const { days } = useCalendar()

    const shiftData = useAppSelector((state) =>
        selectShiftsByStaffId(state, staffId)
    )
    const dispatch = useAppDispatch()

    const [shiftDraft, setShiftDraft] = useState<
        {
            date: string
            startTime: string
            endTime: string
            id: string
        }[]
    >([])

    useEffect(() => {
        setShiftDraft(
            shiftData
                .filter(
                    (shift) =>
                        shift.date >= startDate &&
                        shift.date <=
                            dayjs(startDate).add(6, 'day').format('YYYY-MM-DD')
                )
                .map((shift) => ({
                    date: shift.date,
                    startTime: shift.startTime,
                    endTime: shift.endTime,
                    id: shift.id,
                }))
        )
    }, [shiftData])

    const handleUpdate = (
        temporalValues: {
            startTime: string
            endTime: string
            id: string
        }[]
    ) => {
        const updatedDraft = shiftDraft.map((shift) => {
            const targetIndex = temporalValues.findIndex(
                (value) => value.id === shift.id
            )
            if (targetIndex !== -1) {
                return {
                    ...shift,
                    startTime: temporalValues[targetIndex].startTime,
                    endTime: temporalValues[targetIndex].endTime,
                }
            }
            return shift
        })
        setShiftDraft(updatedDraft)
    }

    const handleSave = () => {
        shiftDraft.forEach((shift) => {
            dispatch(editShift(shift))
        })
    }

    const handleDelete = (shiftId: string) => {
        const updatedDraft = shiftDraft.filter((shift) => shift.id !== shiftId)
        setShiftDraft(updatedDraft)
    }

    return (
        <div>
            <Table
                bordered
                responsive
                className="w-100 text-center align-middle small"
            >
                <thead>
                    <tr>
                        <th style={{ width: '10%', fontSize: '0.7rem' }}>
                            年月
                        </th>
                        <th style={{ width: '10%', fontSize: '0.7rem' }}>日</th>
                        <th style={{ width: '80%', fontSize: '0.7rem' }}>
                            シフト
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {days.map((day, index) => (
                        <tr key={day.format('YYYY-MM-DD')}>
                            <td
                                style={{
                                    fontSize: '0.7rem',
                                    lineHeight: '1.2',
                                }}
                            >
                                {index === 0 ? (
                                    <>
                                        25
                                        <br />
                                        /06
                                    </>
                                ) : (
                                    ''
                                )}
                            </td>
                            <td
                                style={{
                                    fontSize: '0.7rem',
                                    lineHeight: '1.2',
                                }}
                            >
                                {dayjs(day).format('D')}
                                <br />({dayjs(day).format('ddd')})
                            </td>
                            <td className="p-0">
                                <ShiftCell
                                    shiftsAtDay={
                                        shiftDraft.filter(
                                            (shift) =>
                                                shift.date ===
                                                day.format('YYYY-MM-DD')
                                        ) || []
                                    }
                                    today={day.format('YYYY-MM-DD')}
                                    onUpdate={handleUpdate}
                                    onDelete={handleDelete}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
