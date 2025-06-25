import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage } from '@/app/store/navigationSlice'
import { updateRecordDraft } from '@/app/store/treatmentRecordSlice'
import { getStaffs } from '@/app/store/userSlice'
import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const TreatmentRecordEditPage = () => {
    const dispatch = useAppDispatch()
    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)
    const staffs = useAppSelector(getStaffs)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(updateRecordDraft({ [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        dispatch(
            updateRecordDraft({
                attached_images: files.map((file) => URL.createObjectURL(file)),
            })
        )
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(popPage())
    }

    const handleCancel = () => {
        dispatch(popPage())
    }

    return (
        <Container className="my-5">
            <h4>施術記録の編集</h4>
            <Form onSubmit={handleSubmit}>
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

                <Form.Group className="mb-3" controlId="staff_id">
                    <Form.Label>担当スタッフ</Form.Label>
                    <Form.Control
                        type="text"
                        name="staff_id"
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
                    <Form.Text muted>
                        添付画像は複数選択可能です（JPEG, PNGなど）。
                    </Form.Text>
                </Form.Group>

                <Row>
                    <Col xs="auto">
                        <Button variant="primary" type="submit">
                            保存
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="secondary" onClick={handleCancel}>
                            キャンセル
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default TreatmentRecordEditPage
