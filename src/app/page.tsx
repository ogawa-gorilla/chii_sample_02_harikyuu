'use client'

import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import ReservationCreatePage from "./features/reservation/ReservationCreatePage";
import ReservationDetailPage from "./features/reservation/ReservationDetailPage";
import ReservationEditPage from "./features/reservation/ReservationEditPage";
import ReservationCreateCalendarPage from "./features/reservationCreateCalendar/ReservationCreateCalendarPage";
import ReservationCalendarPage from "./features/reservationViewCalendar/ReservationViewCalendarPage";
import HomePage from "./HomePage";
import { useAppSelector } from "./hooks";
import NotImplementedPage from "./NotImplementedPage";
import ShiftInputPage from "./shift-input/ShiftInputPage";
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
      return <ReservationCreatePage />
    case Page.RESERVE_DETAIL:
      return <ReservationDetailPage />
    case Page.RESERVE_EDIT:
      return <ReservationEditPage />
    case Page.SHIFT:
      return <ShiftInputPage />
    default:
      return <NotImplementedPage />
  }
}

const Home = () => {
  const pageStack = useAppSelector((state) => state.navigation.pageStack);

  return (
    <div className="app-container">
    {
      <div style={{ paddingTop: '70px' }}>
        <AppNavbar />
        {showPage(pageStack[pageStack.length - 1])}
        <Footer />
      </div>
    }
    </div>
  );
}

export default Home;
