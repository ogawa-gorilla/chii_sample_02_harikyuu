import { Container } from "react-bootstrap";
import Calendar from "./components/Calendar";


export default function CalendarPage() {
  return (
    <Container fluid className="py-3">
    <h5 className="text-center mb-3">予約カレンダー</h5>
    

    <Calendar />
  </Container>
  );
}