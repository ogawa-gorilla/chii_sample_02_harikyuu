import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { pushPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { Page } from '@/app/types/Page'
import { Button } from 'react-bootstrap'
import { useTreatmentNavigation } from '../treatmentRecord/hooks/useTreatmentNavigation'
import { ReservationTableReservation } from './types/ReservationTableReservation'

interface ReservationTableRowProps {
    reservation: ReservationTableReservation
}

export default function ReservationTableRow({
    reservation,
}: ReservationTableRowProps) {
    const { loginUser } = useLogin()
    const canCreate = loginUser!.id === reservation.staff.id
    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    )
    const dispatch = useAppDispatch()
    const { openOrCreateTreatmentRecordForReservation } =
        useTreatmentNavigation()

    return (
        <tr key={reservation.id}>
            <td>
                {reservation.date} {reservation.time}
            </td>
            <td>{reservation.staff.name}</td>
            <td>{reservation.client}</td>
            <td>{reservation.notes || ''}</td>
            <td className="text-center">
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                        dispatch(
                            setSelectedReservation(
                                reservations.find(
                                    (r) => r.id === reservation.id
                                )!
                            )
                        )
                        dispatch(pushPage(Page.RESERVE_DETAIL))
                    }}
                >
                    閲覧
                </Button>
            </td>
            <td className="text-center">
                {reservation.recordId ? (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                            openOrCreateTreatmentRecordForReservation(
                                reservation.id
                            )
                        }}
                    >
                        閲覧
                    </Button>
                ) : (
                    canCreate && (
                        <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => {
                                openOrCreateTreatmentRecordForReservation(
                                    reservation.id
                                )
                            }}
                        >
                            作成
                        </Button>
                    )
                )}
            </td>
        </tr>
    )
}
