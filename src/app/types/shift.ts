import { TimeIdentifier } from './timeIdentifier'

export interface Shift {
    id: string
    staffId: string
    date: string
    startTime: string
    endTime: string
}

/**
 * シフトの下書きデータを表す型
 */
export interface ShiftDraft {
    date: TimeIdentifier
    startTime: string
    endTime: string
    id: string
}

export interface ShiftTemplate {
    id: string
    userId: string
    shiftDrafts: ShiftDraft[]
}
