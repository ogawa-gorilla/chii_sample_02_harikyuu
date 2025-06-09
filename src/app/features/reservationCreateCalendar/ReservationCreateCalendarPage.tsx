import { useState } from "react";
import { Container } from "react-bootstrap";
import ReservationCreateCalendarForAllSection from "./components/ReservationCreateCalendarForAllSection";
import ReservationCreateCalendarSection from "./components/ReservationCreateCalendarSection";
import StaffSelector from "./components/StaffSelector";

export default function ReservationCreateCalendarPage() {

  const [selectedStaff, setSelectedStaff] = useState<string>('all');

  const handleStaffChange = (staff: string) => {
    setSelectedStaff(staff);
  }


  return (
    <Container fluid className="py-3">

      <h5 className="text-center mb-3">予約作成</h5>
      <StaffSelector selectedStaff={selectedStaff} onStaffChange={handleStaffChange} />
      { (selectedStaff === 'all') ? (
        <ReservationCreateCalendarForAllSection />
      ) : (
        <ReservationCreateCalendarSection selectedStaff={selectedStaff} />
      )}
  </Container>
  );
}