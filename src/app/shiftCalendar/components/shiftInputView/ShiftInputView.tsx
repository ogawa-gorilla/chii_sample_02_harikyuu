import { Table } from 'react-bootstrap'
import ClosedDaysCard from './components/ClosedDaysCard'
import ShiftCard from './components/ShiftCard'

export default function ShiftInputView() {
    // データ範囲: 2025/6/2～2025/6/8
    const shiftData = [
        { date: '2025-06-02', dayOfWeek: '月', type: 'holiday' },
        { date: '2025-06-03', dayOfWeek: '火', type: 'holiday' },
        { date: '2025-06-04', dayOfWeek: '水', type: 'normal' },
        { date: '2025-06-05', dayOfWeek: '木', type: 'normal' },
        { date: '2025-06-06', dayOfWeek: '金', type: 'normal' },
        { date: '2025-06-07', dayOfWeek: '土', type: 'temporary_closure' },
        { date: '2025-06-08', dayOfWeek: '日', type: 'normal' },
    ]

    const renderShiftCell = (item: (typeof shiftData)[0]) => {
        if (item.type === 'holiday') {
            return <ClosedDaysCard reason="定休日" />
        }

        if (item.type === 'temporary_closure') {
            return <ClosedDaysCard reason="臨時休業" />
        }

        // 通常の日
        return (
            <div className="p-1">
                <ShiftCard
                    shiftNumber={1}
                    isWorking={true}
                    startTime="09:00"
                    endTime="18:00"
                />
                <ShiftCard
                    shiftNumber={2}
                    isWorking={false}
                    startTime=""
                    endTime=""
                />
            </div>
        )
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
                    {shiftData.map((item, index) => (
                        <tr key={item.date}>
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
                                        6月
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
                                {new Date(item.date).getDate()}
                                <br />({item.dayOfWeek})
                            </td>
                            <td className="p-0">{renderShiftCell(item)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
