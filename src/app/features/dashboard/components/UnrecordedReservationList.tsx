import { VIRTUAL_TODAY } from '@/app/constants/virtualToday'
import dayjs from 'dayjs'
import { DashboardReservation } from '../types/DashboardReservation'
import ReservationCardList from './ReservationCardList'

interface UnrecordedReservationListProps {
    data: DashboardReservation[]
    ref: React.RefObject<HTMLDivElement | null>
}

export default function UnrecordedReservationList({
    data,
    ref,
}: UnrecordedReservationListProps) {
    if (data.length === 0) return null

    return (
        <section className="mb-5" ref={ref}>
            <h5 className="mb-3">⚠️ 施術記録がまだの予約があります</h5>
            <h6 className="mb-3 text-primary">
                {dayjs(VIRTUAL_TODAY).format('MM/DD(ddd)')}
            </h6>
            <ReservationCardList data={data} />
        </section>
    )
}
