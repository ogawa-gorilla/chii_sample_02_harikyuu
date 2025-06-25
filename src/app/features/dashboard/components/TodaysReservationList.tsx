import { VIRTUAL_TODAY } from '@/app/constants/virtualToday'
import dayjs from 'dayjs'
import { ReservationForDashboard } from '../types/ReservationForDashboard'
import ReservationCardList from './ReservationCardList'

interface TodaysReservationListProps {
    data: ReservationForDashboard[]
}

export default function TodaysReservationList({
    data,
}: TodaysReservationListProps) {
    return (
        <section className="mb-5">
            <h5 className="mb-3">🗓 本日の予約</h5>
            <h6 className="mb-3 text-primary">
                {dayjs(VIRTUAL_TODAY).format('MM/DD(ddd)')}
            </h6>
            <ReservationCardList data={data} />
        </section>
    )
}
