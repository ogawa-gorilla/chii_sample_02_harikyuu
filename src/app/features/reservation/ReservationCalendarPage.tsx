import { Container } from "react-bootstrap";
import ReservationCalendar from "./components/ReservationCalendar";


export default function CalendarPage() {
  return (
    <Container fluid className="py-3">
    <h5 className="text-center mb-3">新規予約</h5>
    

    <ReservationCalendar />
  </Container>
  );
}