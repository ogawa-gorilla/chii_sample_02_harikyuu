import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { addEditLog } from '@/app/store/editLogSlice'
import { updateReservation } from '@/app/store/reservationSlice'
import { EditLog, EditLogTarget } from '@/app/types/EditLog'
import { Reservation } from '@/app/types/reservation'
import { User } from '@/app/types/user'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import { v4 } from 'uuid'

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
    }
    if (
        originalEntry.date !== newReservation.date ||
        originalEntry.time !== newReservation.time
    ) {
        editLog.edits.push(
            `日時を変更 ${originalEntry.date} -> ${newReservation.date} ${originalEntry.time} -> ${newReservation.time}`
        )
    }
    if (originalEntry.staff.id !== newReservation.staff.id) {
        editLog.edits.push(
            `スタッフを変更 ${originalEntry.staff.name} -> ${newReservation.staff.name}`
        )
    }
    if (originalEntry.client !== newReservation.client) {
        editLog.edits.push(
            `クライアントを変更 ${originalEntry.client} -> ${newReservation.client}`
        )
    }
    if (originalEntry.notes !== newReservation.notes) {
        editLog.edits.push(
            `備考を編集 ${originalEntry.notes} -> ${newReservation.notes}`
        )
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
            dispatch(addEditLog(log))
        },
        [dispatch, loginUser, reservations]
    )

    return { updateReservationEntry }
}
