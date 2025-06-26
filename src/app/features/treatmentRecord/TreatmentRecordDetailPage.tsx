import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import {
    canBack,
    popPage,
    pushPage,
    setCurrentPage,
} from '@/app/store/navigationSlice'
import {
    setRecordDraft,
    setRecordOnView,
} from '@/app/store/treatmentRecordSlice'
import { Page } from '@/app/types/Page'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import { useState } from 'react'
import {
    Button,
    ButtonGroup,
    Card,
    Col,
    Container,
    Image,
    Row,
} from 'react-bootstrap'
import ImageModal from './components/ImageModal'

const TreatmentRecordDetail = () => {
    const dispatch = useAppDispatch()
    const [showImageModal, setShowImageModal] = useState(false)
    const [selectedImageUrl, setSelectedImageUrl] = useState('')

    const recordIdOnView = useAppSelector(
        (state) => state.treatmentRecords.recordIdOnView
    )
    const record = useAppSelector((state) =>
        state.treatmentRecords.records.find(
            (record) => record.id === recordIdOnView
        )
    )

    const { isManager, isOffice, loginUser } = useLogin()
    const canEdit =
        isManager || isOffice || (record && loginUser!.id === record?.staffId)

    const staff = useAppSelector((state) =>
        state.user.users.find((user) => user.id === record?.staffId)
    )

    const canBackToList = useAppSelector(canBack)

    const handleBack = () => {
        if (canBackToList) {
            dispatch(popPage())
        } else {
            dispatch(setCurrentPage(Page.TREATMENT_RECORD_LIST))
        }
    }

    const handleEdit = () => {
        if (!record) return
        const newDraft: TreatmentRecord = {
            ...record,
        }
        dispatch(setRecordDraft(newDraft))
        dispatch(setRecordOnView(newDraft.id))
        dispatch(pushPage(Page.TREATMENT_RECORD_EDIT))
    }

    const handleImageClick = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl)
        setShowImageModal(true)
    }

    const handleCloseImageModal = () => {
        setShowImageModal(false)
        setSelectedImageUrl('')
    }

    return (
        record && (
            <Container className="my-5">
                <Card>
                    <Card.Header as="h5">施術記録詳細</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <strong>クライアント:</strong> {record.client}
                        </Card.Text>
                        <Card.Text>
                            <strong>施術日:</strong> {record.date}
                        </Card.Text>
                        <Card.Text>
                            <strong>担当スタッフ:</strong> {staff?.name}
                        </Card.Text>
                        <Card.Text>
                            <strong>施術内容:</strong>
                            <br />
                            {record.content}
                        </Card.Text>

                        {record.attached_images.length > 0 && (
                            <>
                                <strong>添付画像:</strong>
                                <Row className="mt-3">
                                    {record.attached_images.map(
                                        (imgUrl, idx) => (
                                            <Col
                                                key={idx}
                                                xs={6}
                                                md={4}
                                                lg={3}
                                                className="mb-3"
                                            >
                                                <Image
                                                    src={imgUrl}
                                                    thumbnail
                                                    fluid
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        handleImageClick(imgUrl)
                                                    }
                                                />
                                            </Col>
                                        )
                                    )}
                                </Row>
                            </>
                        )}
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-end gap-2">
                        <ButtonGroup size="sm" className="w-100">
                            {canEdit && (
                                <Button variant="primary" onClick={handleEdit}>
                                    編集
                                </Button>
                            )}
                            <Button variant="secondary" onClick={handleBack}>
                                戻る
                            </Button>
                        </ButtonGroup>
                    </Card.Footer>
                </Card>

                <ImageModal
                    show={showImageModal}
                    onHide={handleCloseImageModal}
                    imageUrl={selectedImageUrl}
                />
            </Container>
        )
    )
}

export default TreatmentRecordDetail
