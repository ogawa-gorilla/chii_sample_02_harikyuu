import { ShiftDraft } from '@/app/types/shift'

/**
 * バリデーション結果を表す型
 */
export interface ShiftValidationResult {
    errors: string[]
    warnings: string[]
}

export function validateShiftDrafts(
    formerShiftDraft: ShiftDraft,
    latterShiftDraft: ShiftDraft
): ShiftValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    if (formerShiftDraft.startTime > latterShiftDraft.startTime) {
        errors.push('シフト1はシフト2より早い時間にしてください')
    }

    if (latterShiftDraft.startTime < formerShiftDraft.endTime) {
        errors.push('時間に重複があります。直してください')
    }

    return { errors, warnings }
}

/**
 * シフト下書きのバリデーションを行う純粋関数
 *
 * @param shiftDrafts - バリデーション対象のシフト下書き配列
 * @param isHoliday - その日が休日かどうか
 * @param holidayReason - 休日の理由（休日の場合）
 * @returns バリデーション結果
 */
export function validateShiftDraft(
    shiftDraft: ShiftDraft
): ShiftValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 開始時間 > 終了時間のチェック
    if (shiftDraft.startTime > shiftDraft.endTime) {
        errors.push('開始時間が終了時間より後です。直してください')
    }

    // 営業時間外の警告
    if (shiftDraft.startTime < '09:00' || shiftDraft.startTime > '18:00') {
        warnings.push('開始時間が時間外です')
    }

    if (shiftDraft.endTime < '09:00' || shiftDraft.endTime > '18:00') {
        warnings.push('終了時間が時間外です')
    }
    return { errors, warnings }
}
