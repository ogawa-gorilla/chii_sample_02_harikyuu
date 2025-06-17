import { ShiftDraft } from '@/app/types/shift'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const MESSAGES = {
    VALUE_EMPTY: '時刻を入力してください',
    INVALID_TIME: '時刻を修正してください',
}

/**
 * バリデーション結果を表す型
 */
export interface ShiftValidationResult {
    errors: ShiftError[]
    warnings: ShiftError[]
}

export interface ShiftError {
    message: string
    indices?: number[]
}

export function validateShiftDrafts(
    formerShiftDraft: ShiftDraft,
    latterShiftDraft: ShiftDraft
): ShiftValidationResult {
    const errors: ShiftError[] = []
    const warnings: ShiftError[] = []

    const {
        result: formerShiftResult,
        hasInvalidDate: formerShiftHasInvalidDate,
    } = validateShiftDraft(formerShiftDraft)
    const {
        result: latterShiftResult,
        hasInvalidDate: latterShiftHasInvalidDate,
    } = validateShiftDraft(latterShiftDraft, 2)

    // 日付が無効な場合は検査を打ち切る
    if (formerShiftHasInvalidDate || latterShiftHasInvalidDate) {
        return {
            errors: [...formerShiftResult.errors, ...latterShiftResult.errors],
            warnings: [
                ...formerShiftResult.warnings,
                ...latterShiftResult.warnings,
            ],
        }
    }

    if (formerShiftDraft.startTime >= latterShiftDraft.startTime) {
        errors.push({
            message: 'シフト1はシフト2より早い時間にしてください',
            indices: [0, 2],
        })
    }

    if (latterShiftDraft.startTime <= formerShiftDraft.endTime) {
        errors.push({
            message: '時間に重複があります',
            indices: [1, 2],
        })
    }

    return {
        errors: [
            ...errors,
            ...formerShiftResult.errors,
            ...latterShiftResult.errors,
        ],
        warnings: [
            ...warnings,
            ...formerShiftResult.warnings,
            ...latterShiftResult.warnings,
        ],
    }
}

export function validateShiftDraft(
    shiftDraft: ShiftDraft,
    baseIndex: number = 0
): {
    result: ShiftValidationResult
    hasInvalidDate: boolean
} {
    const errors: ShiftError[] = []
    const warnings: ShiftError[] = []

    let hasInvalidDate = false

    if (shiftDraft.startTime === '') {
        errors.push({
            message: MESSAGES.VALUE_EMPTY,
            indices: [baseIndex],
        })
        hasInvalidDate = true
    } else if (!dayjs(shiftDraft.startTime, 'HH:mm', true).isValid()) {
        errors.push({
            message: MESSAGES.INVALID_TIME,
            indices: [baseIndex],
        })
        hasInvalidDate = true
    }

    if (shiftDraft.endTime === '') {
        errors.push({
            message: MESSAGES.VALUE_EMPTY,
            indices: [baseIndex + 1],
        })
        hasInvalidDate = true
    } else if (!dayjs(shiftDraft.endTime, 'HH:mm', true).isValid()) {
        errors.push({
            message: MESSAGES.INVALID_TIME,
            indices: [baseIndex + 1],
        })
        hasInvalidDate = true
    }

    // 片方のデータが無効な場合は検査を打ち切る
    if (hasInvalidDate) {
        return { result: { errors, warnings }, hasInvalidDate }
    }

    // 開始時間 > 終了時間のチェック
    if (shiftDraft.startTime > shiftDraft.endTime) {
        errors.push({
            message: '開始時間は終了時間より前にしてください',
            indices: [0, 1],
        })
    }

    // 営業時間外の警告
    if (shiftDraft.startTime < '09:00' || shiftDraft.startTime > '18:00') {
        warnings.push({
            message: '営業時間外の値があります',
            indices: [baseIndex],
        })
    }

    if (shiftDraft.endTime < '09:00' || shiftDraft.endTime > '18:00') {
        warnings.push({
            message: '営業時間外の値があります',
            indices: [baseIndex + 1],
        })
    }
    return { result: { errors, warnings }, hasInvalidDate: false }
}

export function shiftIndices(
    result: ShiftValidationResult,
    by: number
): ShiftValidationResult {
    return {
        errors: result.errors.map((error) => ({
            ...error,
            indices: error.indices?.map((index) => index + by),
        })),
        warnings: result.warnings.map((warning) => ({
            ...warning,
            indices: warning.indices?.map((index) => index + by),
        })),
    }
}
