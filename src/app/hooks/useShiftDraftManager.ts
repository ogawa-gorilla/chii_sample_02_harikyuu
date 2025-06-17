import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import {
    deleteShiftDraft,
    selectAllShiftDrafts,
    updateShiftDraft,
} from '../store/shiftSlice'
import { ShiftDraft } from '../types/shift'

export function useShiftDraftManager() {
    const dispatch = useDispatch()
    const shiftDrafts = useSelector(selectAllShiftDrafts)

    const handleDraftUpdate = useCallback(
        (draft: ShiftDraft) => {
            dispatch(updateShiftDraft(draft))
        },
        [dispatch]
    )

    const handleDraftCreate = useCallback(
        (date: string) => {
            const newDraft: ShiftDraft = {
                date,
                startTime: '9:00',
                endTime: '18:00',
                id: v4(),
            }
            dispatch(updateShiftDraft(newDraft))
        },
        [dispatch]
    )

    const handleDraftDelete = useCallback(
        (date: string) => {
            const draftsToDelete = shiftDrafts.filter((d) => d.date === date)
            draftsToDelete.forEach((draft) => {
                dispatch(deleteShiftDraft(draft.id))
            })
        },
        [dispatch, shiftDrafts]
    )

    const handleDraftSplit = useCallback(
        (date: string) => {
            const targetDraft = shiftDrafts.find((d) => d.date === date)
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
        (date: string) => {
            const targetDrafts = shiftDrafts.filter((d) => d.date === date)
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
        handleDraftUpdate,
        handleDraftCreate,
        handleDraftDelete,
        handleDraftSplit,
        handleDraftMerge,
    }
}
