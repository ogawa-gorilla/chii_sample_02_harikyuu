'use client'
import { VIRTUAL_TODAY } from '@/app/constants/virtualToday'
import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import StaffSelector from '../components/common/StaffSelector'
import ShiftCalendar from './components/ShiftCalendar'
import ShiftInputPage from './ShiftInputPage'

export default function ShiftCalendarPage() {
    const [selectedStaff, setSelectedStaff] = useState('all')
    const [startDate, setStartDate] = useState(VIRTUAL_TODAY)
    const [showShiftInputView, setShowShiftInputView] = useState(false)

    const handleWeekChange = (startDate: string) => {
        setStartDate(startDate)
    }

    return (
        <Container fluid className="py-3">
            {showShiftInputView ? (
                <ShiftInputPage
                    staffId={selectedStaff}
                    onLeave={() => {
                        setShowShiftInputView(false)
                    }}
                />
            ) : (
                <div>
                    <h5 className="text-center mb-3">シフト一覧</h5>
                    <StaffSelector
                        selectedStaff={selectedStaff}
                        onStaffChange={setSelectedStaff}
                    />
                    {selectedStaff !== 'all' && (
                        <div>
                            <div className="d-flex justify-content-between mb-2">
                                <Button variant="outline-success" size="sm">
                                    一括入力
                                </Button>
                                <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => {
                                        setShowShiftInputView(true)
                                    }}
                                >
                                    シフト入力
                                </Button>
                                <Button variant="outline-secondary" size="sm">
                                    個人設定
                                </Button>
                            </div>
                            <ShiftCalendar
                                staffId={selectedStaff}
                                onWeekChange={handleWeekChange}
                                startDate={startDate}
                            />
                        </div>
                    )}
                </div>
            )}
        </Container>
    )
}
