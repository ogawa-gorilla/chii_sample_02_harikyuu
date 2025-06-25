import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { updateRecordDraft } from '@/app/store/treatmentRecordSlice'
import { getStaffs } from '@/app/store/userSlice'
import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

interface TreatmentRecordEditFormProps {
    onSubmit: () => void
    onCancel: () => void
}

export default function TreatmentRecordEditForm({
    onSubmit,
    onCancel,
}: TreatmentRecordEditFormProps) {
    const dispatch = useAppDispatch()
    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)
    const staffs = useAppSelector(getStaffs)

    const [imageFiles, setImageFiles] = useState<File[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(updateRecordDraft({ [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setImageFiles(files)
    }

    const handleAddImage = () => {
        const newImages = imageFiles.map((file) => URL.createObjectURL(file))
        dispatch(
            updateRecordDraft({
                attached_images: [...draft.attached_images, ...newImages],
            })
        )
    }

    const handleSubmit = () => {
        onSubmit()
    }

    return (
        <Container className="my-5">
            <h4>施術記録の編集</h4>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="client">
                    <Form.Label>クライアント名</Form.Label>
                    <Form.Control
                        type="text"
                        name="client"
                        value={draft.client}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>施術日</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={draft.date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="staff">
                    <Form.Label>担当スタッフ</Form.Label>
                    <Form.Control
                        type="text"
                        name="staff"
                        value={
                            staffs.find((staff) => staff.id === draft.staffId)
                                ?.name
                        }
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef' }} // グレーアウト
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>施術内容</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="content"
                        value={draft.content}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="attached_images">
                    <Form.Label>画像添付</Form.Label>
                    <Form.Control
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </Form.Group>

                <Row>
                    <Col xs="auto">
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            保存
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="secondary" onClick={onCancel}>
                            キャンセル
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
