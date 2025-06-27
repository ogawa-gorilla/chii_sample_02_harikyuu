import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { popPage, pushPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { Page } from '@/app/types/Page'
import { Col } from 'react-bootstrap'
import { useReservationPseudoBackend } from '../dashboard/hooks/useReservationPseudoBackend'
import { useTreatmentNavigation } from '../treatmentRecord/hooks/useTreatmentNavigation'
import ReservationDetail from './components/ReservationDetail'
import useReservationEditor from './hooks/useReservationEditor'

export default function ReservationDetailPage() {
    const dispatch = useAppDispatch()
    const reservation = useAppSelector(
        (state) => state.reservation.selectedReservation
    )!
    const { isManager, isOffice, loginUser } = useLogin()
    const { deleteReservationEntry } = useReservationEditor()

    const { hasTreatmentRecord } = useReservationPseudoBackend()

    const { openOrCreateTreatmentRecordForReservation } =
        useTreatmentNavigation()
    const canCreateTreatmentRecord = reservation.staff.id === loginUser!.id

    const canEdit =
        isManager || isOffice || reservation.staff.id === loginUser!.id

    const canBack =
        useAppSelector((state) => state.navigation.pageStack).length > 1

    const handleEdit = () => {
        dispatch(setSelectedReservation(reservation))
        dispatch(pushPage(Page.RESERVE_EDIT))
    }

    const handleDelete = () => {
        deleteReservationEntry(reservation.id)
        dispatch(popPage())
    }

    const handleBack = () => {
        dispatch(popPage())
    }

    const handleCreateTreatmentRecord = () => {
        openOrCreateTreatmentRecordForReservation(reservation.id)
    }

    const handleViewTreatmentRecord = () => {
        openOrCreateTreatmentRecordForReservation(reservation.id)
    }

    return (
        <div className="min-h-screen">
            <h5 className="text-center mb-3">予約詳細</h5>
            {reservation && (
                <>
                    <ReservationDetail reservation={reservation} />
                    {/* ボタン */}
                    <div className="px-4">
                        <Col className="flex gap-3 pt-4">
                            {canBack && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                >
                                    戻る
                                </button>
                            )}
                            {canEdit && (
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    編集
                                </button>
                            )}
                            {canEdit && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                >
                                    削除
                                </button>
                            )}
                        </Col>
                        <Col className="flex gap-3 pt-4">
                            {hasTreatmentRecord(reservation.id) ? (
                                <button
                                    type="button"
                                    onClick={handleViewTreatmentRecord}
                                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                >
                                    施術記録を閲覧
                                </button>
                            ) : (
                                canCreateTreatmentRecord && (
                                    <button
                                        type="button"
                                        onClick={handleCreateTreatmentRecord}
                                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                    >
                                        施術記録を作成
                                    </button>
                                )
                            )}
                        </Col>
                    </div>
                </>
            )}
        </div>
    )
}
