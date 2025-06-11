import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useCalendar } from '@/app/hooks/useCalendar'
import {
    deleteShift,
    editShift,
    selectShiftsByStaffId,
} from '@/app/store/shiftSlice'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import ShiftCell from './components/ShiftCell'

interface ShiftInputViewProps {
    startDate: string
    today: string
    staffId: string
}

export default function ShiftInputView({
    today,
    staffId,
}: ShiftInputViewProps) {
    dayjs.locale('ja')

    const { days } = useCalendar()
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
    const [deleteShiftId, setDeleteShiftId] = useState('')

    const shiftData = useAppSelector((state) =>
        selectShiftsByStaffId(state, staffId)
    )
    const dispatch = useAppDispatch()

    const handleUpdate = (
        temporalValues: {
            startTime: string
            endTime: string
            id: string
        }[]
    ) => {
        temporalValues.forEach((value) => {
            dispatch(editShift(value))
        })
    }

    const handleDelete = (shiftId: string) => {
        setShowDeleteConfirmModal(true)
        setDeleteShiftId(shiftId)
    }

    const handleDeleteConfirm = () => {
        dispatch(deleteShift(deleteShiftId))
        setShowDeleteConfirmModal(false)
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
                                        shiftData.filter(
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
            <DeleteConfirmModal
                show={showDeleteConfirmModal}
                onHide={() => setShowDeleteConfirmModal(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    )
}
