import Calendar from "@/app/components/calendar";
import AvailableStaffModal from "@/app/features/reservationCreateCalendar/components/AvailableStaffModal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Reservation } from "@/app/types/reservation";
import { User } from "@/app/types/user";
import { filterReservedAt, isReservedAt } from "@/app/utils/reservationUtils";
import { filterShiftsAtHour } from "@/app/utils/shiftUtils";
import { useState } from "react";
import ReservationCreateCalendarCellForAll from "./ReservationCreateCalendarCellForAll";

interface ReservationCreateCalendarForAllSectionProps {
  onEditClick: (reservation: Reservation) => void;
  onDetailClick: (reservation: Reservation) => void;
  onCreateByStaff: (date: string, hour: number, availableStaffs: User[], staffId: string) => void;
}

export default function ReservationCreateCalendarForAllSection({ onEditClick, onDetailClick, onCreateByStaff }: ReservationCreateCalendarForAllSectionProps) {

  const dispatch = useAppDispatch();

  const allReservations = useAppSelector((state) => state.reservation.reservations)
  const allShifts = useAppSelector((state) => state.shift.shifts)
  const allStaffs = useAppSelector((state) => state.user.users)
  const [showAvailableStaffModal, setShowAvailableStaffModal] = useState(false);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState(0);
  const [availableStaffs, setAvailableStaffs] = useState<User[]>([]);
  const [bookedReservations, setBookedReservations] = useState<Reservation[]>([]);

  const filterAvailableStaffs = (date: string, hour: number): User[] => {
    const availableShifts = filterShiftsAtHour(allShifts, date, hour)
    const reservations = filterReservedAt(allReservations, date, hour);
    return availableShifts.filter((shift) => !reservations.some((reservation) => reservation.staff.id === shift.staffId)).map((shift) => allStaffs.find((staff) => staff.id === shift.staffId)!);
  }

  const handleCellClick = (date: string, hour: number) => {
    setShowAvailableStaffModal(true);
    setDate(date);
    setHour(hour);
    const availableStaffs = filterAvailableStaffs(date, hour);
    setAvailableStaffs(availableStaffs);
    setBookedReservations(allReservations.filter((reservation) => isReservedAt(reservation, date, hour)));
  }

  const handleStaffSelect = (staffId: string) => {
    onCreateByStaff(date, hour, availableStaffs, staffId);
  }

  return (
    <div>
      <AvailableStaffModal show={showAvailableStaffModal} onHide={() => setShowAvailableStaffModal(false)} date={date} hour={hour} availableStaffs={availableStaffs} reservations={bookedReservations} onStaffSelect={handleStaffSelect} onEditClick={onEditClick} onDetailClick={onDetailClick} />
    <Calendar cellComponent={ReservationCreateCalendarCellForAll} cellProps={{ allReservations, allShifts, onCellClick: handleCellClick }} />
    </div>
  )
}