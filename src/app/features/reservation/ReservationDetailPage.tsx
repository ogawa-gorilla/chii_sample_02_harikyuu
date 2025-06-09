import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { popPage, pushPage } from "@/app/store/navigationSlice";
import { setSelectedReservation } from "@/app/store/reservationSlice";
import { Page } from "@/app/types/Page";
import ReservationDetail from "./components/ReservationDetail";

export default function ReservationDetailPage() {

  const dispatch = useAppDispatch();
  const reservation = useAppSelector((state) => state.reservation.selectedReservation)!;

  const handleEdit = () => {
    dispatch(setSelectedReservation(reservation));
    dispatch(pushPage(Page.RESERVE_EDIT));
  }

  const handleDelete = () => {
    console.log("del")
  }

  const handleBack = () => {
    dispatch(popPage())
  }

  return (
    <div>
      <h5 className="text-center mb-3">予約詳細</h5>
      {reservation && (
        <ReservationDetail reservation={reservation} onEdit={handleEdit} onDelete={handleDelete} onBack={handleBack} />
      )}
    </div>
  )
}
