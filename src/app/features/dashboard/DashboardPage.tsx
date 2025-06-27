import { VIRTUAL_TODAY, VIRTUAL_TODAY_TIME } from '@/app/constants/virtualToday'
import { useAppSelector } from '@/app/hooks'
import { useRef } from 'react'
import { Alert, Card, Container } from 'react-bootstrap'
import { roleText } from './components/roleText'
import ThisWeeksReservationList from './components/ThisWeeksReservationList'
import TodaysReservationList from './components/TodaysReservationList'
import UnrecordedReservationList from './components/UnrecordedReservationList'
import { useReservationPseudoBackend } from './hooks/useReservationPseudoBackend'

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

const DashboardPage = () => {
    const loginUser = useAppSelector((state) => state.login.user)!

    const { getDashboardReservations, getReservationsNeedRecords } =
        useReservationPseudoBackend()

    const todaysReservations = getDashboardReservations.filter((r) =>
        isToday(r.date)
    )
    const thisWeekReservations = getDashboardReservations.filter((r) =>
        isThisWeek(r.date)
    )
    const pendingRecords = getReservationsNeedRecords

    const pendingRecordsRef = useRef<HTMLDivElement>(null)

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
            <h4 className="mb-4">
                {loginUser.name}さん({loginUser.role})のホーム
            </h4>
            <h5 className="mb-4 small">
                {VIRTUAL_TODAY} {VIRTUAL_TODAY_TIME}現在
            </h5>

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title className="h6 text-muted mb-2">
                        アカウント説明
                    </Card.Title>
                    <div className="text-muted small">
                        {roleText(loginUser.role)
                            .split('\n')
                            .map((line, index) => (
                                <p key={index} className="mb-1">
                                    {line}
                                </p>
                            ))}
                    </div>
                </Card.Body>
            </Card>

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

            <TodaysReservationList data={todaysReservations} />
            <ThisWeeksReservationList
                groupedWeekReservations={groupedWeekReservations}
            />
            <UnrecordedReservationList
                data={pendingRecords}
                ref={pendingRecordsRef}
            />
        </Container>
    )
}

export default DashboardPage
