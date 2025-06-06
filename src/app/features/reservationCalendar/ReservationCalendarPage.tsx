import Calendar from "@/app/components/calendar/Calendar";
import { Container } from "react-bootstrap";

export default function ReservationCalendarPage() {
  return (
    <Container fluid className="py-3">
      <h5 className="text-center mb-3">予約カレンダー</h5>
      <Calendar />
  </Container>
  );
}