import { TimeIdentifier } from '@/app/types/timeIdentifier'
import React from 'react'
import { Button, Col } from 'react-bootstrap'

interface ShiftCellForNoShiftProps {
    date: TimeIdentifier
    onDraftCreate: () => void
}

export default function ShiftCellForOneShift({
    date,
    onDraftCreate,
}: ShiftCellForNoShiftProps) {
    return (
        <React.Fragment key={date.value}>
            <Col
                md={6}
                xs={12}
                className="d-flex justify-content-center text-muted small align-items-center"
            >
                休み
            </Col>
            <Col md={6} xs={12}>
                <Button
                    variant="outline-success"
                    size="sm"
                    onClick={onDraftCreate}
                >
                    出勤日にする
                </Button>
            </Col>
        </React.Fragment>
    )
}
