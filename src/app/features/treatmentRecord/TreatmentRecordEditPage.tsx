import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage, setCurrentPage } from '@/app/store/navigationSlice'
import { updateRecord } from '@/app/store/treatmentRecordSlice'
import { Page } from '@/app/types/Page'
import TreatmentRecordEditForm from './components/TreatmentRecordEditForm'

const TreatmentRecordEditPage = () => {
    const dispatch = useAppDispatch()

    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)

    const handleSubmit = () => {
        dispatch(updateRecord(draft))
        dispatch(setCurrentPage(Page.TREATMENT_RECORD_DETAIL))
    }

    const handleCancel = () => {
        dispatch(popPage())
    }

    return (
        <div>
            <TreatmentRecordEditForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default TreatmentRecordEditPage
