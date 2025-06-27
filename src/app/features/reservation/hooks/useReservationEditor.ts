import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { addEditLog } from '@/app/store/editLogSlice'
import {
    createReservation,
    deleteReservation,
    updateReservation,
} from '@/app/store/reservationSlice'
import { EditLog, EditLogTag, EditLogTarget } from '@/app/types/EditLog'
import { Reservation } from '@/app/types/reservation'
import { User } from '@/app/types/user'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import { v4 } from 'uuid'

const constructReservationCreateLog = (
    createdReservation: Reservation,
    createdBy: User
) => {
    const editLog: EditLog = {
        editTarget: EditLogTarget.RESERVATION,
        user: createdBy,
        id: v4(),
        editedAt: dayjs().toISOString(),
        edits: [
            `予約を作成 ${createdReservation.date} ${createdReservation.time} 顧客:${createdReservation.client} 担当:${createdReservation.staff.name}`,
        ],
        tags: [EditLogTag.CREATE],
    }
    const tags: Set<EditLogTag> = new Set()
    tags.add(EditLogTag.CREATE)
    editLog.tags = Array.from(tags)
    return editLog
}

const constructReservationEditLog = (
    newReservation: Reservation,
    originalEntry: Reservation,
    updatedBy: User
) => {
    const editLog: EditLog = {
        editTarget: EditLogTarget.RESERVATION,
        user: updatedBy,
        id: v4(),
        editedAt: dayjs().toISOString(),
        edits: [],
        tags: [],
    }
    const tags: Set<EditLogTag> = new Set()
    if (
        originalEntry.date !== newReservation.date ||
        originalEntry.time !== newReservation.time
    ) {
        editLog.edits.push(
            `日時を変更 ${originalEntry.date} -> ${newReservation.date} ${originalEntry.time} -> ${newReservation.time}`
        )
        tags.add(EditLogTag.EDIT)
    }
    if (originalEntry.staff.id !== newReservation.staff.id) {
        editLog.edits.push(
            `スタッフを変更 ${originalEntry.staff.name} -> ${newReservation.staff.name}`
        )
        tags.add(EditLogTag.EDIT)
    }
    if (originalEntry.client !== newReservation.client) {
        editLog.edits.push(
            `クライアントを変更 ${originalEntry.client} -> ${newReservation.client}`
        )
        tags.add(EditLogTag.EDIT)
    }
    if (originalEntry.notes !== newReservation.notes) {
        editLog.edits.push(
            `備考を編集 ${originalEntry.notes} -> ${newReservation.notes}`
        )
        tags.add(EditLogTag.EDIT)
    }
    editLog.tags = Array.from(tags)
    return editLog
}

const constructReservationDeleteLog = (
    deletedReservation: Reservation,
    deletedBy: User
) => {
    const editLog: EditLog = {
        editTarget: EditLogTarget.RESERVATION,
        user: deletedBy,
        id: v4(),
        editedAt: dayjs().toISOString(),
        edits: [
            `予約を削除 ${deletedReservation.date} ${deletedReservation.time} 顧客:${deletedReservation.client} 担当:${deletedReservation.staff.name}`,
        ],
        backup: JSON.stringify(deletedReservation),
        tags: [EditLogTag.DELETE],
    }
    return editLog
}
export default function useReservationEditor() {
    const dispatch = useAppDispatch()
    const { loginUser } = useLogin()

    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    )

    const updateReservationEntry = useCallback(
        (newReservation: Reservation) => {
            const originalEntry = reservations.find(
                (r) => r.id === newReservation.id
            )!
            const log = constructReservationEditLog(
                newReservation,
                originalEntry,
                loginUser!
            )
            dispatch(updateReservation(newReservation))
            if (log.edits.length > 0) {
                log.backup = JSON.stringify(originalEntry)
                dispatch(addEditLog(log))
            }
        },
        [dispatch, loginUser, reservations]
    )

    const deleteReservationEntry = useCallback(
        (reservationId: string) => {
            const deletedReservation = reservations.find(
                (r) => r.id === reservationId
            )!
            const log = constructReservationDeleteLog(
                deletedReservation,
                loginUser!
            )
            dispatch(deleteReservation(reservationId))
            log.backup = JSON.stringify(deletedReservation)
            dispatch(addEditLog(log))
        },
        [dispatch, loginUser, reservations]
    )

    const createReservationEntry = useCallback(
        (reservation: Reservation) => {
            const log = constructReservationCreateLog(reservation, loginUser!)
            dispatch(createReservation(reservation))
            dispatch(addEditLog(log))
        },
        [dispatch, loginUser]
    )

    return {
        updateReservationEntry,
        deleteReservationEntry,
        createReservationEntry,
    }
}
