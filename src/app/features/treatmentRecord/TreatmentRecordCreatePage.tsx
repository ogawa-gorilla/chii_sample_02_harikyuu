import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage } from '@/app/store/navigationSlice'
import { setRecordOnView } from '@/app/store/treatmentRecordSlice'
import TreatmentRecordCreateForm from './components/TreatmentRecordCreateForm'
import { useTreatmentForm } from './hooks/useTreatmentForm'

const TreatmentRecordCreatePage = () => {
    const dispatch = useAppDispatch()

    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)
    const { createRecordEntry } = useTreatmentForm()

    const handleSubmit = () => {
        createRecordEntry(draft)
        dispatch(setRecordOnView(draft.id))
        dispatch(popPage())
    }

    const handleCancel = () => {
        dispatch(popPage())
    }

    return (
        <div>
            <TreatmentRecordCreateForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default TreatmentRecordCreatePage
