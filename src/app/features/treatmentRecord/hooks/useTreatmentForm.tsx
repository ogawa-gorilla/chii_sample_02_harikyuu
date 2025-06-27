import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addEditLog } from '@/app/store/editLogSlice'
import {
    createRecord,
    updateRecordDraft,
} from '@/app/store/treatmentRecordSlice'
import { EditLog, EditLogTag, EditLogTarget } from '@/app/types/EditLog'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import { User } from '@/app/types/user'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import { v4 } from 'uuid'

const createCreateLog = (record: TreatmentRecord, user: User): EditLog => {
    return {
        id: v4(),
        editTarget: EditLogTarget.TREATMENT_RECORD,
        user: user,
        editedAt: dayjs().toISOString(),
        edits: [
            `施術日時: ${record.date} ${record.for_reservation.time}, 顧客: ${record.client}, 施術内容: ${record.content}, 担当: ${user.name}`,
        ],
        tags: [EditLogTag.CREATE],
    }
}

export const useTreatmentForm = () => {
    const dispatch = useAppDispatch()

    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)
    const loginUser = useAppSelector((state) => state.login.user)

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

    const createRecordEntry = useCallback(
        (record: TreatmentRecord) => {
            const log = createCreateLog(record, loginUser!)
            dispatch(createRecord(record))
            dispatch(addEditLog(log))
        },
        [dispatch, loginUser]
    )

    return {
        handleChange,
        handleFileChange,
        handleDeleteImage,

        createRecordEntry,
    }
}
