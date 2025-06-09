import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { popPage, setCurrentPage } from "@/app/store/navigationSlice";
import { createReservation, setSelectedReservation } from "@/app/store/reservationSlice";
import { Page } from "@/app/types/Page";
import { Reservation, ReservationFormData } from "@/app/types/reservation";
import { v4 } from "uuid";
import ReservationForm from "./components/ReservationForm";

export default function ReservationCreatePage() {

  const dispatch = useAppDispatch();
  const reservationDraft = useAppSelector((state) => state.reservation.reservationDraft);
  const allStaffs = useAppSelector((state) => state.user.users);

  const handleSubmit = (formData: ReservationFormData) => {
    const reservation: Reservation = {
      id: v4(),
      staff: allStaffs.find(staff => staff.id === formData.staffId)!,
      client: formData.clientName,
      date: formData.date,
      time: formData.hour,
      duration: 1,
      status: 'pending',
      notes: formData.notes
    }
    dispatch(createReservation(reservation));
    dispatch(setSelectedReservation(reservation));
    dispatch(setCurrentPage(Page.RESERVE_DETAIL));
  }

  const handleCancel = () => {
    dispatch(popPage())
  }

  return (
    <div>
      <h5 className="text-center mb-3">予約作成</h5>
      { reservationDraft && (
      <ReservationForm scheduledDate={reservationDraft.date} scheduledTime={reservationDraft.time} clientName={""} notes={""} staff={reservationDraft.staff} availableStaffs={reservationDraft.availableStaffs} onSubmit={handleSubmit} onCancel={handleCancel} />
      )}
    </div>
  )
}

