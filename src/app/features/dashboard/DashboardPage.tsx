import { VIRTUAL_TODAY } from '@/app/constants/virtualToday'
import { Card, Col, Container, Row } from 'react-bootstrap'

const today = '2025-06-25' // 仮定：本日の日付

// サンプル予約データ
const reservations = [
    { id: 'r1', client: '田中 太郎', date: '2025-06-25', hasRecord: true },
    { id: 'r2', client: '鈴木 花子', date: '2025-06-25', hasRecord: false },
    { id: 'r3', client: '山田 真一', date: '2025-06-27', hasRecord: true },
    { id: 'r4', client: '井上 美咲', date: '2025-06-29', hasRecord: false },
    { id: 'r5', client: '中村 海斗', date: '2025-06-30', hasRecord: true },
]

// 日付比較ヘルパー
const isToday = (dateStr: string) => dateStr === today
const isThisWeek = (dateStr: string) => {
    const now = new Date(today)
    const date = new Date(dateStr)
    const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff < 7
}

// 日付を日本語形式に変換
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const days = ['日', '月', '火', '水', '木', '金', '土']
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayOfWeek = days[date.getDay()]
    return `${month}/${day}(${dayOfWeek})`
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
    const todayReservations = reservations.filter((r) => isToday(r.date))
    const thisWeekReservations = reservations.filter((r) => isThisWeek(r.date))
    const pendingRecords = reservations.filter((r) => !r.hasRecord)
    const groupedWeekReservations =
        groupReservationsByDate(thisWeekReservations)

    const renderList = (title: string, data: any[], icon: string) => (
        <section className="mb-5">
            <h5 className="mb-3">
                {icon} {title}
            </h5>
            <h6 className="mb-3 text-primary">{formatDate(VIRTUAL_TODAY)}</h6>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {data.length === 0 ? (
                    <Col>
                        <Card body className="text-muted">
                            該当する予約はありません。
                        </Card>
                    </Col>
                ) : (
                    data.map((res: any) => (
                        <Col key={res.id}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>{res.client}</Card.Title>
                                    <Card.Text>予約日: {res.date}</Card.Text>
                                    <Card.Text>
                                        施術記録:{' '}
                                        {res.hasRecord ? '記録済み' : '未記録'}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </section>
    )

    const renderWeeklyReservations = () => (
        <section className="mb-5">
            <h5 className="mb-3">📅 今週の予約</h5>
            {groupedWeekReservations.length === 0 ? (
                <Card body className="text-muted">
                    今週の予約はありません。
                </Card>
            ) : (
                groupedWeekReservations.map(([date, dayReservations]) => (
                    <div key={date} className="mb-4">
                        <h6 className="mb-3 text-primary">
                            {formatDate(date)}
                            {isToday(date) && (
                                <span className="badge bg-success ms-2">
                                    今日
                                </span>
                            )}
                        </h6>
                        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                            {dayReservations.map((res: any) => (
                                <Col key={res.id}>
                                    <Card className="h-100">
                                        <Card.Body>
                                            <Card.Title>
                                                {res.client}
                                            </Card.Title>
                                            <Card.Text>
                                                施術記録:{' '}
                                                {res.hasRecord ? (
                                                    <span className="text-success">
                                                        記録済み
                                                    </span>
                                                ) : (
                                                    <span className="text-warning">
                                                        未記録
                                                    </span>
                                                )}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))
            )}
        </section>
    )

    return (
        <Container className="my-4">
            <h4 className="mb-4">{userName}さんのダッシュボード</h4>

            {renderList('本日の予約', todayReservations, '🗓')}
            {renderWeeklyReservations()}
            {renderList('施術記録がまだの予約があります', pendingRecords, '⚠️')}
        </Container>
    )
}

export default DashboardPage
