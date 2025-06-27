import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage, setCurrentPage } from '@/app/store/navigationSlice'
import { setRecordOnView } from '@/app/store/treatmentRecordSlice'
import { Page } from '@/app/types/Page'
import TreatmentRecordEditForm from './components/TreatmentRecordEditForm'
import { useTreatmentForm } from './hooks/useTreatmentForm'

const TreatmentRecordEditPage = () => {
    const dispatch = useAppDispatch()

    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)
    const { updateRecordEntry } = useTreatmentForm()

    const handleSubmit = () => {
        updateRecordEntry(draft)
        dispatch(setRecordOnView(draft.id))
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
