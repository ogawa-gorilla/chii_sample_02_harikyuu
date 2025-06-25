import { useAppSelector } from '@/app/hooks'
import { getStaffs } from '@/app/store/userSlice'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import { Card } from 'react-bootstrap'

interface TreatmentRecordCardProps {
    record: TreatmentRecord
}

export default function TreatmentRecordCard({
    record,
}: TreatmentRecordCardProps) {
    const staffs = useAppSelector((state) => getStaffs(state))

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>{record.client}</Card.Title>
                <Card.Text>{record.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    対応スタッフ:{' '}
                    {staffs.find((staff) => staff.id === record.staffId)!.name}
                </small>
                {record.attached_images.length > 0 && (
                    <small className="text-muted">
                        添付画像: {record.attached_images.length}件
                    </small>
                )}
            </Card.Footer>
        </Card>
    )
}
