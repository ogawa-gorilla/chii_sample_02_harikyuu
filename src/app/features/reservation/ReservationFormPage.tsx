import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCurrentPage } from "@/app/store/navigationSlice";
import { createReservation } from "@/app/store/reservationSlice";
import { Page } from "@/app/types/Page";
import { Reservation, ReservationFormData } from "@/app/types/reservation";
import { v4 } from "uuid";
import ReservationForm from "./components/ReservationForm";

export default function ReservationFormPage() {

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
    // TODO: 予約詳細ページへ遷移
  }

  return (
    <div>
      <div className="bg-blue-600 text-white px-6 py-4">
        <h1 className="text-xl font-bold text-center">予約作成</h1>
      </div>
      { reservationDraft && (
      <ReservationForm scheduledDate={reservationDraft.date} scheduledTime={reservationDraft.time} staff={reservationDraft.staff} availableStaffs={reservationDraft.availableStaffs} onSubmit={handleSubmit} onCancel={() => {
        dispatch(setCurrentPage(Page.RESERVATION_CALENDAR))
        // TODO: 遷移先を工夫
      }} />
      )}
    </div>
  )
}

