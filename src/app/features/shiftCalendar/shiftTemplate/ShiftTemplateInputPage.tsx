import ShiftInputTable from '@/app/components/shiftInputTable/ShiftInputTable'
import { useAppSelector } from '@/app/hooks'
import { useShiftDraftManager } from '@/app/hooks/useShiftDraftManager'
import {
    createShiftTemplate,
    updateShiftTemplate,
} from '@/app/store/shiftSlice'
import { ShiftDraft } from '@/app/types/shift'
import { TimeIdentifier } from '@/app/types/timeIdentifier'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

interface ShiftTemplateInputPageProps {
    staffId: string
    onLeave: () => void
}

export default function ShiftTemplateInputPage({
    staffId,
    onLeave,
}: ShiftTemplateInputPageProps) {
    const dispatch = useDispatch()
    dayjs.locale('ja')

    const days: TimeIdentifier[] = [
        {
            value: '1',
            displayValue: '月',
            type: 'dayOfWeek',
        },
        {
            value: '2',
            displayValue: '火',
            type: 'dayOfWeek',
        },
        {
            value: '3',
            displayValue: '水',
            type: 'dayOfWeek',
        },
        {
            value: '4',
            displayValue: '木',
            type: 'dayOfWeek',
        },
        {
            value: '5',
            displayValue: '金',
            type: 'dayOfWeek',
        },
        {
            value: '6',
            displayValue: '土',
            type: 'dayOfWeek',
        },
        {
            value: '0',
            displayValue: '日',
            type: 'dayOfWeek',
        },
    ]

    const staff = useAppSelector((state) =>
        state.user.users.find((user) => user.id === staffId)
    )

    const originalShiftTemplate = useAppSelector((state) =>
        state.shift.shiftTemplates.find(
            (template) => template.userId === staffId
        )
    )

    const handleCommit = (drafts: ShiftDraft[]) => {
        // 全データを更新しちゃって問題ない
        dispatch(
            updateShiftTemplate({
                id: originalShiftTemplate!.id,
                userId: staffId,
                shiftDrafts: drafts,
            })
        )
        onLeave()
    }

    const handleAbort = () => {
        onLeave()
    }

    const { setDrafts } = useShiftDraftManager()

    useEffect(() => {
        if (!originalShiftTemplate) {
            dispatch(createShiftTemplate(staffId))
        }
    }, [staffId])

    useEffect(() => {
        if (originalShiftTemplate) {
            setDrafts(originalShiftTemplate!.shiftDrafts, days)
        }
    }, [originalShiftTemplate, setDrafts])

    return (
        <Container style={{ paddingBottom: '80px' }}>
            <h1 className="text-center mb-3">
                {staff?.name}さんの シフトテンプレート
            </h1>
            <ShiftInputTable onCommit={handleCommit} onAbort={handleAbort} />
        </Container>
    )
}
