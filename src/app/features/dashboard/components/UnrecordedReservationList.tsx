import { VIRTUAL_TODAY } from '@/app/constants/virtualToday'
import dayjs from 'dayjs'
import { DashboardReservation } from '../types/DashboardReservation'
import ReservationCardList from './ReservationCardList'

interface UnrecordedReservationListProps {
    data: DashboardReservation[]
}

export default function UnrecordedReservationList({
    data,
}: UnrecordedReservationListProps) {
    return (
        <section className="mb-5">
            <h5 className="mb-3">⚠️ 施術記録がまだの予約があります</h5>
            <h6 className="mb-3 text-primary">
                {dayjs(VIRTUAL_TODAY).format('MM/DD(ddd)')}
            </h6>
            <ReservationCardList data={data} />
        </section>
    )
}
