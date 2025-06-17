import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { useAppSelector } from '../hooks'
import {
    deleteShiftDraft,
    selectAllShiftDrafts,
    setShiftDrafts,
    setTargetDates,
    updateShiftDraft,
} from '../store/shiftSlice'
import { Shift, ShiftDraft } from '../types/shift'
import { TimeIdentifier } from '../types/timeIdentifier'

export function useShiftDraftManager() {
    const dispatch = useDispatch()
    const shiftDrafts = useSelector(selectAllShiftDrafts)
    const targetDates = useAppSelector(
        (state) => state.shift.shiftDraft.targetDates
    )

    const initializeDrafts = useCallback(
        (shifts: Shift[], targetDates: TimeIdentifier[]) => {
            const initialDrafts = shifts
                .filter((shift) =>
                    targetDates.some((td) => td.value === shift.date)
                )
                .map((shift) => {
                    const draft: ShiftDraft = {
                        date: {
                            value: shift.date,
                            displayValue: shift.date,
                            type: 'date',
                        },
                        startTime: shift.startTime,
                        endTime: shift.endTime,
                        id: shift.id,
                    }
                    return draft
                })
            dispatch(setShiftDrafts(initialDrafts))
            dispatch(setTargetDates(targetDates))
        },
        [dispatch]
    )

    const handleDraftUpdate = useCallback(
        (draft: ShiftDraft) => {
            dispatch(updateShiftDraft(draft))
        },
        [dispatch]
    )

    const handleDraftCreate = useCallback(
        (date: TimeIdentifier) => {
            const newDraft: ShiftDraft = {
                date,
                startTime: '09:00',
                endTime: '18:00',
                id: v4(),
            }
            dispatch(updateShiftDraft(newDraft))
        },
        [dispatch]
    )

    const handleDraftDelete = useCallback(
        (date: TimeIdentifier) => {
            const draftsToDelete = shiftDrafts.filter(
                (d) => d.date.value === date.value
            )
            draftsToDelete.forEach((draft) => {
                dispatch(deleteShiftDraft(draft.id))
            })
        },
        [dispatch, shiftDrafts]
    )

    const handleDraftSplit = useCallback(
        (date: TimeIdentifier) => {
            const targetDraft = shiftDrafts.find(
                (d) => d.date.value === date.value
            )
            if (!targetDraft) return

            const newDraft: ShiftDraft = {
                startTime: targetDraft.endTime,
                endTime: '18:00',
                date: date,
                id: v4(),
            }
            dispatch(updateShiftDraft(newDraft))
        },
        [dispatch, shiftDrafts]
    )

    const handleDraftMerge = useCallback(
        (date: TimeIdentifier) => {
            const targetDrafts = shiftDrafts.filter(
                (d) => d.date.value === date.value
            )
            if (targetDrafts.length !== 2) {
                console.error(
                    'handleDraftMerge: 対象の日付のドラフトが2個ではありません'
                )
                return
            }

            const firstDraft = { ...targetDrafts[0] }
            firstDraft.endTime = targetDrafts[1].endTime

            // 両方のドラフトを削除
            targetDrafts.forEach((draft) => {
                dispatch(deleteShiftDraft(draft.id))
            })

            // マージしたドラフトを追加
            dispatch(updateShiftDraft(firstDraft))
        },
        [dispatch, shiftDrafts]
    )

    return {
        shiftDrafts,
        targetDates,
        initializeDrafts,
        handleDraftUpdate,
        handleDraftCreate,
        handleDraftDelete,
        handleDraftSplit,
        handleDraftMerge,
    }
}
