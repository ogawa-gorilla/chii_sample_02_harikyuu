'use client'

import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import CalendarPage from "./features/calendar/CalendarPage";
import ReservationCalendarPage from "./features/reservation/ReservationCalendarPage";
import HomePage from "./HomePage";
import { useAppSelector } from "./hooks";
import NotImplementedPage from "./NotImplementedPage";
import { Page } from "./types/Page";

const showPage = (page: Page) => {
  switch (page) {
    case Page.HOME:
      return <HomePage />
    case Page.CALENDAR:
      return <CalendarPage />
    case Page.RESERVATION_CALENDAR:
      return <ReservationCalendarPage />
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
