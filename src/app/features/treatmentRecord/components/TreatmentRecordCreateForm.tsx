import { useAppSelector } from '@/app/hooks'
import { useImageModal } from '@/app/hooks/useImageModal'
import { getStaffs } from '@/app/store/userSlice'
import { Button, ButtonGroup, Container, Form } from 'react-bootstrap'
import { useTreatmentForm } from '../hooks/useTreatmentForm'
import AttachedImagesTable from './AttachedImagesTable'
import ImageModal from './ImageModal'

interface TreatmentRecordEditFormProps {
    onSubmit: () => void
    onCancel: () => void
}

export default function TreatmentRecordEditForm({
    onSubmit,
    onCancel,
}: TreatmentRecordEditFormProps) {
    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)
    const staffs = useAppSelector(getStaffs)

    const { handleChange, handleFileChange, handleDeleteImage } =
        useTreatmentForm()
    const {
        showImageModal,
        handleImageClick,
        handleCloseImageModal,
        selectedImageUrl,
    } = useImageModal()

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <Container className="my-5">
            <h4>施術記録の作成</h4>
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

                <AttachedImagesTable
                    images={draft.attached_images}
                    onImageClick={handleImageClick}
                    onDeleteImage={handleDeleteImage}
                />

                <Form.Group className="mb-4" controlId="attached_images">
                    <Form.Label>画像添付</Form.Label>
                    <Form.Control
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </Form.Group>

                <ButtonGroup className="w-100">
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        保存
                    </Button>
                    <Button variant="secondary" onClick={onCancel}>
                        キャンセル
                    </Button>
                </ButtonGroup>
            </Form>

            <ImageModal
                show={showImageModal}
                onHide={handleCloseImageModal}
                imageUrl={selectedImageUrl}
            />
        </Container>
    )
}
