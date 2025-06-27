import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import MonthNavigation from './components/MonthNavigation'
import SortMethodSelector from './components/SortMethodSelector'
import { filterReservations } from './hooks/filterReservations'
import { sortFunc, SortKey } from './hooks/SortFunc'
import { useReservationTablePseudoBackend } from './hooks/useReservationTablePseudoBackend'
import ReservationTableRow from './ReservationTableRow'

interface Month {
    month: number
    year: number
}

const representiveDay = (month: Month) => {
    return dayjs(
        `${month.year}-${(month.month + 1).toString().padStart(2, '0')}-01`
    )
}

export default function ReservationTable() {
    const { getTableReservations } = useReservationTablePseudoBackend()
    const allReservations = getTableReservations

    const [month, setMonth] = useState<Month>({ month: 5, year: 2025 })
    const [searchText, setSearchText] = useState('')
    const [sortKey, setSortKey] = useState<SortKey>(SortKey.DATE_ASC)

    const reservationsInMonth = useMemo(() => {
        return allReservations.filter((reservation) => {
            const reservationDate = dayjs(reservation.date)
            return (
                reservationDate.month() === month.month &&
                reservationDate.year() === month.year
            )
        })
    }, [allReservations, month])

    const reservations = filterReservations(
        reservationsInMonth,
        searchText
    ).sort(sortFunc(sortKey))

    const handlePrevMonth = () => {
        const prevMonth = representiveDay(month).subtract(1, 'month')
        setMonth({
            month: prevMonth.month(),
            year: prevMonth.year(),
        })
    }

    const handleNextMonth = () => {
        const nextMonth = representiveDay(month).add(1, 'month')
        setMonth({
            month: nextMonth.month(),
            year: nextMonth.year(),
        })
    }

    const handleThisMonth = () => {
        setMonth({ month: 5, year: 2025 })
    }

    return (
        <Container>
            <div className="mb-3">
                <Row className="d-flex justify-content-between align-items-center">
                    <Col> </Col>
                    <Col>
                        <h5 className="text-center mb-0">
                            予約台帳: {month.year}年{month.month + 1}月
                        </h5>
                    </Col>
                    <Col className="text-end">
                        <Button variant="success">Excel出力</Button>
                    </Col>
                </Row>
            </div>
            <MonthNavigation
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onThisMonth={handleThisMonth}
            />
            <span className="text-muted">※PCでの操作をおすすめします。</span>
            <div className="mb-3">
                <Form className="mb-0 mt-3">
                    <Form.Control
                        type="text"
                        placeholder="顧客名・日付・施術者名で検索"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <small className="text-muted d-block">
                        日付は [4ケタ年号-2ケタ月-2ケタ日] で入力してください
                        (例: 2025-06-21)
                    </small>
                </Form>
            </div>
            <div className="mb-3">
                <label>並び替え</label>
                <SortMethodSelector sortKey={sortKey} onChange={setSortKey} />
            </div>
            <Table bordered>
                <thead className="text-center">
                    <tr>
                        <th>日時</th>
                        <th>施術者</th>
                        <th>顧客名</th>
                        <th>特記事項</th>
                        <th>予約詳細</th>
                        <th>施術記録</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <ReservationTableRow
                            key={reservation.id}
                            reservation={reservation}
                        />
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}
