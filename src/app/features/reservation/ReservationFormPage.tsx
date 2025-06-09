import { useAppSelector } from "@/app/hooks";
import ReservationForm from "./components/ReservationForm";

export default function ReservationFormPage() {

  const reservationDraft = useAppSelector((state) => state.reservation.reservationDraft);

  return (
    <div>
      <div className="bg-blue-600 text-white px-6 py-4">
        <h1 className="text-xl font-bold text-center">予約作成</h1>
      </div>
      { reservationDraft && (
      <ReservationForm scheduledDate={reservationDraft.date} scheduledTime={reservationDraft.time} staff={reservationDraft.staff} availableStaffs={reservationDraft.availableStaffs} onSubmit={() => {}} /> )}
    </div>
  )
}