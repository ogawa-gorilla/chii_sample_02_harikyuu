import AvailableStaffModal from "@/app/components/AvailableStaffModal";
import Calendar from "@/app/components/calendar";
import { useAppSelector } from "@/app/hooks";
import { User } from "@/app/types/user";
import { filterShiftsAtHour } from "@/app/utils/shiftUtils";
import { useState } from "react";
import ReservationCreateCalendarCellForAll from "./ReservationCreateCalendarCellForAll";

export default function ReservationCreateCalendarForAllSection() {

  const allReservations = useAppSelector((state) => state.reservation.reservations)
  const allShifts = useAppSelector((state) => state.shift.shifts)
  const allStaffs = useAppSelector((state) => state.user.users)
  const [showAvailableStaffModal, setShowAvailableStaffModal] = useState(false);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState(0);
  const [availableStaffs, setAvailableStaffs] = useState<User[]>([]);

const filterAvailableStaffs = (date: string, hour: number): User[] => {
  return filterShiftsAtHour(allShifts, date, hour)
  .map((shift) => allStaffs.find((staff) => staff.id === shift.staffId)!);
}

  const handleCellClick = (date: string, hour: number) => {
    setShowAvailableStaffModal(true);
    setDate(date);
    setHour(hour);
    const availableStaffs = filterAvailableStaffs(date, hour);
    setAvailableStaffs(availableStaffs);
  }

  return (
    <div>
      <AvailableStaffModal show={showAvailableStaffModal} onHide={() => setShowAvailableStaffModal(false)} date={date} hour={hour} availableStaffs={availableStaffs} />
    <Calendar cellComponent={ReservationCreateCalendarCellForAll} cellProps={{ allReservations, allShifts, onCellClick: handleCellClick }} />
    </div>
  )
}