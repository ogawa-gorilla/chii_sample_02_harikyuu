'use client'

import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import ReservationDetailPage from "./features/reservation/ReservationDetailPage";
import ReservationFormPage from "./features/reservation/ReservationFormPage";
import ReservationCalendarPage from "./features/reservationCalendar/ReservationCalendarPage";
import ReservationCreateCalendarPage from "./features/reservationCreateCalendar/ReservationCreateCalendarPage";
import HomePage from "./HomePage";
import { useAppSelector } from "./hooks";
import NotImplementedPage from "./NotImplementedPage";
import { Page } from "./types/Page";

const showPage = (page: Page) => {
  switch (page) {
    case Page.HOME:
      return <HomePage />
    case Page.RESERVATION_CALENDAR:
      return <ReservationCalendarPage />
    case Page.RESERVATION_CREATE_CALENDAR:
      return <ReservationCreateCalendarPage />
    case Page.RESERVE_CREATE:
      return <ReservationFormPage />
    case Page.RESERVE_DETAIL:
      return <ReservationDetailPage />
    default:
      return <NotImplementedPage />
  }
}

const Home = () => {
  const currentPage = useAppSelector((state) => state.navigation.currentPage);

  return (
    <div className="app-container">
    {
      <div style={{ paddingTop: '70px' }}>
        <AppNavbar />
        {showPage(currentPage)}
        <Footer />
      </div>
    }
    </div>
  );
}

export default Home;
