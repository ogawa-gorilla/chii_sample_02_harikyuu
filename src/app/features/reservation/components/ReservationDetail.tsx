import { useTreatmentNavigation } from '@/app/features/treatmentRecord/hooks/useTreatmentNavigation'
import { useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { Reservation } from '@/app/types/reservation'
import { Col } from 'react-bootstrap'
import { useReservationPseudoBackend } from '../hooks/useReservationPseudoBackend'

interface ReservationDetailProps {
    reservation: Reservation
    onEdit?: (reservationId: string) => void // 編集ボタン押下時のイベント
    onDelete?: (reservationId: string) => void // 削除ボタン押下時のイベント
    onBack?: () => void // 戻るボタン押下時のイベント（オプション）
}

export default function ReservationDetail({
    reservation,
    onEdit,
    onDelete,
    onBack,
}: ReservationDetailProps) {
    const { hasTreatmentRecord } = useReservationPseudoBackend()
    const { openOrCreateTreatmentRecordForReservation } =
        useTreatmentNavigation()

    const { isManager, isOffice, loginUser } = useLogin()
    const canCreateTreatmentRecord =
        isManager || isOffice || reservation.staff.id === loginUser!.id

    const handleEdit = () => {
        onEdit?.(reservation.id)
    }

    const handleDelete = () => {
        if (window.confirm('この予約を削除してもよろしいですか？')) {
            onDelete?.(reservation.id)
        }
    }

    const handleCreateTreatmentRecord = () => {
        openOrCreateTreatmentRecordForReservation(reservation.id)
    }

    const handleViewTreatmentRecord = () => {
        openOrCreateTreatmentRecordForReservation(reservation.id)
    }

    const pageStack = useAppSelector(
        (state) => state.navigation.pageStack
    ).length

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* 詳細表示 */}
                <div className="p-6 space-y-6">
                    {/* 予約日時 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            予約日時
                        </label>
                        <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700">
                            {reservation.date} {reservation.time}
                        </div>
                    </div>

                    {/* 担当スタッフ */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            担当スタッフ
                        </label>
                        <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700">
                            {reservation.staff.name}
                        </div>
                    </div>

                    {/* 顧客名 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            顧客名
                        </label>
                        <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700">
                            {reservation.client}
                        </div>
                    </div>

                    {/* 特記事項 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            特記事項
                        </label>
                        <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 min-h-[120px] whitespace-pre-wrap">
                            {reservation.notes || '特記事項はありません'}
                        </div>
                    </div>

                    {/* ボタン */}
                    <Col className="flex gap-3 pt-4">
                        {onBack && pageStack > 1 && (
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                戻る
                            </button>
                        )}
                        {onEdit && (
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                編集
                            </button>
                        )}
                        {onDelete && (
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
                        {hasTreatmentRecord(reservation) ? (
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
                                    onClick={handleViewTreatmentRecord}
                                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                >
                                    施術記録を作成
                                </button>
                            )
                        )}
                    </Col>
                </div>
            </div>
        </div>
    )
}
function openOrCreateTreatmentRecordForReservation(id: string) {
    throw new Error('Function not implemented.')
}
