import { EditLog, EditLogSearchConditions } from '@/app/types/EditLog'
import dayjs from 'dayjs'

export const logMatches = (
    editLog: EditLog,
    searchConditions: EditLogSearchConditions
) => {
    const staffIdMatches =
        searchConditions.staffId === 'all' ||
        editLog.user.id === searchConditions.staffId
    const startDateSpecified = searchConditions.startDate !== ''
    const endDateSpecified = searchConditions.endDate !== ''
    const isAfterStartDate = dayjs(editLog.editedAt).isAfter(
        dayjs(searchConditions.startDate)
    )
    const isBeforeEndDate = dayjs(editLog.editedAt).isBefore(
        dayjs(searchConditions.endDate)
    )
    const dateMatches =
        (!startDateSpecified || isAfterStartDate) &&
        (!endDateSpecified || isBeforeEndDate)
    const typeSpecified = searchConditions.target !== null
    const typeMatches =
        !typeSpecified || editLog.editTarget === searchConditions.target
    return staffIdMatches && dateMatches && typeMatches
}
