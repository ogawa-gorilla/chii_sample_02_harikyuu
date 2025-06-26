import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { updateRecordDraft } from '@/app/store/treatmentRecordSlice'

export const useTreatmentForm = () => {
    const dispatch = useAppDispatch()

    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(updateRecordDraft({ [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFiles = Array.from(e.target.files || [])
        const newImages = imageFiles.map((file) => URL.createObjectURL(file))
        dispatch(
            updateRecordDraft({
                attached_images: [...draft.attached_images, ...newImages],
            })
        )
    }

    const handleDeleteImage = (imageUrl: string) => {
        const updatedImages = draft.attached_images.filter(
            (img) => img !== imageUrl
        )
        dispatch(
            updateRecordDraft({
                attached_images: updatedImages,
            })
        )
    }

    return {
        handleChange,
        handleFileChange,
        handleDeleteImage,
    }
}
