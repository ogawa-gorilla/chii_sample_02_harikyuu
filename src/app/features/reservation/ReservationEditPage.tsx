import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { popPage, setCurrentPage } from "@/app/store/navigationSlice";
import { setSelectedReservation, updateReservation } from "@/app/store/reservationSlice";
import { Page } from "@/app/types/Page";
import { Reservation, ReservationFormData } from "@/app/types/reservation";
import ReservationForm from "./components/ReservationForm";


export default function ReservationEditPage() {

  const dispatch = useAppDispatch();
  const selectedReservation = useAppSelector((state) => state.reservation.selectedReservation)!;
  const allStaffs = useAppSelector((state) => state.user.users);

  const handleSubmit = (formData: ReservationFormData) => {
    const reservation: Reservation = {
      id: selectedReservation.id,
      staff: allStaffs.find(staff => staff.id === formData.staffId)!,
      client: formData.clientName,
      date: formData.date,
      time: formData.hour,
      duration: 1,
      status: 'pending',
      notes: formData.notes
    }
    dispatch(updateReservation(reservation));
    dispatch(setSelectedReservation(reservation));
    dispatch(setCurrentPage(Page.RESERVE_DETAIL));
  }

  const handleCancel = () => {
    dispatch(popPage())
  }

  return (
    <div>
      <h5 className="text-center mb-3">予約作成</h5>
      <ReservationForm scheduledDate={selectedReservation.date} scheduledTime={selectedReservation.time} clientName={selectedReservation.client} notes={selectedReservation.notes} staff={selectedReservation.staff} availableStaffs={allStaffs} reservationId={selectedReservation.id} onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}

