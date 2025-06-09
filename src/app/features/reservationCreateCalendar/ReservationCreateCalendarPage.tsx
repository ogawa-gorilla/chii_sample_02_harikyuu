import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCurrentPage } from "@/app/store/navigationSlice";
import { setDraft, setSelectedReservation } from "@/app/store/reservationSlice";
import { getStaffs } from "@/app/store/userSlice";
import { Page } from "@/app/types/Page";
import { Reservation } from "@/app/types/reservation";
import { useState } from "react";
import { Container } from "react-bootstrap";
import ReservationCreateCalendarForAllSection from "./components/ReservationCreateCalendarForAllSection";
import ReservationCreateCalendarSection from "./components/ReservationCreateCalendarSection";
import StaffSelector from "./components/StaffSelector";

export default function ReservationCreateCalendarPage() {

  const dispatch = useAppDispatch();
  const allStaffs = useAppSelector(getStaffs);
  const [selectedStaff, setSelectedStaff] = useState<string>('all');

  const handleStaffChange = (staff: string) => {
    setSelectedStaff(staff);
  }

  const handleEditClick = (reservation: Reservation) => {
    dispatch(setSelectedReservation(reservation));
    dispatch(setDraft({
      date: reservation.date,
      time: reservation.time,
      staff: reservation.staff,
      availableStaffs: allStaffs
    }));
    dispatch(setCurrentPage(Page.RESERVE_EDIT));
  }

  const handleDetailClick = (reservation: Reservation) => {
    dispatch(setSelectedReservation(reservation));
    dispatch(setCurrentPage(Page.RESERVE_DETAIL));
  }


  return (
    <Container fluid className="py-3">
      <h5 className="text-center mb-3">予約作成</h5>
      <StaffSelector selectedStaff={selectedStaff} onStaffChange={handleStaffChange} />
      { (selectedStaff === 'all') ? (
        <ReservationCreateCalendarForAllSection onEditClick={handleEditClick} onDetailClick={handleDetailClick} />
      ) : (
        <ReservationCreateCalendarSection selectedStaff={allStaffs.find((staff) => staff.id === selectedStaff)!} onEditClick={handleEditClick} onDetailClick={handleDetailClick} />
      )}
  </Container>
  );
}