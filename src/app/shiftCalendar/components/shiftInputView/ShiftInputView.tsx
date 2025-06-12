import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useCalendar } from '@/app/hooks/useCalendar'
import {
    deleteShift,
    editShift,
    selectShiftsByStaffId,
} from '@/app/store/shiftSlice'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import ShiftCell from './components/ShiftCell'

interface ShiftInputViewProps {
    startDate: string
    staffId: string
    onClose: () => void
}

export default function ShiftInputView({
    startDate,
    staffId,
    onClose,
}: ShiftInputViewProps) {
    dayjs.locale('ja')

    const { days } = useCalendar()

    const shiftData = useAppSelector((state) =>
        selectShiftsByStaffId(state, staffId)
    )
    const dispatch = useAppDispatch()

    const [originalShiftData, setOriginalShiftData] = useState<
        {
            date: string
            startTime: string
            endTime: string
            id: string
        }[]
    >([])

    const [shiftDraft, setShiftDraft] = useState<
        {
            date: string
            startTime: string
            endTime: string
            id: string
        }[]
    >([])

    useEffect(() => {
        const filteredShifts = shiftData
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

        setShiftDraft(filteredShifts)
        setOriginalShiftData(filteredShifts)
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
        // 編集・作成したシフトの保存
        shiftDraft.forEach((shift) => {
            dispatch(editShift(shift))
        })
        // 削除されたものの削除
        const deletedShifts = originalShiftData.filter(
            (shift) => !shiftDraft.some((draft) => draft.id === shift.id)
        )
        deletedShifts.forEach((shift) => {
            dispatch(deleteShift(shift.id))
        })
        setOriginalShiftData([...shiftDraft])
        onClose()
    }

    const handleCancel = () => {
        setShiftDraft([...originalShiftData])
        onClose()
    }

    const handleDelete = (shiftId: string) => {
        const updatedDraft = shiftDraft.filter((shift) => shift.id !== shiftId)
        setShiftDraft(updatedDraft)
    }

    const hasChanges =
        JSON.stringify(shiftDraft) !== JSON.stringify(originalShiftData)

    return (
        <div style={{ paddingBottom: '80px' }}>
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
                    {days(startDate).map((day, index) => (
                        <tr key={day.format('YYYY-MM-DD')}>
                            {index === 0 ? (
                                <td
                                    style={{
                                        fontSize: '0.6rem',
                                        lineHeight: '1.2',
                                    }}
                                    rowSpan={7}
                                >
                                    <div>
                                        {dayjs(startDate)
                                            .format('YYYY')
                                            .slice(2)}
                                        <br />年
                                        <br />
                                        {dayjs(startDate).format('MM')}
                                        <br />月
                                    </div>
                                </td>
                            ) : (
                                ''
                            )}
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

            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    borderTop: '1px solid #dee2e6',
                    padding: '10px 0',
                    zIndex: 1000,
                    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <Container>
                    <Row>
                        <Col>
                            <div className="d-flex justify-content-center gap-3">
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleCancel}
                                >
                                    キャンセル
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleSave}
                                    disabled={!hasChanges}
                                >
                                    保存
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
