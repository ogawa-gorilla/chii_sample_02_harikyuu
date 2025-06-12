'use client'

import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import StaffSelector from '../components/common/StaffSelector'
import { Shift } from '../types/shift'
import ShiftCalendar from './components/ShiftCalendar'
import ShiftInputView from './components/shiftInputView/ShiftInputView'

export default function ShiftCalendarPage() {
    const [selectedStaff, setSelectedStaff] = useState('')
    const [showDailyShiftListModal, setShowDailyShiftListModal] =
        useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [showShiftInputView, setShowShiftInputView] = useState(false)

    const handleCellClick = (date: string, shifts: Shift[]) => {
        setShowDailyShiftListModal(true)
        setSelectedDate(date)
    }

    const handleInputShift = () => {
        setShowShiftInputView(true)
    }

    return (
        <Container fluid className="py-3">
            {showShiftInputView ? (
                <ShiftInputView
                    staffId={selectedStaff}
                    startDate="2025-06-02"
                    today="2025-06-02"
                    onClose={() => setShowShiftInputView(false)}
                />
            ) : (
                <div>
                    <h5 className="text-center mb-3">シフト一覧</h5>
                    <StaffSelector
                        selectedStaff={selectedStaff}
                        onStaffChange={setSelectedStaff}
                    />
                    <div className="d-flex justify-content-between mb-2">
                        <Button
                            variant="outline-success"
                            size="sm"
                            onClick={handleInputShift}
                        >
                            シフト入力
                        </Button>
                        <Button variant="outline-success" size="sm">
                            一括入力
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                            個人設定
                        </Button>
                    </div>
                    {selectedStaff && (
                        <ShiftCalendar
                            staffId={selectedStaff}
                            onCellClick={handleCellClick}
                        />
                    )}
                </div>
            )}
        </Container>
    )
}
