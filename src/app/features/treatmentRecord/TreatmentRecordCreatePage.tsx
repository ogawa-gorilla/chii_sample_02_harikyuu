import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage, pushPage } from '@/app/store/navigationSlice'
import { createRecord, setRecordOnView } from '@/app/store/treatmentRecordSlice'
import { Page } from '@/app/types/Page'
import TreatmentRecordCreateForm from './components/TreatmentRecordCreateForm'

const TreatmentRecordCreatePage = () => {
    const dispatch = useAppDispatch()

    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)

    const handleSubmit = () => {
        dispatch(createRecord(draft))
        dispatch(setRecordOnView(draft.id))
        dispatch(pushPage(Page.TREATMENT_RECORD_DETAIL))
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
