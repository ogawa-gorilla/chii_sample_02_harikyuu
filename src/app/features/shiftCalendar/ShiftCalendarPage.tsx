'use client'
import ExplanationCard from '@/app/components/common/ExplanationCard'
import { useCalendar } from '@/app/hooks/useCalendar'
import { useLogin } from '@/app/hooks/useLogin'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import StaffSelector from '../../components/common/StaffSelector'
import ShiftCalendar from './components/ShiftCalendar'
import ShiftInputPage from './ShiftInputPage'
import ShiftTemplateInputPage from './shiftTemplate/ShiftTemplateInputPage'

export default function ShiftCalendarPage() {
    dayjs.locale('ja')

    const { isManager, isOffice, loginUser } = useLogin()
    const canSelectStaff = isManager || isOffice

    const { startOfWeek } = useCalendar()

    const [selectedStaff, setSelectedStaff] = useState(
        canSelectStaff ? 'all' : loginUser!.id
    )
    const [startDate, setStartDate] = useState(startOfWeek.format('YYYY-MM-DD'))
    const [showShiftInputView, setShowShiftInputView] = useState(false)
    const [showShiftTemplateInputView, setShowShiftTemplateInputView] =
        useState(false)

    const handleWeekChange = (startDate: string) => {
        setStartDate(startDate)
    }

    return (
        <Container fluid className="py-3">
            {showShiftInputView ? (
                <ShiftInputPage
                    staffId={selectedStaff}
                    startDate={dayjs(startDate)}
                    onLeave={() => {
                        setShowShiftInputView(false)
                    }}
                />
            ) : showShiftTemplateInputView ? (
                <ShiftTemplateInputPage
                    staffId={selectedStaff}
                    onLeave={() => {
                        setShowShiftTemplateInputView(false)
                    }}
                />
            ) : (
                <div>
                    <ExplanationCard
                        title="シフトカレンダー"
                        text={
                            'シフトの一覧です。\nシフト入力ボタンを押すと、シフトを入力できます。\n入力が楽になるよう、ユーザごとに一週間のシフトのテンプレートを設定することもできます。'
                        }
                    />
                    <h5 className="text-center mb-3">シフト一覧</h5>
                    {canSelectStaff && (
                        <StaffSelector
                            selectedStaff={selectedStaff}
                            onStaffChange={setSelectedStaff}
                            labelForAll="スタッフを選択してください"
                        />
                    )}
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
                                    {dayjs(startDate).format('M/D')}
                                    ～のシフトを入力
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => {
                                        setShowShiftTemplateInputView(true)
                                    }}
                                >
                                    テンプレ設定
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
