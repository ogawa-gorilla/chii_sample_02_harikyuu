import { Button } from 'react-bootstrap'

interface MonthNavigationProps {
    onPrevMonth: () => void
    onNextMonth: () => void
    onThisMonth: () => void
}

export default function MonthNavigation({
    onPrevMonth,
    onNextMonth,
    onThisMonth,
}: MonthNavigationProps) {
    return (
        <div className="d-flex justify-content-between mb-2">
            <Button variant="outline-primary" size="sm" onClick={onPrevMonth}>
                &lt; 前の月
            </Button>
            <Button variant="outline-primary" size="sm" onClick={onThisMonth}>
                今月へ
            </Button>
            <Button variant="outline-primary" size="sm" onClick={onNextMonth}>
                次の1週間 &gt;
            </Button>
        </div>
    )
}
