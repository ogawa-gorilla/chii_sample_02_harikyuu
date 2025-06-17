import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { Container } from 'react-bootstrap'
import ShiftInputTable from '../components/shiftInputTable/ShiftInputTable'
import { useAppSelector } from '../hooks'
import { useShiftDraftManager } from '../hooks/useShiftDraftManager'
import { getMonthlyShifts } from '../store/shiftSlice'
import { ShiftDraft } from '../types/shift'
import { TimeIdentifier } from '../types/timeIdentifier'

interface ShiftInputPageProps {
    staffId: string
}

export default function ShiftInputPage({ staffId }: ShiftInputPageProps) {
    dayjs.locale('ja')

    // いったん定数
    // TODO: カレンダーで見ていた日付とかに同期する
    const month = 5

    const numDays = dayjs(new Date(2025, month, 1)).daysInMonth()
    const days = useMemo(
        () =>
            Array.from({ length: numDays }, (_, i) =>
                dayjs(new Date(2025, month, i + 1))
            ),
        [numDays]
    )

    const handleCommit = (drafts: ShiftDraft[]) => {
        // TODO: データベースに保存する
        console.log(drafts)
    }

    const handleAbort = () => {
        // TODO: ページ遷移とかをする
    }

    const originalShiftData = useAppSelector((state) =>
        getMonthlyShifts(state, month, staffId)
    )
    const { initializeDrafts } = useShiftDraftManager()

    useEffect(() => {
        const targetDates: TimeIdentifier[] = days.map((day) => ({
            value: day.format('YYYY-MM-DD'),
            displayValue: day.format('D(ddd)'),
            type: 'date',
        }))
        initializeDrafts(originalShiftData, targetDates)
    }, [originalShiftData, initializeDrafts])

    return (
        <Container style={{ paddingBottom: '80px' }}>
            <ShiftInputTable onCommit={handleCommit} onAbort={handleAbort} />
        </Container>
    )
}
