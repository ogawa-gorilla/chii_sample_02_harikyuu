import { useAppDispatch } from '@/app/hooks'
import { updateOrCreateShift } from '@/app/store/shiftSlice'
import { Shift, ShiftDraft } from '@/app/types/shift'

export default function useShiftEditor() {
    const dispatch = useAppDispatch()
    const commitShifts = (drafts: ShiftDraft[], staffId: string) => {
        for (const draft of drafts) {
            const shift: Shift = {
                ...draft,
                staffId: staffId,
                date: draft.date.value,
            }
            dispatch(updateOrCreateShift(shift))
        }
    }

    return { commitShifts }
}
