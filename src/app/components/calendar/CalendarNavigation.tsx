import { Button } from 'react-bootstrap';

interface CalendarNavigationProps {
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

export default function CalendarNavigation({ onPrevWeek, onNextWeek, onToday }: CalendarNavigationProps) {
  return (
    <div className="d-flex justify-content-between mb-2">
      <Button variant="outline-primary" size="sm" onClick={onPrevWeek}>
        &lt; 前の1週間
      </Button>
      <Button variant="outline-primary" size="sm" onClick={onToday}>本日へ</Button>
      <Button variant="outline-primary" size="sm" onClick={onNextWeek}>
        次の1週間 &gt;
      </Button>
    </div>
  );
} 