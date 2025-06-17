import { useShiftDraftManager } from '@/app/hooks/useShiftDraftManager'
import { Button, Col, Container, Row } from 'react-bootstrap'

interface ShiftInputActionBarProps {
    onSave: () => void
    onCancel: () => void
    onUndo: () => void
}

export default function ShiftInputActionBar({
    onSave,
    onCancel,
    onUndo,
}: ShiftInputActionBarProps) {
    const { canUndo } = useShiftDraftManager()

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'white',
                padding: '16px',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
            }}
        >
            <Container>
                <Row>
                    <Col className="d-flex justify-content-end gap-2">
                        <Button variant="outline-warning" onClick={onCancel}>
                            変更を破棄
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={onUndo}
                            disabled={!canUndo}
                        >
                            元に戻す
                        </Button>
                        <Button variant="primary" onClick={onSave}>
                            保存
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
