import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage } from '@/app/store/navigationSlice'
import { createRecord, setRecordOnView } from '@/app/store/treatmentRecordSlice'
import TreatmentRecordCreateForm from './components/TreatmentRecordCreateForm'

const TreatmentRecordCreatePage = () => {
    const dispatch = useAppDispatch()

    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)

    const handleSubmit = () => {
        dispatch(createRecord(draft))
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
