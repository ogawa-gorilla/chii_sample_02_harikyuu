import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Container, Form, Table } from 'react-bootstrap'
import MonthNavigation from './components/MonthNavigation'
import { useReservationTablePseudoBackend } from './hooks/useReservationTablePseudoBackend'
import ReservationTableRow from './ReservationTableRow'
import { ReservationTableReservation } from './types/ReservationTableReservation'

interface Month {
    month: number
    year: number
}

const representiveDay = (month: Month) => {
    return dayjs(
        `${month.year}-${(month.month + 1).toString().padStart(2, '0')}-01`
    )
}

const SortKey = {
    DATE_ASC: 'date_asc',
    DATE_DESC: 'date_desc',
    CLIENT_ASC: 'client_asc',
    CLIENT_DESC: 'client_desc',
    STAFF_ASC: 'staff_asc',
    STAFF_DESC: 'staff_desc',
} as const
type SortKey = (typeof SortKey)[keyof typeof SortKey]

export default function ReservationTable() {
    const { getTableReservations } = useReservationTablePseudoBackend()
    const reservations = getTableReservations

    const [month, setMonth] = useState<Month>({ month: 5, year: 2025 })
    const [searchText, setSearchText] = useState('')
    const [sortKey, setSortKey] = useState<SortKey>(SortKey.DATE_ASC)

    const reservationsInMonth = useMemo(() => {
        return reservations.filter((reservation) => {
            const reservationDate = dayjs(reservation.date)
            return (
                reservationDate.month() === month.month &&
                reservationDate.year() === month.year
            )
        })
    }, [reservations, month])

    const sortFunc = (
        a: ReservationTableReservation,
        b: ReservationTableReservation
    ) => {
        if (sortKey === SortKey.DATE_ASC) {
            return dayjs(a.date).diff(dayjs(b.date))
        } else if (sortKey === SortKey.DATE_DESC) {
            return dayjs(b.date).diff(dayjs(a.date))
        } else if (sortKey === SortKey.CLIENT_ASC) {
            return a.client.localeCompare(b.client)
        } else if (sortKey === SortKey.CLIENT_DESC) {
            return b.client.localeCompare(a.client)
        } else if (sortKey === SortKey.STAFF_ASC) {
            return a.staff.name.localeCompare(b.staff.name)
        } else if (sortKey === SortKey.STAFF_DESC) {
            return b.staff.name.localeCompare(a.staff.name)
        } else {
            return 0
        }
    }

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
            .sort(sortFunc)
    }, [reservationsInMonth, searchText, sortKey])

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
            <div className="mb-3">
                <label>並び替え</label>
                <Form.Select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                >
                    <option value={SortKey.DATE_ASC}>日付(早い順)</option>
                    <option value={SortKey.DATE_DESC}>日付(遅い順)</option>
                    <option value={SortKey.CLIENT_ASC}>
                        顧客名(あいうえお順)
                    </option>
                    <option value={SortKey.CLIENT_DESC}>
                        顧客名(あいうえお逆順)
                    </option>
                    <option value={SortKey.STAFF_ASC}>
                        施術者(あいうえお順)
                    </option>
                    <option value={SortKey.STAFF_DESC}>
                        施術者降順(あいうえお逆順)
                    </option>
                </Form.Select>
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
