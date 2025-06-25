import { VIRTUAL_TODAY } from '@/app/constants/virtualToday'
import { useAppSelector } from '@/app/hooks'
import { useRef } from 'react'
import { Alert, Container } from 'react-bootstrap'
import ThisWeeksReservationList from './components/ThisWeeksReservationList'
import TodaysReservationList from './components/TodaysReservationList'
import UnrecordedReservationList from './components/UnrecordedReservationList'

// 日付比較ヘルパー
const isToday = (dateStr: string) => dateStr === VIRTUAL_TODAY
const isThisWeek = (dateStr: string) => {
    const now = new Date(VIRTUAL_TODAY)
    const date = new Date(dateStr)
    const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff < 7
}

// 予約を日付でグループ化
const groupReservationsByDate = (reservations: any[]) => {
    const grouped: { [key: string]: any[] } = {}

    reservations.forEach((reservation) => {
        if (!grouped[reservation.date]) {
            grouped[reservation.date] = []
        }
        grouped[reservation.date].push(reservation)
    })

    // 日付順にソート
    return Object.entries(grouped).sort(
        ([dateA], [dateB]) =>
            new Date(dateA).getTime() - new Date(dateB).getTime()
    )
}

const DashboardPage = ({ userName = '佐藤' }) => {
    const loginUser = useAppSelector((state) => state.login.user)
    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    ).filter((r) => r.staff.id === loginUser?.id)

    const pendingRecordsRef = useRef<HTMLDivElement>(null)

    const todayReservations = reservations.filter((r) => isToday(r.date))
    const thisWeekReservations = reservations.filter((r) => isThisWeek(r.date))
    const pendingRecords = reservations.filter((r) => !r.records?.length)
    const groupedWeekReservations =
        groupReservationsByDate(thisWeekReservations)

    const scrollToPendingRecords = () => {
        pendingRecordsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <Container className="my-4">
            <h4 className="mb-4">{userName}さんのダッシュボード</h4>

            {/* 施術記録未完了の警告 */}
            {pendingRecords.length > 0 && (
                <Alert
                    variant="warning"
                    className="mb-4 cursor-pointer"
                    onClick={scrollToPendingRecords}
                    style={{ cursor: 'pointer' }}
                >
                    <Alert.Heading>
                        ⚠️ 施術記録が未完了の予約があります
                    </Alert.Heading>
                    <p className="mb-0">
                        {pendingRecords.length}件の予約で施術記録が未記録です。
                        クリックして詳細を確認してください。
                    </p>
                </Alert>
            )}

            <TodaysReservationList data={todayReservations} />
            <ThisWeeksReservationList
                groupedWeekReservations={groupedWeekReservations}
            />
            <UnrecordedReservationList data={pendingRecords} />
        </Container>
    )
}

export default DashboardPage
