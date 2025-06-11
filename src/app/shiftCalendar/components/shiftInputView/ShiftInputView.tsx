import { useCalendar } from '@/app/hooks/useCalendar'
import { Shift } from '@/app/types/shift'
import dayjs from 'dayjs'
import { Table } from 'react-bootstrap'
import ShiftCell from './components/ShiftCell'

interface ShiftInputViewProps {
    startDate: string
    today: string
}

export default function ShiftInputView({ today }: ShiftInputViewProps) {
    dayjs.locale('ja')

    const {
        startOfWeek,
        days,
        hours,
        handlePrevWeek,
        handleNextWeek,
        handleToday,
    } = useCalendar()

    // データ範囲: 2025/6/2～2025/6/8
    const shiftData: Shift[] = [
        {
            id: '2025-06-03',
            date: '2025-06-03',
            staffId: '1',
            startTime: '13:00',
            endTime: '18:00',
        },
        {
            id: '2025-06-04',
            date: '2025-06-04',
            staffId: '1',
            startTime: '09:00',
            endTime: '11:00',
        },
        {
            id: '2025-06-04-2',
            date: '2025-06-04',
            staffId: '1',
            startTime: '10:00',
            endTime: '18:00',
        },
        {
            id: '2025-06-05',
            date: '2025-06-05',
            staffId: '1',
            startTime: '09:00',
            endTime: '18:00',
        },
        {
            id: '2025-06-06',
            date: '2025-06-06',
            staffId: '1',
            startTime: '09:00',
            endTime: '18:00',
        },
        {
            id: '2025-06-07',
            date: '2025-06-07',
            staffId: '1',
            startTime: '09:00',
            endTime: '18:00',
        },
        {
            id: '2025-06-08',
            date: '2025-06-08',
            staffId: '1',
            startTime: '09:00',
            endTime: '18:00',
        },
    ]

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
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
