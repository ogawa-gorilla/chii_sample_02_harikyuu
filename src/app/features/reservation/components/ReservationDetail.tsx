import { Reservation } from '@/app/types/reservation'

interface ReservationDetailProps {
    reservation: Reservation
}

export default function ReservationDetail({
    reservation,
}: ReservationDetailProps) {
    return (
        <div className="bg-gray-50 px-4 py-6">
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
                </div>
            </div>
        </div>
    )
}
