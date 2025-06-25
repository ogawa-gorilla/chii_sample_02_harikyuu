import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage } from '@/app/store/navigationSlice'
import { getStaffs } from '@/app/store/userSlice'
import TreatmentRecordEditForm from './components/TreatmentRecordEditForm'

const TreatmentRecordEditPage = () => {
    const dispatch = useAppDispatch()
    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)
    const staffs = useAppSelector(getStaffs)

    const handleSubmit = () => {
        dispatch(popPage())
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
