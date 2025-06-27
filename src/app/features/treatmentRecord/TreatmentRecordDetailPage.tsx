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
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap'
import ImageModal from './components/ImageModal'
import TreatmentRecordSection from './components/TreatmentRecordSection'

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

    const { loginUser } = useLogin()
    const canEdit = record && loginUser!.id === record?.staffId

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
                    <TreatmentRecordSection
                        record={record}
                        onImageClick={handleImageClick}
                    />
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
