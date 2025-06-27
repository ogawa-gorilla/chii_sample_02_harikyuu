import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addEditLog } from '@/app/store/editLogSlice'
import {
    createRecord,
    updateRecord,
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

const areImageListsEqual = (list1: string[], list2: string[]) => {
    if (list1.length !== list2.length) {
        return false
    }
    return list1.every((img, index) => img === list2[index])
}

const createUpdateLog = (
    originalRecord: TreatmentRecord,
    updatedRecord: TreatmentRecord,
    user: User
): EditLog => {
    const log = {
        id: v4(),
        editTarget: EditLogTarget.TREATMENT_RECORD,
        user: user,
        editedAt: dayjs().toISOString(),
        edits: [] as string[],
        tags: [EditLogTag.EDIT],
    }

    const edits: string[] = []

    if (originalRecord.content !== updatedRecord.content) {
        edits.push(
            `施術内容: ${originalRecord.content} -> ${updatedRecord.content}`
        )
    }

    if (
        !areImageListsEqual(
            originalRecord.attached_images,
            updatedRecord.attached_images
        )
    ) {
        edits.push(`添付画像に変更`)
    }

    log.edits = edits
    return log
}

export const useTreatmentForm = () => {
    const dispatch = useAppDispatch()

    const draft = useAppSelector((state) => state.treatmentRecords.recordDraft)
    const loginUser = useAppSelector((state) => state.login.user)
    const records = useAppSelector((state) => state.treatmentRecords.records)

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

    const updateRecordEntry = useCallback(
        (record: TreatmentRecord) => {
            const originalRecord = records.find((r) => r.id === record.id)!
            const log = createUpdateLog(originalRecord, record, loginUser!)
            dispatch(updateRecord(record))
            if (log.edits.length > 0) {
                log.backup = JSON.stringify(originalRecord)
                dispatch(addEditLog(log))
            }
        },
        [dispatch, loginUser, records]
    )

    return {
        handleChange,
        handleFileChange,
        handleDeleteImage,

        createRecordEntry,
        updateRecordEntry,
    }
}
