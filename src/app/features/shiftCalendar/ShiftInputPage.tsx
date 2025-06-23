import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { v4 } from 'uuid'
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
import ApplyTemplateModal from './components/ApplyTemplateModal'

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
    const [showApplyTemplateConfirmModal, setShowApplyTemplateConfirmModal] =
        useState(false)

    const staff = useAppSelector((state) =>
        state.user.users.find((user) => user.id === staffId)
    )
    const originalShifts = useAppSelector((state) =>
        getMonthlyShifts(state, date.month(), staffId)
    )
    const template = useAppSelector((state) =>
        state.shift.shiftTemplates.find(
            (template) => template.userId === staffId
        )
    )

    const { initializeDrafts, shiftDrafts, batchDrafts } =
        useShiftDraftManager()

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

    const handleApplyTemplate = () => {
        if (shiftDrafts.length > 0) {
            setShowApplyTemplateConfirmModal(true)
        } else {
            handleApplyTemplateConfirm()
        }
    }

    const handleApplyTemplateConfirm = () => {
        setShowApplyTemplateConfirmModal(false)
        // テンプレートをシフトドラフトに変換
        const constructedDrafts: ShiftDraft[] = []
        days.forEach((day) => {
            const targetTemplate = template!.shiftDrafts.find(
                (templateDraft) =>
                    templateDraft.date.value === day.day().toString()
            )
            if (!targetTemplate) {
                return
            }
            const newDraft: ShiftDraft = {
                date: {
                    value: day.format('YYYY-MM-DD'),
                    displayValue: day.format('D(ddd)'),
                    type: 'date',
                },
                startTime: targetTemplate.startTime,
                endTime: targetTemplate.endTime,
                id: v4(),
            }
            constructedDrafts.push(newDraft)
        })
        batchDrafts(constructedDrafts)
    }

    const originalShiftData = useAppSelector((state) =>
        getMonthlyShifts(state, date.month(), staffId)
    )

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
            <div className="d-flex justify-content-center mb-3">
                <Button
                    variant="outline-success"
                    size="sm"
                    onClick={handleApplyTemplate}
                >
                    テンプレートから一括入力
                </Button>
            </div>
            <ShiftInputTable onCommit={handleCommit} onAbort={handleAbort} />
            <ApplyTemplateModal
                show={showApplyTemplateConfirmModal}
                month={date.month()}
                onHide={() => setShowApplyTemplateConfirmModal(false)}
                onApplyConfirm={handleApplyTemplateConfirm}
            />
        </Container>
    )
}
