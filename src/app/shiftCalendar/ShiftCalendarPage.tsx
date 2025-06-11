'use client'

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import StaffSelector from '../components/common/StaffSelector'
import { Shift } from '../types/shift'
import DailyShiftListModal from './components/DailyShiftListModal'
import ShiftCalendar from './components/ShiftCalendar'

export default function ShiftCalendarPage() {
    const [selectedStaff, setSelectedStaff] = useState('')
    const [showDailyShiftListModal, setShowDailyShiftListModal] =
        useState(false)
    const [selectedDate, setSelectedDate] = useState('')

    const handleCellClick = (date: string, shifts: Shift[]) => {
        setShowDailyShiftListModal(true)
        setSelectedDate(date)
    }

    return (
        <Container fluid className="py-3">
            <DailyShiftListModal
                show={showDailyShiftListModal}
                date={selectedDate}
                staffId={selectedStaff}
                onHide={() => setShowDailyShiftListModal(false)}
            />
            <h5 className="text-center mb-3">シフト一覧</h5>
            <StaffSelector
                selectedStaff={selectedStaff}
                onStaffChange={setSelectedStaff}
            />
            {selectedStaff && (
                <ShiftCalendar
                    staffId={selectedStaff}
                    onCellClick={handleCellClick}
                />
            )}
        </Container>
    )
}
