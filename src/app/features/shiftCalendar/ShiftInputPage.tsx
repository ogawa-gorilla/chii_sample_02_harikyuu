import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import ShiftInputTable from '../../components/shiftInputTable/ShiftInputTable'
import { useAppSelector } from '../../hooks'
import { useShiftDraftManager } from '../../hooks/useShiftDraftManager'
import {
    deleteShift,
    getMonthlyShifts,
    updateOrCreateShift,
} from '../../store/shiftSlice'
import { Shift, ShiftDraft } from '../../types/shift'
import { TimeIdentifier } from '../../types/timeIdentifier'

interface ShiftInputPageProps {
    staffId: string
    date: dayjs.Dayjs
    onLeave: () => void
}

export default function ShiftInputPage({
    staffId,
    date,
    onLeave,
}: ShiftInputPageProps) {
    const dispatch = useDispatch()
    dayjs.locale('ja')

    const numDays = dayjs(new Date(date.year(), date.month(), 1)).daysInMonth()
    const days = useMemo(
        () =>
            Array.from({ length: numDays }, (_, i) =>
                dayjs(new Date(date.year(), date.month(), i + 1))
            ),
        [numDays]
    )

    const staff = useAppSelector((state) =>
        state.user.users.find((user) => user.id === staffId)
    )

    const originalShifts = useAppSelector((state) =>
        getMonthlyShifts(state, date.month(), staffId)
    )

    const handleCommit = (drafts: ShiftDraft[]) => {
        // ドラフトに存在するものの保存とアップデート
        for (const draft of drafts) {
            const shift: Shift = {
                ...draft,
                staffId: staffId,
                date: draft.date.value,
            }
            dispatch(updateOrCreateShift(shift))
        }

        // 元のデータから消えたものの削除
        const deletedShifts = originalShifts.filter(
            (shift) => !drafts.some((draft) => draft.id === shift.id)
        )

        for (const shift of deletedShifts) {
            dispatch(deleteShift(shift.id))
        }
        onLeave()
    }

    const handleAbort = () => {
        onLeave()
    }

    const originalShiftData = useAppSelector((state) =>
        getMonthlyShifts(state, date.month(), staffId)
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
            <h1 className="text-center mb-3">
                {staff?.name}さんの {date.format('YYYY年M月')} シフト
            </h1>
            <Button variant="success-outline" size="sm">
                テンプレートから入力
            </Button>
            <ShiftInputTable onCommit={handleCommit} onAbort={handleAbort} />
        </Container>
    )
}
