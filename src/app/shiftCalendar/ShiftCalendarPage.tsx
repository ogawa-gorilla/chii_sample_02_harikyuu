'use client'

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import StaffSelector from '../components/common/StaffSelector'
import ShiftCalendar from './components/ShiftCalendar'

export default function ShiftCalendarPage() {
    const [selectedStaff, setSelectedStaff] = useState('')

    return (
        <Container fluid className="py-3">
            <h5 className="text-center mb-3">シフト一覧</h5>
            <StaffSelector
                selectedStaff={selectedStaff}
                onStaffChange={setSelectedStaff}
            />
            {selectedStaff && <ShiftCalendar staffId={selectedStaff} />}
        </Container>
    )
}
