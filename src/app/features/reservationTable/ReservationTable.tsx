import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Container, Form, Table } from 'react-bootstrap'
import MonthNavigation from './components/MonthNavigation'
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
    const reservations = getTableReservations

    const [month, setMonth] = useState<Month>({ month: 5, year: 2025 })
    const [searchText, setSearchText] = useState('')

    const reservationsInMonth = useMemo(() => {
        return reservations.filter((reservation) => {
            const reservationDate = dayjs(reservation.date)
            return (
                reservationDate.month() === month.month &&
                reservationDate.year() === month.year
            )
        })
    }, [reservations, month])

    const filteredReservations = useMemo(() => {
        return reservationsInMonth
            .filter((reservation) => {
                return (
                    searchText === '' ||
                    reservation.client.includes(searchText) ||
                    reservation.staff.name.includes(searchText) ||
                    reservation.date.includes(searchText)
                )
            })
            .sort((a, b) => {
                return dayjs(a.date).diff(dayjs(b.date))
            })
    }, [reservationsInMonth, searchText])

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
            <div className="mb-5">
                <h5 className="text-center mb-3">
                    予約台帳: {month.year}年{month.month + 1}月
                </h5>
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
                    {filteredReservations.map((reservation) => (
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
