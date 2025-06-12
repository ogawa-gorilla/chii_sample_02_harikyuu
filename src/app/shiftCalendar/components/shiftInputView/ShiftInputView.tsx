import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useCalendar } from '@/app/hooks/useCalendar'
import {
    clearShiftDrafts,
    deleteShift,
    editShift,
    selectAllShiftDrafts,
    selectShiftsByStaffId,
    setShiftDrafts,
} from '@/app/store/shiftSlice'
import { ShiftDraft } from '@/app/types/shift'
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
    const shiftDrafts = useAppSelector(selectAllShiftDrafts)
    const dispatch = useAppDispatch()

    const [originalShiftData, setOriginalShiftData] = useState<ShiftDraft[]>([])

    const hasDraftsWithErrors = useAppSelector((state) =>
        state.shift.shiftDrafts.some((draft) => draft.hasError)
    )

    useEffect(() => {
        const filteredShifts = shiftData
            .filter(
                (shift) =>
                    shift.date >= startDate &&
                    shift.date <=
                        dayjs(startDate).add(6, 'day').format('YYYY-MM-DD') &&
                    staffId === shift.staffId
            )
            .map((shift) => ({
                date: shift.date,
                startTime: shift.startTime,
                endTime: shift.endTime,
                id: shift.id,
            }))

        // 確定シフトから草稿を作成
        const drafts = filteredShifts.map((shift) => ({
            ...shift,
            date: shift.date, // ShiftDraftには date が必要
        }))

        dispatch(setShiftDrafts(drafts))
        setOriginalShiftData(filteredShifts)
    }, [shiftData, startDate, dispatch])

    const handleSave = () => {
        // 草稿から確定シフトへ保存
        shiftDrafts.forEach((draft) => {
            dispatch(
                editShift({
                    id: draft.id,
                    date: draft.date,
                    startTime: draft.startTime,
                    endTime: draft.endTime,
                    staffId, // staffIdを追加
                })
            )
        })

        // 削除されたものの削除
        const deletedShifts = originalShiftData.filter(
            (shift) => !shiftDrafts.some((draft) => draft.id === shift.id)
        )
        deletedShifts.forEach((shift) => {
            dispatch(deleteShift(shift.id))
        })

        dispatch(clearShiftDrafts())
        onClose()
    }

    const handleCancel = () => {
        dispatch(clearShiftDrafts())
        onClose()
    }

    const hasChanges =
        JSON.stringify(shiftDrafts) !== JSON.stringify(originalShiftData)

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
                                <ShiftCell date={day.format('YYYY-MM-DD')} />
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
                                    disabled={
                                        !hasChanges || hasDraftsWithErrors
                                    }
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
