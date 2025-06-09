import Calendar from "@/app/components/calendar";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCurrentPage } from "@/app/store/navigationSlice";
import { setSelectedReservation } from "@/app/store/reservationSlice";
import { Page } from "@/app/types/Page";
import { Reservation } from "@/app/types/reservation";
import { User } from "@/app/types/user";
import { filterShiftsAtHour } from "@/app/utils/shiftUtils";
import { useState } from "react";
import ReservationCreateCalendarCell from "./ReservationCreateCalendarCell";
import ReservationCreationModal from "./ReservationCreationModal";

interface ReservationCreateCalendarSectionProps {
  selectedStaff: User;
}

export default function ReservationCreateCalendarSection({ selectedStaff }: ReservationCreateCalendarSectionProps) {

  const dispatch = useAppDispatch();

  const allReservations = useAppSelector((state) => state.reservation.reservations).filter((reservation) => reservation.staff.id === selectedStaff.id);
  const allShifts = useAppSelector((state) => state.shift.shifts).filter((shift) => shift.staffId === selectedStaff.id);

  const [showReservationCreationModal, setShowReservationCreationModal] = useState(false);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState(0);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleCellClick = (date: string, hour: number, reservations: Reservation[]) => {

    if (filterShiftsAtHour(allShifts, date, hour).length === 0) {
      return
    }
    setShowReservationCreationModal(true);
    setDate(date);
    setHour(hour);
    setReservations(reservations);
  }

  const handleEditClick = (reservation: Reservation) => {
    dispatch(setSelectedReservation(reservation));
    dispatch(setCurrentPage(Page.RESERVE_EDIT));
  }

  const handleDetailClick = (reservation: Reservation) => {
    dispatch(setSelectedReservation(reservation));
    dispatch(setCurrentPage(Page.RESERVE_DETAIL));
  }

  return (
    <div>
      <ReservationCreationModal show={showReservationCreationModal} onHide={() => setShowReservationCreationModal(false)} date={date} hour={hour} staff={selectedStaff} reservations={reservations} onEditClick={handleEditClick} onDetailClick={handleDetailClick} />
    <Calendar cellComponent={ReservationCreateCalendarCell} cellProps={{ allReservations, allShifts, onCellClick: handleCellClick }} />
    </div>
  )
}