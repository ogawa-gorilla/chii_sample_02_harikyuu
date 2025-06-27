import dayjs from 'dayjs'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { useAppSelector } from '../hooks'
import {
    clearHistory,
    deleteShiftDraft,
    historyLength,
    pushHistory,
    selectAllShiftDrafts,
    setShiftDrafts,
    setTargetDates,
    undo,
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
    const canUndo = useAppSelector(historyLength) > 1

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
            dispatch(clearHistory())
            memorize()
        },
        [dispatch]
    )

    const setDrafts = useCallback(
        (drafts: ShiftDraft[], targetDates: TimeIdentifier[]) => {
            dispatch(setShiftDrafts(drafts))
            dispatch(setTargetDates(targetDates))
            dispatch(clearHistory())
        },
        [dispatch]
    )

    const memorize = () => {
        dispatch(pushHistory())
    }

    const handleDraftUpdate = useCallback(
        (draft: ShiftDraft) => {
            dispatch(updateShiftDraft(draft))
            memorize()
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
            memorize()
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
            memorize()
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
            memorize()
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
            memorize()
        },
        [dispatch, shiftDrafts]
    )

    const handleUndo = useCallback(() => {
        dispatch(undo())
    }, [dispatch])

    const batchDrafts = useCallback(
        (
            originalData: ShiftDraft[],
            addedDrafts: ShiftDraft[],
            targetDates: dayjs.Dayjs[]
        ) => {
            const updated = originalData.filter(
                (draft) =>
                    !targetDates.some(
                        (td) => td.format('YYYY-MM-DD') === draft.date.value
                    )
            )

            updated.push(...addedDrafts)

            dispatch(setShiftDrafts(updated))
            memorize()
        },
        [dispatch]
    )

    return {
        shiftDrafts,
        targetDates,
        initializeDrafts,
        setDrafts,
        handleDraftUpdate,
        handleDraftCreate,
        handleDraftDelete,
        handleDraftSplit,
        handleDraftMerge,
        handleUndo,
        batchDrafts,
        canUndo,
    }
}
