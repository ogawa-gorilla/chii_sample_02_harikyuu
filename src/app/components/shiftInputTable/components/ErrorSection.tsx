import { ShiftValidationResult } from '@/utils/validation/shiftValidation'
import { Alert, Col } from 'react-bootstrap'

interface ErrorSectionProps {
    validationResult: ShiftValidationResult
}

export default function ErrorSection({ validationResult }: ErrorSectionProps) {
    const errorMessages = Array.from(
        new Set(validationResult.errors.map((error) => error.message))
    )
    const warningMessages = Array.from(
        new Set(validationResult.warnings.map((warning) => warning.message))
    )
    return (
        <Col xs={12} md={12} className="d-flex justify-content-center gap-1">
            {warningMessages.map((message) => (
                <Alert variant="warning">{message}</Alert>
            ))}
            {errorMessages.map((message) => (
                <Alert variant="danger">{message}</Alert>
            ))}
        </Col>
    )
}
