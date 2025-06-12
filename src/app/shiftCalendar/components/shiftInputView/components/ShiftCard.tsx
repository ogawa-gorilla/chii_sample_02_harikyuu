import { useAppDispatch } from '@/app/hooks'
import { useHolidayCheck } from '@/app/hooks/useHolidayCheck'
import { deleteShiftDraft, updateShiftDraft } from '@/app/store/shiftSlice'
import { ShiftDraft } from '@/app/types/shift'
import { validateShiftDraft } from '@/utils/validation/shiftValidation'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

interface ShiftCardProps {
    shiftNumber: number
    shiftDraft: ShiftDraft
    shiftsInGroup: ShiftDraft[]
}

export default function ShiftCard({
    shiftNumber,
    shiftDraft,
    shiftsInGroup,
}: ShiftCardProps) {
    // 個別のtemporalValue状態
    const dispatch = useAppDispatch()

    const handleStartTimeChange = (startTime: string) => {
        const newValue = { ...shiftDraft, startTime }
        dispatch(updateShiftDraft(newValue))
    }

    const handleEndTimeChange = (endTime: string) => {
        const newValue = { ...shiftDraft, endTime }
        dispatch(updateShiftDraft(newValue))
    }

    const handleDelete = () => {
        dispatch(deleteShiftDraft(shiftDraft.id))
    }

    const { isHoliday } = useHolidayCheck(shiftDraft.date)
    const { errors, warnings } = validateShiftDraft(
        shiftDraft,
        shiftsInGroup,
        isHoliday
    )

    return (
        <Card
            className="mb-2"
            style={{ fontSize: '0.75rem' }}
            key={shiftDraft.id}
        >
            <Card.Header className="py-1 px-2" style={{ fontSize: '0.7rem' }}>
                シフト{shiftNumber + 1}
            </Card.Header>
            <Card.Body
                className="p-2"
                style={{
                    border:
                        errors.length > 0
                            ? '1px solid red'
                            : warnings.length > 0
                            ? '1px solid yellow'
                            : 'none',
                }}
            >
                <Row className="align-items-center">
                    <Col xs={4}>
                        <Form.Control
                            as="input"
                            type="time"
                            min="09:00"
                            max="18:00"
                            step="1800"
                            size="sm"
                            value={shiftDraft.startTime}
                            style={{ fontSize: '0.7rem' }}
                            onChange={(e) =>
                                handleStartTimeChange(e.target.value)
                            }
                        />
                    </Col>
                    <Col
                        xs={1}
                        className="text-center p-0"
                        style={{ fontSize: '0.7rem' }}
                    >
                        ～
                    </Col>
                    <Col xs={4}>
                        <Form.Control
                            as="input"
                            type="time"
                            min="09:00"
                            max="18:00"
                            step="1800"
                            size="sm"
                            value={shiftDraft.endTime}
                            style={{ fontSize: '0.7rem' }}
                            onChange={(e) =>
                                handleEndTimeChange(e.target.value)
                            }
                        />
                    </Col>
                    <Col xs={3} className="text-end">
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleDelete}
                        >
                            削除
                        </Button>
                    </Col>
                </Row>
                <div className="mt-2">
                    {errors.map((error) => (
                        <Row key={error}>
                            <Col xs={12} className="text-danger">
                                ❌ {error}
                            </Col>
                        </Row>
                    ))}
                    {warnings.map((warning) => (
                        <Row key={warning}>
                            <Col xs={12} className="text-warning">
                                ⚠️ {warning}
                            </Col>
                        </Row>
                    ))}
                </div>
            </Card.Body>
        </Card>
    )
}
