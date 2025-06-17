import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ShiftInputTable from '../components/shiftInputTable/ShiftInputTable'
import { useAppSelector } from '../hooks'
import { getMonthlyShifts } from '../store/shiftSlice'
import { ShiftDraft } from '../types/shift'

interface ShiftInputPageProps {
    staffId: string
}

export default function ShiftInputPage({ staffId }: ShiftInputPageProps) {
    dayjs.locale('ja')

    // いったん定数
    const month = 5

    const numDays = dayjs(new Date(2025, month, 1)).daysInMonth()
    const days: dayjs.Dayjs[] = Array.from({ length: numDays }, (_, i) =>
        dayjs(new Date(2025, month, i + 1))
    )

    const [shiftDrafts, setShiftDrafts] = useState<ShiftDraft[]>([])
    const originalShiftData = useAppSelector((state) =>
        getMonthlyShifts(state, month, staffId)
    )

    useEffect(() => {
        setShiftDrafts(
            originalShiftData.map((shift) => ({
                date: shift.date,
                startTime: shift.startTime,
                endTime: shift.endTime,
                id: shift.id,
            }))
        )
        console.log(shiftDrafts)
    }, [originalShiftData])

    const handleDraftUpdate = (draft: ShiftDraft) => {
        setShiftDrafts((prev) =>
            prev.map((d) => (d.id === draft.id ? draft : d))
        )
    }

    return (
        <Container>
            <ShiftInputTable
                days={days}
                shiftDrafts={shiftDrafts}
                onDraftUpdate={handleDraftUpdate}
            />
        </Container>
    )
}
