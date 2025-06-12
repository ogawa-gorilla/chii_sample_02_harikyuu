import { ShiftDraft } from '@/app/types/shift'

/**
 * バリデーション結果を表す型
 */
export interface ShiftValidationResult {
    errors: string[]
    warnings: string[]
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
    shiftDrafts: ShiftDraft[],
    isHoliday: boolean = false,
    holidayReason: string = ''
): ShiftValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 2つのシフトがある場合の重複チェック
    if (shiftDrafts.length === 2) {
        if (shiftDrafts[0].endTime > shiftDrafts[1].startTime) {
            errors.push('時間に重複があります。直してください')
        }
    }

    // 休日の警告
    if (isHoliday) {
        warnings.push(holidayReason + 'です。')
    }

    // 各シフトの個別バリデーション
    shiftDrafts.forEach((draft) => {
        // 開始時間 > 終了時間のチェック
        if (draft.startTime > draft.endTime) {
            errors.push('開始時間が終了時間より後です。直してください')
        }

        // 営業時間外の警告
        if (draft.startTime < '09:00' || draft.startTime > '18:00') {
            warnings.push('開始時間が時間外です')
        }

        if (draft.endTime < '09:00' || draft.endTime > '18:00') {
            warnings.push('終了時間が時間外です')
        }
    })

    return { errors, warnings }
}
