import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ShiftInputTable from '../components/shiftInputTable/ShiftInputTable'
import ShiftInputActionBar from '../components/shiftInputTable/components/ShiftInputActionBar'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
    getMonthlyShifts,
    selectAllShiftDrafts,
    setShiftDrafts,
} from '../store/shiftSlice'

interface ShiftInputPageProps {
    staffId: string
}

export default function ShiftInputPage({ staffId }: ShiftInputPageProps) {
    dayjs.locale('ja')
    const dispatch = useAppDispatch()

    // いったん定数
    const month = 5

    const numDays = dayjs(new Date(2025, month, 1)).daysInMonth()
    const days: dayjs.Dayjs[] = Array.from({ length: numDays }, (_, i) =>
        dayjs(new Date(2025, month, i + 1))
    )

    const originalShiftData = useAppSelector((state) =>
        getMonthlyShifts(state, month, staffId)
    )
    const shiftDrafts = useAppSelector(selectAllShiftDrafts)

    useEffect(() => {
        // 初期データの読み込み
        const initialDrafts = originalShiftData.map((shift) => ({
            date: shift.date,
            startTime: shift.startTime,
            endTime: shift.endTime,
            id: shift.id,
        }))
        dispatch(setShiftDrafts(initialDrafts))
    }, [originalShiftData, dispatch])

    const handleSave = () => {
        // TODO: 実際の保存処理を実装
        console.log('保存しました', shiftDrafts)
    }

    const handleUndo = () => {
        // TODO: 実際の元に戻す処理を実装
        console.log('元に戻しました')
    }

    return (
        <Container style={{ paddingBottom: '80px' }}>
            <ShiftInputTable days={days} onCommit={handleSave} />
            <ShiftInputActionBar onSave={handleSave} onUndo={handleUndo} />
        </Container>
    )
}
