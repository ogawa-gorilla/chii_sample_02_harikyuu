import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { Container } from 'react-bootstrap'
import ShiftInputTable from '../components/shiftInputTable/ShiftInputTable'
import { useAppSelector } from '../hooks'
import { useShiftDraftManager } from '../hooks/useShiftDraftManager'
import { getMonthlyShifts } from '../store/shiftSlice'
import { TimeIdentifier } from '../types/timeIdentifier'

interface ShiftInputPageProps {
    staffId: string
}

export default function ShiftInputPage({ staffId }: ShiftInputPageProps) {
    dayjs.locale('ja')

    // いったん定数
    const month = 5

    const numDays = dayjs(new Date(2025, month, 1)).daysInMonth()
    const days = useMemo(
        () =>
            Array.from({ length: numDays }, (_, i) =>
                dayjs(new Date(2025, month, i + 1))
            ),
        [numDays]
    )

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
            <ShiftInputTable onCommit={() => {}} />
        </Container>
    )
}
