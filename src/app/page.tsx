'use client'

import Footer from './components/Footer'
import AppNavbar from './components/navbar/AppNavbar'
import DashboardPage from './features/dashboard/DashboardPage'
import EditLogPage from './features/editLog/EditLogPage'
import ReservationCreatePage from './features/reservation/ReservationCreatePage'
import ReservationDetailPage from './features/reservation/ReservationDetailPage'
import ReservationEditPage from './features/reservation/ReservationEditPage'
import ReservationCreateCalendarPage from './features/reservationCreateCalendar/ReservationCreateCalendarPage'
import ReservationTable from './features/reservationTable/ReservationTable'
import ReservationCalendarPage from './features/reservationViewCalendar/ReservationViewCalendarPage'
import ShiftCalendarPage from './features/shiftCalendar/ShiftCalendarPage'
import TreatmentRecordCreatePage from './features/treatmentRecord/TreatmentRecordCreatePage'
import TreatmentRecordDetailPage from './features/treatmentRecord/TreatmentRecordDetailPage'
import TreatmentRecordEditPage from './features/treatmentRecord/TreatmentRecordEditPage'
import TreatmentRecordPage from './features/treatmentRecord/TreatmentRecordPage'
import HomePage from './HomePage'
import { useAppSelector } from './hooks'
import NotImplementedPage from './NotImplementedPage'
import { Page } from './types/Page'

const showPage = (page: Page) => {
    switch (page) {
        case Page.HOME:
            return <HomePage />
        case Page.RESERVATION_CALENDAR:
            return <ReservationCalendarPage />
        case Page.RESERVATION_CREATE_CALENDAR:
            return <ReservationCreateCalendarPage />
        case Page.RESERVATION_TABLE:
            return <ReservationTable />
        case Page.RESERVE_CREATE:
            return <ReservationCreatePage />
        case Page.RESERVE_DETAIL:
            return <ReservationDetailPage />
        case Page.RESERVE_EDIT:
            return <ReservationEditPage />
        case Page.SHIFT:
            return <ShiftCalendarPage />
        case Page.TREATMENT_RECORD_LIST:
            return <TreatmentRecordPage />
        case Page.TREATMENT_RECORD_DETAIL:
            return <TreatmentRecordDetailPage />
        case Page.TREATMENT_RECORD_EDIT:
            return <TreatmentRecordEditPage />
        case Page.TREATMENT_RECORD_CREATE:
            return <TreatmentRecordCreatePage />
        case Page.DASHBOARD:
            return <DashboardPage />
        case Page.EDIT_LOG:
            return <EditLogPage />
        default:
            return <NotImplementedPage />
    }
}

const Home = () => {
    const pageStack = useAppSelector((state) => state.navigation.pageStack)

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
    )
}

export default Home
